import { getToken } from 'next-auth/jwt'
import sharp from 'sharp'

import logger from '@/server/logger'
import s3Client, { config } from '@/server/s3client'

import { listObjectsWithMetadata } from '../api/list-files'
import { getPathInfo, sanitizeS3Key } from '../utils/path-utils'
import { safeGetObject, safeStatObject } from '../utils/s3-error-utils'
import { streamToBuffer } from '../utils/stream-utils'
import { saveUrlsToNode } from './node-service'

const { bucket } = config

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

        // `.rotate()` with no argument applies the EXIF orientation and clears the tag.
        // Jimp did this implicitly in parseBitmap; sharp does not, and the PNG encode
        // below drops the tag, so without it a phone photo thumbnails sideways with no
        // way for the browser to correct it.
        //
        // Width-only resize keeps the aspect ratio, matching the previous Jimp.AUTO height.
        const outputBuffer = await sharp(buffer).rotate().resize({ width: 100 }).png().toBuffer()

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
            // Scoped to the resize alone. The galleries accept `image/*`, which includes
            // types sharp cannot decode (bmp, ico), and the original object is already
            // stored and verified by the caller - a missing preview must not fail the
            // upload. Everything below still runs so the node's URL list is refreshed
            // from the thumbnails that do exist.
            //
            // `cause` is stringified rather than passed as an Error: it is a
            // non-enumerable property, and this logger has no `format.errors`, so
            // handing winston the Error object serializes it as `"cause":{}` and the
            // real reason for the failure is lost.
            logger.error(`Thumbnail generation failed for ${prefix + id}`, {
                cause: String((e as Error)?.cause ?? e),
                stack: (e as Error)?.stack,
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
