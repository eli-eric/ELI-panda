import type { NextApiRequest, NextApiResponse } from 'next'

import logger from '@/server/logger'
import s3Client, { config } from '@/server/s3client'

import { getPathInfo } from '../utils/path-utils'

const { bucket } = config

async function downloadFile(req: NextApiRequest, res: NextApiResponse) {
  const pathInfo = getPathInfo(req)
  if (!pathInfo) {
    return res.status(400).json({ error: 'Invalid path' })
  }
  const { fullPath } = pathInfo

  const objectInfo = await s3Client.statObject(bucket, fullPath)
  if (!objectInfo) return res.status(404).end()

  res.setHeader(
    'Content-Type',
    objectInfo.metaData['content-type'] || 'application/octet-stream'
  )
  res.setHeader('Content-Length', objectInfo.size)
  res.setHeader(
    'Content-Disposition',
    `filename=${objectInfo.metaData['name']}`
  )

  const fileStream = await s3Client.getObject(bucket, fullPath)
  fileStream.pipe(res).on('error', err => {
    logger.error(err)
    res.status(500).end()
  })
}

export default downloadFile
