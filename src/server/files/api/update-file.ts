// api/updateFile.ts

import type { NextApiRequest, NextApiResponse } from 'next'

import logger from '@/server/logger'
import s3Client, { config } from '@/server/s3client'

import { getPathInfo } from '../utils/path-utils'
import { safeGetObject, safeStatObject } from '../utils/s3-error-utils'
import { streamToBuffer } from '../utils/stream-utils'
import { withErrorHandler } from '../utils/with-error-handler'

const { bucket } = config

async function updateFile(req: NextApiRequest, res: NextApiResponse) {
    const pathInfo = getPathInfo(req)
    if (!pathInfo) {
        return res.status(400).json({ error: 'Invalid path' })
    }
    const { fullPath } = pathInfo
    const { name, tags } = req.body

    try {
        const obj = await safeStatObject(s3Client, bucket, fullPath, req)
        if (!obj) {
            return res.status(404).json({ error: 'File not found' })
        }

        const fileStream = await safeGetObject(s3Client, bucket, fullPath, req)
        if (!fileStream) {
            return res.status(404).json({ error: 'File not found' })
        }
        const buffer = await streamToBuffer(fileStream)
        logger.info(tags)

        const metaData = {
            ...obj.metaData,
            'X-Amz-Meta-Name': encodeURIComponent(name),
            'X-Amz-Meta-Tags': tags.map((tag: string) => encodeURIComponent(tag)).join(','),
        }

        await s3Client.putObject(bucket, fullPath, buffer, buffer.length, metaData)

        logger.info('Successfully updated file')
        res.status(200).json({ name, tags })
    } catch (error) {
        logger.error(`Failed to update file: ${error}`)
        res.status(500).json({ error: 'Failed to update file' })
    }
}

export default withErrorHandler(updateFile)
