import Jimp from 'jimp'
import type { BucketItemWithMetadata } from 'minio'
import { nanoid } from 'nanoid'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import stream from 'stream'

import { BASE_URL } from '@/types/constants/common'

import logger, { composeDebugMessage } from '../logger'
import s3Client, { config } from '../s3client'

const { bucket } = config

const saveUrlsToNode = async (
  uid: string,
  urls: string[],
  token,
  nodeLabel
) => {
  const response = await fetch(
    `${BASE_URL}/files/node/${uid}/mini-image-url?&nodeLabel=${nodeLabel}`,
    {
      method: 'POST',
      body: JSON.stringify({
        url: urls.length ? urls : null
      }),
      headers: {
        Authorization: 'Bearer ' + token?.apiAccessToken,
        'Content-Type': 'application/json'
      }
    }
  )

  if (!response.ok) {
    throw new Error('Failed to save urls to node')
  }

  return await response.json()
}

const resizeImageAndUpload = async (prefix, name) => {
  try {
    const fileStream = await s3Client.getObject(bucket, name)

    const originalFileMeta = await s3Client.statObject(bucket, name)

    const buffer: Buffer = await new Promise((resolve, reject) => {
      const chunks: any[] = []
      fileStream
        .on('data', chunk => chunks.push(chunk))
        .on('end', () => resolve(Buffer.concat(chunks)))
        .on('error', reject)
    })

    if (originalFileMeta.metaData['content-type'] === 'image/webp') {
      const newDir = `${prefix}image-small`
      const newFileName = `${newDir}/${name.split('/')[name.split('/').length - 1]}`
      await s3Client.putObject(
        bucket,
        newFileName,
        buffer,
        originalFileMeta.size,
        originalFileMeta.metaData
      )

      return
    }

    const image = await Jimp.read(buffer)

    image.resize(100, Jimp.AUTO)
    const outputBuffer = await image.getBufferAsync(Jimp.MIME_PNG)

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

  if (!isDelete) {
    await resizeImageAndUpload(shortPrefix, prefix + id)
  }

  const list: BucketItemWithMetadata[] = await new Promise(
    (resolve, reject) => {
      const stream = s3Client.extensions.listObjectsV2WithMetadata(
        bucket,
        `/${shortPrefix}image-small`,
        true
      )

      const objects: BucketItemWithMetadata[] = []

      stream.on('data', obj => {
        objects.push(obj)
      })

      stream.once('error', reject)

      stream.once('end', () => {
        resolve(objects)
      })
    }
  )

  const urls = list?.map(obj => '/api/' + obj.name)

  const token = await getToken({ req })

  const prefixLabel = prefix.split('/')[1]

  const nodeLabel = {
    catalogue: 'CatalogueItem',
    'catalogue-category': 'CatalogueCategory',
    system: 'System'
  }
  await saveUrlsToNode(uid, urls, token, nodeLabel[prefixLabel])
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

  const isImage = prefix.includes('/image')
  if (isImage) {
    try {
      await handleMiniImages({ req, res, id, isDelete: false })
    } catch (e) {
      logger.error(e)
      return res.status(500).json({ error: 'Failed to save mini image' })
    }
  }

  logger.debug(composeDebugMessage(req, 'Successfully saved file'))
  res.status(201).json({ id, name, url, type: mimeType, tags })
}
