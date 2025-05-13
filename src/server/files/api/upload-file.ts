import type { NextApiRequest, NextApiResponse } from 'next'

import logger from '@/server/logger'
import s3Client, { config } from '@/server/s3client'

import { handleMiniImages } from '../service/image-service'
import { getPathInfo, sanitizeS3Key } from '../utils/path-utils'
import { withErrorHandler } from '../utils/with-error-handler'

const { bucket } = config

async function uploadFile(req: NextApiRequest, res: NextApiResponse) {
  const pathInfo = getPathInfo(req)
  if (!pathInfo) {
    return res.status(400).json({ error: 'Invalid path' })
  }

  const { prefix } = pathInfo
  const sanitizedPrefix = sanitizeS3Key(prefix)

  const { name, payload, tags } = req.body
  const id = crypto.randomUUID()

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

  const objectKey = `${sanitizedPrefix}/${id}`

  try {
    await s3Client.putObject(bucket, objectKey, buffer, buffer.length, metaData)
    const existingObject = await s3Client.statObject(bucket, objectKey)
    if (!existingObject) return res.status(404).json({})

    const isImage = prefix.includes('/image')
    if (isImage) {
      try {
        await handleMiniImages({ req, id, isDelete: false })
      } catch (e) {
        logger.error(e)
        throw new Error('Error handling mini images')
      }
    }

    logger.info('Successfully saved file')
    res
      .status(201)
      .json({ id, name, url: `${req.url}/${id}`, type: mimeType, tags })
  } catch (error) {
    logger.error(`Failed to upload file: ${error}`)
    throw new Error(`Failed to upload file: ${error}`)
  }
}

export default withErrorHandler(uploadFile)
