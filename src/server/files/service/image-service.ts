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

        // Width-only resize keeps the aspect ratio, matching the previous Jimp.AUTO height.
        const outputBuffer = await sharp(buffer).resize({ width: 100 }).png().toBuffer()

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
        throw new Error('Failed to resize and upload image')
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
        await resizeImageAndUpload(normalizedPrefix, prefix + id)
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
