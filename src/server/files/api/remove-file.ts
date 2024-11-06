// api/removeFile.ts

import type { NextApiRequest, NextApiResponse } from 'next'

import logger from '@/server/logger'
import s3Client, { config } from '@/server/s3client'

import { handleMiniImages } from '../service/image-service'
import { getPathInfo } from '../utils/path-utils'

const { bucket } = config

export default async function removeFile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const pathInfo = getPathInfo(req)
  if (!pathInfo) {
    return res.status(400).json({ error: 'Invalid path' })
  }
  const { fullPath, prefix, shortPrefix, id } = pathInfo

  try {
    const obj = await s3Client.statObject(bucket, fullPath)
    if (!obj) return res.status(404).json({ error: 'File not found' })

    await s3Client.removeObject(bucket, fullPath)
    await s3Client.removeObject(bucket, `${shortPrefix}image-small/${id}`)

    const isImage = prefix.includes('/image')
    if (isImage) {
      await handleMiniImages({ req, res, id, isDelete: true })
    }

    logger.info('Successfully deleted file')
    res.status(200).json({})
  } catch (error) {
    logger.error(`Failed to delete file: ${error}`)
    res.status(500).json({ error: 'Failed to delete file' })
  }
}
