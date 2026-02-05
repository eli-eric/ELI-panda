import type { NextApiRequest } from 'next'

import logger from '@/server/logger'
import type s3Client from '@/server/s3client'

export interface S3Error extends Error {
    code?: string
    statusCode?: number
    region?: string
    bucketName?: string
    key?: string
}

/**
 * Checks if an error is a MinIO/S3 "Not Found" error
 */
export function isS3NotFoundError(error: unknown): boolean {
    if (!error || typeof error !== 'object') return false

    const s3Error = error as S3Error
    return s3Error.code === 'NotFound' || s3Error.code === 'NoSuchKey' || s3Error.statusCode === 404
}

/**
 * Safe wrapper for s3Client.statObject that returns null instead of throwing on NotFound
 */
export async function safeStatObject(
    client: typeof s3Client,
    bucket: string,
    objectKey: string,
    req?: NextApiRequest,
): Promise<Awaited<ReturnType<typeof s3Client.statObject>> | null> {
    try {
        return await client.statObject(bucket, objectKey)
    } catch (error) {
        if (isS3NotFoundError(error)) {
            logger.warn(
                `File not found in S3: bucket="${bucket}", key="${objectKey}"${req ? `, url="${req.url}"` : ''}`,
            )
            return null
        }
        // Re-throw other errors
        throw error
    }
}

/**
 * Safe wrapper for s3Client.getObject that returns null instead of throwing on NotFound
 */
export async function safeGetObject(
    client: typeof s3Client,
    bucket: string,
    objectKey: string,
    req?: NextApiRequest,
): Promise<Awaited<ReturnType<typeof s3Client.getObject>> | null> {
    try {
        return await client.getObject(bucket, objectKey)
    } catch (error) {
        if (isS3NotFoundError(error)) {
            logger.warn(
                `File not found in S3: bucket="${bucket}", key="${objectKey}"${req ? `, url="${req.url}"` : ''}`,
            )
            return null
        }
        // Re-throw other errors
        throw error
    }
}
