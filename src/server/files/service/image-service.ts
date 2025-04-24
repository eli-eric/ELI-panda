import Jimp from 'jimp'
import { getToken } from 'next-auth/jwt'

import s3Client, { config } from '@/server/s3client'

import { listObjectsWithMetadata } from '../api/list-files'
import { getPathInfo, sanitizeS3Key } from '../utils/path-utils'
import { streamToBuffer } from '../utils/stream-utils'
import { saveUrlsToNode } from './node-service'

const { bucket } = config

export const resizeImageAndUpload = async (prefix: string, name: string) => {
  try {
    const fileStream = await s3Client.getObject(bucket, name)
    const originalFileMeta = await s3Client.statObject(bucket, name)
    const buffer = await streamToBuffer(fileStream)

    if (originalFileMeta.metaData['content-type'] === 'image/webp') {
      const newDir = `${prefix}/image-small`
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

    const newDir = `${prefix}/image-small`
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

export async function handleMiniImages({
  req,
  id,
  isDelete
}: {
  req: any
  id: string
  isDelete: boolean
}) {
  const pathInfo = getPathInfo(req)
  if (!pathInfo) return

  // Normalize prefix and ensure it doesn't have leading slash
  const { prefix, uid, shortPrefix } = pathInfo
  const normalizedPrefix = sanitizeS3Key(shortPrefix)

  if (!isDelete) {
    await resizeImageAndUpload(normalizedPrefix, prefix + id)
  }

  const list = await listObjectsWithMetadata(
    bucket,
    `${normalizedPrefix}/image-small`,
    true
  )

  const urls = list?.map(obj => '/api/' + obj.name)

  const token = await getToken({ req })

  const prefixLabel = prefix.split('/')[0]

  const nodeLabelMap: { [key: string]: string } = {
    catalogue: 'CatalogueItem',
    'catalogue-category': 'CatalogueCategory',
    system: 'System'
  }

  const nodeLabel = nodeLabelMap[prefixLabel]

  await saveUrlsToNode(uid, urls, token, nodeLabel)
}
