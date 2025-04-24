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
  logger.info('Path info:', pathInfo)
  if (!pathInfo) {
    return res.status(400).json({ error: 'Invalid path' })
  }
  const { prefix } = pathInfo
  logger.info('Prefix:', prefix)

  try {
    const list = await listObjectsWithMetadata(bucket, prefix)

    if (!list || list.length === 0) {
      logger.info('No files found', list)
      return res.status(200).json([])
    }

    const result = list
      .map(obj => {
        const { lastModified, name: objFullPath, metadata } = obj
        logger.info('Object:', obj)
        logger.info('Metadata:', metadata?.['name'])
        const ts = new Date(lastModified || '').getTime()
        const [id] = objFullPath ? objFullPath.split('/').reverse() : []
        const name = metadata?.['name']
          ? decodeURIComponent(metadata['name'])
          : objFullPath?.split('/').pop() || 'unknown'
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
): Promise<(BucketItem & { metadata?: BucketItemStat['metaData'] })[]> => {
  return new Promise((resolve, reject) => {
    const objects: (BucketItem & { metadata?: BucketItemStat['metaData'] })[] =
      []
    const promises: Promise<void>[] = []

    const stream = s3Client.listObjectsV2(bucket, prefix, true)

    stream.on('data', obj => {
      if (!obj.name) return

      const p = s3Client
        .statObject(bucket, obj.name)
        .then(stat => {
          objects.push({ ...obj, metadata: stat.metaData })
        })
        .catch(err => {
          logger.error(`Failed to stat object ${obj.name}:`, err)
          objects.push(obj)
        })

      promises.push(p)
    })

    stream.on('error', reject)

    stream.on('end', async () => {
      await Promise.all(promises)
      resolve(objects)
    })
  })
}

export default withErrorHandler(listFiles)
