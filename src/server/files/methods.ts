import crypto from 'crypto'
import type { BucketItemWithMetadata } from 'minio'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import sharp from 'sharp'

import { BASE_URL } from '@/types/constants/common'

import logger, { composeDebugMessage } from '../logger'
import s3Client, { config } from '../s3client'

const { bucket } = config

// Constants for metadata keys
const META_CONTENT_TYPE = 'content-type'
const META_NAME = 'name'
const META_TAGS = 'tags'

// Define types for better type safety
interface NodeLabelMap {
  [key: string]: string
}

interface HandleMiniImagesConfig {
  req: NextApiRequest
  res: NextApiResponse
  id: string
  isDelete?: boolean
}

interface PathInfo {
  prefix: string
  id: string
  fullPath: string
  uid: string
  shortPrefix: string
}

// Utility function to read buffer from stream
const streamToBuffer = async (
  readableStream: NodeJS.ReadableStream
): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    readableStream.on('data', (chunk: Buffer) => chunks.push(chunk))
    readableStream.on('end', () => resolve(Buffer.concat(chunks)))
    readableStream.on('error', reject)
  })
}

// Utility function to list objects with metadata
const listObjectsWithMetadata = async (
  bucket: string,
  prefix: string,
  recursive = false
): Promise<BucketItemWithMetadata[]> => {
  return new Promise((resolve, reject) => {
    const stream = s3Client.extensions.listObjectsV2WithMetadata(
      bucket,
      prefix,
      recursive
    )
    const objects: BucketItemWithMetadata[] = []

    stream.on('data', obj => objects.push(obj))
    stream.once('error', reject)
    stream.once('end', () => resolve(objects))
  })
}

// Function to save URLs to a node
const saveUrlsToNode = async (
  uid: string,
  urls: string[],
  token: any,
  nodeLabel: string
) => {
  const response = await fetch(
    `${BASE_URL}/files/node/${uid}/mini-image-url?&nodeLabel=${nodeLabel}`,
    {
      method: 'POST',
      body: JSON.stringify({ url: urls.length ? urls : null }),
      headers: {
        Authorization: `Bearer ${token?.apiAccessToken}`,
        'Content-Type': 'application/json'
      }
    }
  )

  if (!response.ok) {
    throw new Error('Failed to save URLs to node')
  }

  return response.json()
}

// Function to resize image and upload
const resizeImageAndUpload = async (prefix: string, name: string) => {
  try {
    const fileStream = await s3Client.getObject(bucket, name)
    const originalFileMeta = await s3Client.statObject(bucket, name)
    const buffer = await streamToBuffer(fileStream)

    const contentType = originalFileMeta.metaData[META_CONTENT_TYPE]

    if (contentType === 'image/webp') {
      const newDir = `${prefix}image-small`
      const newFileName = `${newDir}/${name.split('/').pop()}`
      await s3Client.putObject(
        bucket,
        newFileName,
        buffer,
        buffer.length,
        originalFileMeta.metaData
      )
      return
    }

    const outputBuffer = await sharp(buffer)
      .resize({ width: 100 })
      .png()
      .toBuffer()

    const metaData = {
      ...originalFileMeta.metaData,
      [META_CONTENT_TYPE]: 'image/png'
    }

    const newDir = `${prefix}image-small`
    const newFileName = `${newDir}/${name.split('/').pop()}`

    await s3Client.putObject(
      bucket,
      newFileName,
      outputBuffer,
      outputBuffer.length,
      metaData
    )
  } catch (error) {
    logger.error('Error in resizeImageAndUpload:', error)
    throw new Error('Failed to resize and upload image')
  }
}

// Function to handle mini images
const handleMiniImages = async (config: HandleMiniImagesConfig) => {
  const { req, id, isDelete = false } = config
  const { prefix, shortPrefix, uid } = getPathInfo(req)

  if (!isDelete) {
    await resizeImageAndUpload(shortPrefix, `${prefix}${id}`)
  }

  const list = await listObjectsWithMetadata(
    bucket,
    `/${shortPrefix}image-small`,
    true
  )
  const urls = list.map(obj => '/api/' + obj.name)
  const token = await getToken({ req })

  const prefixLabel = prefix.split('/')[1]
  const nodeLabelMap: NodeLabelMap = {
    catalogue: 'CatalogueItem',
    'catalogue-category': 'CatalogueCategory',
    system: 'System'
  }
  await saveUrlsToNode(uid, urls, token, nodeLabelMap[prefixLabel])
}

// Function to extract path info
export const getPathInfo = (req: NextApiRequest): PathInfo => {
  const urlSegments = (req.url ?? '').split('/')
  const [, , itemCategory, itemId, fileCategory, fileId] = urlSegments

  if (!(itemCategory && itemId && fileCategory)) {
    throw new Error('Failed to extract PathInfo from request')
  }

  const prefix = `/${itemCategory}/${itemId}/${fileCategory}/`
  const shortPrefix = `/${itemCategory}/${itemId}/`
  const id = fileId
  const fullPath = prefix + id
  return { prefix, id, fullPath, uid: itemId, shortPrefix }
}

// Function to download a file
export async function downloadFile(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { fullPath } = getPathInfo(req)
    const objectInfo = await s3Client.statObject(bucket, fullPath)
    if (!objectInfo) {
      res.status(404).end()
      return
    }

    res.setHeader(
      'Content-Type',
      objectInfo.metaData[META_CONTENT_TYPE] || 'application/octet-stream'
    )
    res.setHeader('Content-Length', objectInfo.size)
    res.setHeader(
      'Content-Disposition',
      `filename=${objectInfo.metaData[META_NAME]}`
    )

    const fileStream = await s3Client.getObject(bucket, fullPath)
    fileStream.pipe(res)
  } catch (error) {
    logger.error('Error in downloadFile:', error)
    res.status(500).end()
  }
}

// Function to list files
export async function listFiles(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { prefix } = getPathInfo(req)
    const list = await listObjectsWithMetadata(bucket, prefix)

    const result = list
      .map(obj => {
        const { lastModified, name: objFullPath, metadata } = obj
        const ts = lastModified ? new Date(lastModified).getTime() : 0
        const id = objFullPath?.split('/').pop() || ''
        const name = decodeURIComponent(metadata?.[META_NAME] || '')
        const tags = metadata?.[META_TAGS] || ''
        const type = metadata?.[META_CONTENT_TYPE] || ''
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

    res.status(200).json(result)
  } catch (error) {
    logger.error('Error in listFiles:', error)
    res.status(500).end()
  }
}

// Function to upload a file
export async function uploadFile(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { prefix } = getPathInfo(req)
    const { name, payload, tags } = req.body
    const id = crypto.randomUUID()

    const regex = /^data:(.*?);base64,(.*)$/
    const match = payload.match(regex)
    const url = `${req.url}/${id}`

    if (!match) {
      throw new Error('Invalid payload')
    }

    const mimeType = match[1]
    const buffer = Buffer.from(match[2], 'base64')

    const tagsString = tags
      ?.map((tag: string) => encodeURIComponent(tag))
      .join(',')

    const metaData = {
      [META_CONTENT_TYPE]: mimeType,
      [META_NAME]: encodeURIComponent(name),
      [META_TAGS]: tagsString
    }

    await s3Client.putObject(
      bucket,
      `${prefix}${id}`,
      buffer,
      buffer.length,
      metaData
    )

    const existingObject = await s3Client.statObject(bucket, `${prefix}${id}`)
    if (!existingObject) {
      res.status(404).json({})
      return
    }

    const isImage = prefix.includes('/image')
    if (isImage) {
      await handleMiniImages({ req, res, id, isDelete: false })
    }

    logger.debug(composeDebugMessage(req, 'Successfully saved file'))
    res.status(201).json({ id, name, url, type: mimeType, tags })
  } catch (error) {
    logger.error('Error in uploadFile:', error)
    res.status(500).json({ error: 'Failed to upload file' })
  }
}

// Function to remove a file
export async function removeFile(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { fullPath, prefix, shortPrefix, id } = getPathInfo(req)
    const obj = await s3Client.statObject(bucket, fullPath)
    if (!obj) {
      res.status(404).json({})
      return
    }

    await s3Client.removeObject(bucket, fullPath)
    await s3Client.removeObject(bucket, `${shortPrefix}image-small/${id}`)

    const isImage = prefix.includes('/image')

    if (isImage) {
      await handleMiniImages({ req, res, id, isDelete: true })
    }

    logger.debug(composeDebugMessage(req, 'Successfully deleted file'))
    res.status(200).json({})
  } catch (error) {
    logger.error('Error in removeFile:', error)
    res.status(500).json({ error: 'Failed to remove file' })
  }
}

// Function to update a file's metadata
export async function updateFile(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { fullPath } = getPathInfo(req)
    const { name, tags } = req.body

    const obj = await s3Client.statObject(bucket, fullPath)
    if (!obj) {
      res.status(404).json({})
      return
    }

    const fileStream = await s3Client.getObject(bucket, fullPath)
    const buffer = await streamToBuffer(fileStream)

    const metaData = {
      ...obj.metaData,
      [META_NAME]: encodeURIComponent(name),
      [META_TAGS]: tags.map((tag: string) => encodeURIComponent(tag)).join(',')
    }

    await s3Client.putObject(bucket, fullPath, buffer, buffer.length, metaData)

    logger.debug(composeDebugMessage(req, 'Successfully updated file'))
    res.status(200).json({ name, tags })
  } catch (error) {
    logger.error('Error in updateFile:', error)
    res.status(500).json({ error: 'Failed to update file' })
  }
}
