// api/listFiles.ts

import type { BucketItemWithMetadata } from 'minio'
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

  try {
    const list = await listObjectsWithMetadata(bucket, prefix)

    if (!list || list.length === 0) {
      logger.info('No files found', list)
      return res.status(200).json([])
    }

    const result = list
      .map(obj => {
        const { lastModified, name: objFullPath, metadata } = obj
        const ts = new Date(lastModified || '').getTime()
        const [id] = objFullPath ? objFullPath.split('/').reverse() : []
        const name = decodeURIComponent(metadata && metadata['X-Amz-Meta-Name'])
        const tags = metadata && metadata['X-Amz-Meta-Tags']
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
          tags: tags ? tags.split(',').map(decodeURIComponent) : []
        }
      })
      .sort((a, b) => b.ts - a.ts)

    logger.info('Successfully listed files', result)
    res.status(200).json(result)
  } catch (error) {
    logger.error(`Failed to list files: ${error}`)
    res.status(500).json({ error: 'Failed to list files' })
  }
}

// Helper function to list objects with metadata
const listObjectsWithMetadata = (
  bucket: string,
  prefix: string
): Promise<BucketItemWithMetadata[]> => {
  return new Promise((resolve, reject) => {
    const stream = s3Client.extensions.listObjectsV2WithMetadata(bucket, prefix)
    const objects: BucketItemWithMetadata[] = []

    stream.on('data', obj => {
      objects.push(obj)
      logger.debug('Object:', obj)
    })

    stream.on('error', reject)
    stream.on('end', () => resolve(objects))
  })
}

export default withErrorHandler(listFiles)
