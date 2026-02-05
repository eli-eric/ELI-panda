// api/listFiles.ts

import type { BucketItem, BucketItemStat } from 'minio'
import type { NextApiRequest, NextApiResponse } from 'next'

import logger from '@/server/logger'
import s3Client, { config } from '@/server/s3client'

import { getPathInfo } from '../utils/path-utils'
import { withErrorHandler } from '../utils/with-error-handler'

const { bucket } = config

async function listFiles(req: NextApiRequest, res: NextApiResponse) {
    const pathInfo = getPathInfo(req)

    if (!pathInfo) {
        return res.status(400).json({ error: 'Invalid path' })
    }
    const { prefix } = pathInfo
    const normalizedPrefix = prefix.startsWith('/') ? prefix.substring(1) : prefix

    try {
        const list = await listObjectsWithMetadata(bucket, normalizedPrefix)

        if (!list || list.length === 0) {
            logger.info('No files found', list)
            return res.status(200).json([])
        }

        const result = list
            .map(obj => {
                const { lastModified, name: objFullPath, metadata } = obj
                const ts = new Date(lastModified || '').getTime()
                const [id] = objFullPath ? objFullPath.split('/').reverse() : []
                const name =
                    metadata?.['X-Amz-Meta-Name'] || metadata?.['name']
                        ? decodeURIComponent(metadata['X-Amz-Meta-Name'] || metadata['name'])
                        : 'unknown'
                const tags = metadata && (metadata['X-Amz-Meta-Tags'] || metadata['tags'])
                const type = metadata && metadata['content-type']
                const url = `${req.url}/${id}`
                const size = obj.size
                return {
                    id,
                    name,
                    type,
                    url,
                    ts,
                    size,
                    tags: tags ? tags.split(',').map(decodeURIComponent) : [],
                }
            })
            .sort((a, b) => b.ts - a.ts)

        logger.info('Successfully listed files')
        res.status(200).json(result)
    } catch (error) {
        logger.error(`Failed to list files: ${error}`)
        res.status(500).json({ error: 'Failed to list files' })
    }
}

// Helper function to list objects with metadata
export const listObjectsWithMetadata = async (
    bucket: string,
    prefix: string,
    recursive: boolean = true,
): Promise<(BucketItem & { metadata?: BucketItemStat['metaData'] })[]> => {
    // Remove leading slash if present
    const normalizedPrefix = prefix

    try {
        // Try with recursive=true to get all nested objects
        const objects: BucketItem[] = []

        await new Promise<void>((resolve, reject) => {
            const stream = s3Client.listObjectsV2(bucket, normalizedPrefix, recursive)

            stream.on('data', obj => {
                if (obj.name) objects.push(obj)
            })

            stream.on('error', error => {
                reject(error)
            })

            stream.on('end', () => {
                resolve()
            })
        })

        // Get metadata for the objects
        const objectsWithMetadata = await Promise.all(
            objects.map(async obj => {
                try {
                    const stat = obj.name ? await s3Client.statObject(bucket, obj.name) : null
                    return { ...obj, metadata: stat?.metaData || undefined }
                } catch (err) {
                    logger.error(`Failed to stat object ${obj.name}:`, err)
                    return obj
                }
            }),
        )

        return objectsWithMetadata
    } catch (error) {
        logger.error(`Failed to list objects: ${error} | Prefix: ${prefix} | Bucket: ${bucket}`)
        throw new Error(`Failed to list objects: ${error} | Prefix: ${prefix} | Bucket: ${bucket}`)
    }
}

export default withErrorHandler(listFiles)
