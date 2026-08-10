import { getToken } from 'next-auth/jwt'

import logger from '@/server/logger'
import s3Client, { config } from '@/server/s3client'

import { listObjectsWithMetadata } from '../api/list-files'
import { getPathInfo, sanitizeS3Key } from '../utils/path-utils'
import { safeGetObject, safeStatObject } from '../utils/s3-error-utils'
import { streamToBuffer } from '../utils/stream-utils'
import { saveUrlsToNode } from './node-service'

const { bucket } = config

/**
 * The source image could not be decoded or re-encoded. Distinct from an infrastructure
 * failure so callers can tolerate a missing preview without also swallowing an S3 outage.
 */
export class ImageDecodeError extends Error {
    override readonly name = 'ImageDecodeError'
}

export const resizeImageAndUpload = async (prefix: string, name: string) => {
    try {
        const fileStream = await safeGetObject(s3Client, bucket, name)
        if (!fileStream) {
            logger.warn(`Cannot resize image - source file not found: ${name}`)
            return
        }

        const originalFileMeta = await safeStatObject(s3Client, bucket, name)
        if (!originalFileMeta) {
            logger.warn(`Cannot get metadata for image: ${name}`)
            return
        }
        const buffer = await streamToBuffer(fileStream)

        if (originalFileMeta.metaData['content-type'] === 'image/webp') {
            const newDir = `${prefix}/image-small`
            const newFileName = `${newDir}/${name.split('/').pop()}`
            await s3Client.putObject(
                bucket,
                newFileName,
                buffer,
                originalFileMeta.size,
                originalFileMeta.metaData,
            )
            return
        }

        // Loaded lazily, and deliberately OUTSIDE the ImageDecodeError block below.
        //
        // sharp is a native binding. Imported at module scope it would throw at load
        // time if `@img/sharp-linuxmusl-x64` failed to resolve in the Alpine runner
        // (Dockerfile, `--ignore-scripts`), taking down every route that imports this
        // file - including remove-file.ts, which never needs sharp at all. Deletes and
        // the webp copy-through path above now never load it.
        //
        // A load failure is an infrastructure failure, not an undecodable image: it must
        // stay loud rather than degrade every upload to a silently missing thumbnail.
        const { default: sharp } = await import('sharp')

        // Only the decode/encode is wrapped as an ImageDecodeError. Everything else in
        // this function is S3 or stream work, and a thumbnail we failed to *store* is a
        // different problem from one we failed to *render*.
        let outputBuffer: Buffer
        try {
            // `failOn: 'none'` matches jimp's leniency. sharp defaults to `'warning'`,
            // which aborts on any libvips warning - a JPEG truncated by a partial upload
            // throws "premature end of JPEG image" even though it is largely decodable
            // and jimp produced a thumbnail for it.
            //
            // `.rotate()` with no argument applies the EXIF orientation and clears the
            // tag. Jimp did this implicitly in parseBitmap; sharp does not, and the PNG
            // encode below drops the tag, so without it a phone photo thumbnails sideways
            // with no way for the browser to correct it.
            //
            // Width-only resize keeps the aspect ratio, matching the previous Jimp.AUTO.
            outputBuffer = await sharp(buffer, { failOn: 'none' })
                .rotate()
                .resize({ width: 100 })
                .png()
                .toBuffer()
        } catch (e) {
            throw new ImageDecodeError(`Cannot render a thumbnail for ${name}`, { cause: e })
        }

        const newDir = `${prefix}/image-small`
        const newFileName = `${newDir}/${name.split('/').pop()}`

        await s3Client.putObject(
            bucket,
            newFileName,
            outputBuffer,
            outputBuffer.length,
            originalFileMeta.metaData,
        )
    } catch (e) {
        if (e instanceof ImageDecodeError) throw e
        throw new Error('Failed to resize and upload image', { cause: e })
    }
}

export async function handleMiniImages({
    req,
    id,
    isDelete,
}: {
    req: any
    id: string
    isDelete: boolean
}) {
    const pathInfo = getPathInfo(req)
    if (!pathInfo) return

    // Normalize prefix and ensure it doesn't have leading slash
    const { prefix, uid, shortPrefix } = pathInfo
    const normalizedPrefix = sanitizeS3Key(shortPrefix)

    if (!isDelete) {
        try {
            await resizeImageAndUpload(normalizedPrefix, prefix + id)
        } catch (e) {
            // Only an undecodable image is tolerated. The galleries accept `image/*`,
            // which includes types sharp cannot render (bmp, ico), and the original
            // object is already stored and verified by the caller - a missing preview
            // must not fail the upload. Everything below still runs so the node's URL
            // list is refreshed from the thumbnails that do exist.
            //
            // An S3 or stream failure is NOT tolerated: it propagates, because it says
            // nothing about the image and everything about the infrastructure.
            if (!(e instanceof ImageDecodeError)) throw e

            // `cause` is stringified and its stack read directly. `cause` is a
            // non-enumerable property, so handing winston the Error serializes it as
            // `"cause":{}` (this logger has no `format.errors`), and the wrapper's own
            // stack only ever points at the throw site above - the real failure site
            // lives on the cause.
            const cause = e.cause as Error | undefined
            logger.error(`Thumbnail generation failed for ${prefix + id}`, {
                cause: String(cause ?? e),
                stack: cause?.stack ?? e.stack,
            })
        }
    }

    const list = await listObjectsWithMetadata(bucket, `${normalizedPrefix}/image-small`, true)

    const urls = list?.map(obj => '/api/' + obj.name)

    const token = await getToken({ req })

    const prefixLabel = prefix.split('/')[0]

    const nodeLabelMap: { [key: string]: string } = {
        catalogue: 'CatalogueItem',
        'catalogue-category': 'CatalogueCategory',
        system: 'System',
    }

    const nodeLabel = nodeLabelMap[prefixLabel]

    await saveUrlsToNode(uid, urls, token, nodeLabel)
}
