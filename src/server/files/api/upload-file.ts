import { nanoid } from 'nanoid'
import type { NextApiRequest, NextApiResponse } from 'next'

import logger from '@/server/logger'
import s3Client, { config } from '@/server/s3client'

import { handleMiniImages } from '../service/image-service'
import { getPathInfo } from '../utils/path-utils'

const { bucket } = config

export default async function uploadFile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const pathInfo = getPathInfo(req)
  if (!pathInfo) {
    return res.status(400).json({ error: 'Invalid path' })
  }
  const { prefix } = pathInfo

  const { name, payload, tags } = req.body
  const id = nanoid()

  const regex = /^data:(.*?);base64,(.*)$/
  const match = payload.match(regex)

  if (!match) {
    logger.error('Invalid payload')
    return res.status(400).json({ error: 'Invalid payload' })
  }

  const mimeType = match[1]
  const buffer = Buffer.from(match[2], 'base64')

  const tagsString = tags
    ?.map((tag: string) => encodeURIComponent(tag))
    .join(',')

  const metaData = {
    'Content-Type': mimeType,
    name: encodeURIComponent(name),
    tags: tagsString
  }

  await s3Client.putObject(bucket, prefix + id, buffer, buffer.length, metaData)

  const existingObject = await s3Client.statObject(bucket, prefix + id)
  if (!existingObject) return res.status(404).json({})

  const isImage = prefix.includes('/image')
  if (isImage) {
    try {
      await handleMiniImages({ req, res, id, isDelete: false })
    } catch (e) {
      logger.error(e)
      return res.status(500).json({ error: 'Failed to save mini image' })
    }
  }

  logger.info('Successfully saved file')
  res
    .status(201)
    .json({ id, name, url: `${req.url}/${id}`, type: mimeType, tags })
}
