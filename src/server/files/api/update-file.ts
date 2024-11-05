// api/updateFile.ts

import type { NextApiRequest, NextApiResponse } from 'next'

import logger from '@/server/logger'
import s3Client, { config } from '@/server/s3client'

import { getPathInfo } from '../utils/path-utils'
import { streamToBuffer } from '../utils/stream-utils'

const { bucket } = config

export default async function updateFile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const pathInfo = getPathInfo(req)
  if (!pathInfo) {
    return res.status(400).json({ error: 'Invalid path' })
  }
  const { fullPath } = pathInfo
  const { name, tags } = req.body

  try {
    const obj = await s3Client.statObject(bucket, fullPath)
    if (!obj) return res.status(404).json({ error: 'File not found' })

    const fileStream = await s3Client.getObject(bucket, fullPath)
    const buffer = await streamToBuffer(fileStream)

    const metaData = {
      ...obj.metaData,
      name: encodeURIComponent(name),
      tags: tags.map((tag: string) => encodeURIComponent(tag)).join(',')
    }

    await s3Client.putObject(bucket, fullPath, buffer, buffer.length, metaData)

    logger.info('Successfully updated file')
    res.status(200).json({ name, tags })
  } catch (error) {
    logger.error(`Failed to update file: ${error}`)
    res.status(500).json({ error: 'Failed to update file' })
  }
}
