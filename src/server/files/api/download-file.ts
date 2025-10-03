import type { NextApiRequest, NextApiResponse } from 'next'

import logger from '@/server/logger'
import s3Client, { config } from '@/server/s3client'

import { getPathInfo } from '../utils/path-utils'
import { safeGetObject, safeStatObject } from '../utils/s3-error-utils'

const { bucket } = config

async function downloadFile(req: NextApiRequest, res: NextApiResponse) {
  try {
    const pathInfo = getPathInfo(req)
    if (!pathInfo) {
      return res.status(400).json({ error: 'Invalid path' })
    }
    const { fullPath } = pathInfo

    const objectInfo = await safeStatObject(s3Client, bucket, fullPath, req)
    if (!objectInfo) {
      return res.status(404).json({ error: 'File not found' })
    }

    res.setHeader(
      'Content-Type',
      objectInfo.metaData['content-type'] || 'application/octet-stream'
    )
    res.setHeader('Content-Length', objectInfo.size)
    res.setHeader(
      'Content-Disposition',
      `filename=${objectInfo.metaData['name']}`
    )

    const fileStream = await safeGetObject(s3Client, bucket, fullPath, req)
    if (!fileStream) {
      return res.status(404).json({ error: 'File not found' })
    }

    fileStream.pipe(res).on('error', err => {
      logger.error('Error streaming file:', err)
      if (!res.headersSent) {
        res.status(500).end()
      }
    })
  } catch (err) {
    logger.error('Error downloading file:', err)
    if (!res.headersSent) {
      res.status(500).json({ error: 'Error downloading file' })
    }
  }
}

export default downloadFile
