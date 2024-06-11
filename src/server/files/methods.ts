import type { BucketItemWithMetadata } from 'minio'
import { nanoid } from 'nanoid'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import sharp from 'sharp'
import stream from 'stream'

import { BASE_URL } from '@/types/constants/common'

import logger, { composeDebugMessage } from '../logger'
import s3Client, { config } from '../s3client'

const { bucket } = config

const saveUrlsToNode = async (uid: string, urls: string[], token) => {
  const response = await fetch(`${BASE_URL}/files/node/${uid}/mini-image-url`, {
    method: 'POST',
    body: JSON.stringify({
      url: urls.length ? urls : null
    }),
    headers: {
      Authorization: 'Bearer ' + token?.apiAccessToken,
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error('Failed to save urls to node')
  }

  return await response.json()
}

const resizeImageAndUpload = async (prefix, name) => {
  try {
    const fileStream = await s3Client.getObject(bucket, name)

    const originalFileMeta = await s3Client.statObject(bucket, name)

    const transformer = sharp().resize(100)

    const outputBuffer = await new Promise((resolve, reject) => {
      const buffers: any[] = []
      fileStream
        .pipe(transformer)
        .on('data', data => buffers.push(data))
        .on('error', reject)
        .on('end', () => resolve(Buffer.concat(buffers)))
    })

    const bufferStream = new stream.PassThrough()
    bufferStream.end(outputBuffer)
    const newDir = `${prefix}image-small`
    const newFileName = `${newDir}/${name.split('/')[name.split('/').length - 1]}`

    await s3Client.putObject(
      bucket,
      newFileName,
      bufferStream,
      originalFileMeta.size,
      originalFileMeta.metaData
    )
  } catch (e) {
    throw new Error('Failed to resize and upload image')
  }
}

const handleMiniImages = async (config: {
  req: NextApiRequest
  res: NextApiResponse
  id
  isDelete?: boolean
}) => {
  const { req, res, id, isDelete = false } = config
  const { prefix, shortPrefix, uid } = getPathInfo(req, res)

  try {
    const files = await s3Client.listObjectsV2(
      bucket,
      `${shortPrefix}image-small`,
      true
    )

    const token = await getToken({ req })

    const urls: string[] = []

    for await (const file of files) {
      urls.push('/api/' + file.name)
    }
    if (!isDelete) {
      resizeImageAndUpload(shortPrefix, prefix + id)
    }
    await saveUrlsToNode(uid, urls, token)
  } catch (e) {
    throw new Error('Failed to handle mini images')
  }
}

export const getPathInfo = (req: NextApiRequest, res: NextApiResponse) => {
  const [, , itemCategory, itemId, fileCategory, fileId] = (
    req.url ?? ''
  ).split('/')

  if (!(itemCategory && itemId && fileCategory)) {
    logger.info(
      composeDebugMessage(req, 'Failed to extract PathInfo from request')
    )
    res.status(400).end()
  }

  const prefix = `/${itemCategory}/${itemId}/${fileCategory}/`
  const shortPrefix = `/${itemCategory}/${itemId}/`
  const id = fileId
  const fullPath = prefix + id
  return { prefix, id, fullPath, uid: itemId, shortPrefix }
}

export async function downloadFile(req: NextApiRequest, res: NextApiResponse) {
  const { fullPath } = getPathInfo(req, res)

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
  await new Promise((resolve, reject) => {
    fileStream.pipe(res).on('error', reject)
    res.once('error', reject)
    res.once('end', resolve)
  })
}

export async function listFiles(req: NextApiRequest, res: NextApiResponse) {
  const { prefix } = getPathInfo(req, res)

  const list: BucketItemWithMetadata[] = await new Promise(
    (resolve, reject) => {
      const stream = s3Client.extensions.listObjectsV2WithMetadata(
        bucket,
        prefix
      )

      const objects: BucketItemWithMetadata[] = []

      stream.on('data', obj => {
        objects.push(obj)
      })

      stream.once('error', reject)

      stream.once('end', () => {
        logger.debug(
          composeDebugMessage(req, 'Successfully listed objects in the bucket')
        )
        resolve(objects)
      })
    }
  )

  const result = list
    .map(obj => {
      const { lastModified, name: objFullPath, metadata } = obj
      const ts = new Date(lastModified as Date).getTime()
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

  return res.status(200).json(result)
}

export async function uploadFile(req: NextApiRequest, res: NextApiResponse) {
  const { prefix } = getPathInfo(req, res)
  const { name, payload, tags } = req.body
  const id = nanoid()

  const regex = /^data:(.*?);base64,(.*)$/
  const match = payload.match(regex)
  const url = `${req.url}/${id}`

  if (!match) throw new Error('Invalid payload')

  const mimeType = match[1]
  const buffer = Buffer.from(match[2], 'base64')

  const tagsString = tags?.map(tag => encodeURIComponent(tag)).join(',')

  const metaData = {
    'Content-Type': mimeType,
    name: encodeURIComponent(name),
    tags: tagsString
  }

  await s3Client.putObject(bucket, prefix + id, buffer, buffer.length, metaData)

  const existingObject = await s3Client.statObject(bucket, prefix + id)
  if (!existingObject) return res.status(404).json({})

  logger.debug(composeDebugMessage(req, 'Successfully saved file'))

  const isImage = prefix.includes('/image')
  if (isImage) {
    try {
      await handleMiniImages({ req, res, id })
    } catch (e) {
      logger.error(e)
      return res.status(500).json({ error: 'Failed to save mini image' })
    }
  }

  res.status(201).json({ id, name, url, type: mimeType, tags })
}

export async function removeFile(req: NextApiRequest, res: NextApiResponse) {
  const { fullPath, prefix, shortPrefix, id } = getPathInfo(req, res)
  const obj = await s3Client.statObject(bucket, fullPath)
  if (!obj) return res.status(404).json({})
  await s3Client.removeObject(bucket, fullPath)
  await s3Client.removeObject(bucket, shortPrefix + 'image-small/' + id)

  const isImage = prefix.includes('/image')

  if (isImage) {
    await handleMiniImages({ req, res, id, isDelete: true })
  }

  logger.debug(composeDebugMessage(req, 'Successfully deleted file'))
  res.status(200).json({})
}

export async function updateFile(req: NextApiRequest, res: NextApiResponse) {
  const { fullPath } = getPathInfo(req, res)
  const { name, tags } = req.body

  const obj = await s3Client.statObject(bucket, fullPath)
  if (!obj) return res.status(404).json({})

  const fileStream = await s3Client.getObject(bucket, fullPath)
  const buffer = await new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = []
    fileStream.on('data', (chunk: Buffer) => chunks.push(chunk))
    fileStream.on('end', () => resolve(Buffer.concat(chunks)))
    fileStream.on('error', reject)
  })

  const metaData = {
    ...obj.metaData,
    name: encodeURIComponent(name),
    tags: tags.map(tag => encodeURIComponent(tag)).join(',')
  }

  await s3Client.putObject(bucket, fullPath, buffer, buffer.length, metaData)

  logger.debug(composeDebugMessage(req, 'Successfully updated file'))
  res.status(200).json({ name, tags })
}
