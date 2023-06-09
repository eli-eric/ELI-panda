import type { BucketItemWithMetadata } from 'minio'
import { nanoid } from 'nanoid'
import type { NextApiRequest, NextApiResponse } from 'next'

import logger, { composeDebugMessage } from '../logger'
import s3Client, { config } from '../s3client'

const { bucket } = config

export const getPathInfo = (req: NextApiRequest, res: NextApiResponse) => {
  const [, , itemCategory, itemId, fileCategory, fileId] = (req.url ?? '').split('/')

  if (!(itemCategory && itemId && fileCategory)) {
    logger.info(composeDebugMessage(req, 'Failed to extract PathInfo from request'))
    res.status(400).end()
  }

  const prefix = `/${itemCategory}/${itemId}/${fileCategory}/`
  const id = fileId
  const fullPath = prefix + id
  return { prefix, id, fullPath }
}

export async function downloadFile(req: NextApiRequest, res: NextApiResponse) {
  const { fullPath } = getPathInfo(req, res)

  const objectInfo = await s3Client.statObject(bucket, fullPath)
  if (!objectInfo) return res.status(404).end()

  res.setHeader('Content-Type', objectInfo.metaData['content-type'] || 'application/octet-stream')
  res.setHeader('Content-Length', objectInfo.size)
  res.setHeader('Content-Disposition', `filename=${objectInfo.metaData['name']}`)

  const fileStream = await s3Client.getObject(bucket, fullPath)
  await new Promise((resolve, reject) => {
    fileStream.pipe(res).on('error', reject)
    res.once('error', reject)
    res.once('end', resolve)
  })
}

export async function listFiles(req: NextApiRequest, res: NextApiResponse) {
  const { prefix } = getPathInfo(req, res)

  const list: BucketItemWithMetadata[] = await new Promise((resolve, reject) => {
    const stream = s3Client.extensions.listObjectsV2WithMetadata(bucket, prefix)

    const objects: BucketItemWithMetadata[] = []

    stream.on('data', obj => {
      objects.push(obj)
    })

    stream.once('error', reject)

    stream.once('end', () => {
      logger.debug(composeDebugMessage(req, 'Successfully listed objects in the bucket'))
      resolve(objects)
    })
  })

  const result = list
    .map(obj => {
      const { lastModified, name: objFullPath, metadata } = obj
      const ts = new Date(lastModified).getTime()
      const [id] = objFullPath.split('/').reverse()
      const name = decodeURIComponent(metadata['X-Amz-Meta-Name'])
      const type = metadata['content-type']
      const url = `${req.url}/${id}`
      return {
        id,
        name,
        type,
        url,
        ts
      }
    })
    .sort((a, b) => b.ts - a.ts)

  return res.status(200).json(result)
}

export async function uploadFile(req: NextApiRequest, res: NextApiResponse) {
  const { prefix } = getPathInfo(req, res)
  const { name, payload } = req.body
  const id = nanoid()

  const regex = /^data:(.*?);base64,(.*)$/
  const match = payload.match(regex)
  const url = `${req.url}/${id}`

  if (!match) throw new Error('Invalid payload')

  const mimeType = match[1]
  const buffer = Buffer.from(match[2], 'base64')

  const metaData = {
    'Content-Type': mimeType,
    name: encodeURIComponent(name)
  }

  await s3Client.putObject(bucket, prefix + id, buffer, buffer.length, metaData)

  const existingObject = await s3Client.statObject(bucket, prefix + id)
  if (!existingObject) return res.status(404).json({})

  logger.debug(composeDebugMessage(req, 'Successfully saved file'))
  res.status(201).json({ id, name, url, type: mimeType })
}

export async function removeFile(req: NextApiRequest, res: NextApiResponse) {
  const { fullPath } = getPathInfo(req, res)
  const obj = await s3Client.statObject(bucket, fullPath)
  if (!obj) return res.status(404).json({})
  await s3Client.removeObject(bucket, fullPath)
  logger.debug(composeDebugMessage(req, 'Successfully deleted file'))
  res.status(200).json({})
}
