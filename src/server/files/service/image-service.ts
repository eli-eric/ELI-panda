import Jimp from 'jimp'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

import s3Client, { config } from '@/server/s3client'

import { getPathInfo } from '../utils/path-utils'
import { streamToBuffer } from '../utils/stream-utils'
import { saveUrlsToNode } from './node-service'

const { bucket } = config

export const resizeImageAndUpload = async (prefix: string, name: string) => {
  try {
    const fileStream = await s3Client.getObject(bucket, name)
    const originalFileMeta = await s3Client.statObject(bucket, name)
    const buffer = await streamToBuffer(fileStream)

    if (originalFileMeta.metaData['content-type'] === 'image/webp') {
      const newDir = `${prefix}image-small`
      const newFileName = `${newDir}/${name.split('/').pop()}`
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

    const newDir = `${prefix}image-small`
    const newFileName = `${newDir}/${name.split('/').pop()}`

    await s3Client.putObject(
      bucket,
      newFileName,
      outputBuffer,
      outputBuffer.length,
      originalFileMeta.metaData
    )
  } catch (e) {
    throw new Error('Failed to resize and upload image')
  }
}

export const handleMiniImages = async (config: {
  req: NextApiRequest
  res: NextApiResponse
  id: string
  isDelete?: boolean
}) => {
  const { req, id, isDelete = false } = config
  const pathInfo = getPathInfo(req)
  if (!pathInfo) {
    throw new Error('Invalid path info')
  }
  const { prefix, shortPrefix, uid } = pathInfo

  if (!isDelete) {
    await resizeImageAndUpload(shortPrefix, prefix + id)
  }

  const list = await listObjectsWithMetadata(
    bucket,
    `/${shortPrefix}image-small`,
    true
  )

  const urls = list?.map(obj => '/api/' + obj.name)

  const token = await getToken({ req })

  const prefixLabel = prefix.split('/')[1]

  const nodeLabelMap: { [key: string]: string } = {
    catalogue: 'CatalogueItem',
    'catalogue-category': 'CatalogueCategory',
    system: 'System'
  }

  const nodeLabel = nodeLabelMap[prefixLabel]

  await saveUrlsToNode(uid, urls, token, nodeLabel)
}

const listObjectsWithMetadata = (
  bucket: string,
  prefix: string,
  recursive: boolean
) => {
  return new Promise<any[]>((resolve, reject) => {
    const stream = s3Client.extensions.listObjectsV2WithMetadata(
      bucket,
      prefix,
      recursive
    )
    const objects: any[] = []

    stream.on('data', obj => objects.push(obj))
    stream.on('error', reject)
    stream.on('end', () => resolve(objects))
  })
}
