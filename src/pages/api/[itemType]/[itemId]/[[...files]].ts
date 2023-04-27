import { BucketItemStat, BucketItemWithMetadata } from 'minio'
import { nanoid } from 'nanoid'
import type { NextApiRequest, NextApiResponse } from 'next'

import { FileItem } from '@/components/fileManager/FileManager'

import logger from 'src/utils/logger'
import s3Client, { config } from 'src/utils/s3client'

const { bucket } = config

const makeBucketItem = (obj: BucketItemStat, id: string, prefix: string): BucketItemWithMetadata => ({
  ...obj,
  name: `${prefix}/${id}`,
  prefix,
  metadata: obj.metaData
})

const composeDebugMessage = (req: NextApiRequest, message: string) =>
  `Request URL: ${req.url} | Method: ${req.method} | ${message}`

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.url) {
    logger.debug(composeDebugMessage(req, 'Request URL is missing'))
    res.status(400).end()
  } else {
    const [, , itemType, itemId, , fileId] = req.url.split('/')

    const prefix = `${itemType}/${itemId}`
    const fullName = `${prefix}/${fileId}`

    const makeFileItem = (s3Object: BucketItemWithMetadata): FileItem => {
      const { name: path, metadata } = s3Object
      const [id] = path.split('/').reverse()
      return {
        id,
        name: metadata['X-Amz-Meta-Name'],
        type: metadata['content-type'],
        url: `/api/${prefix}/files/${id}`
      }
    }

    logger.debug(
      composeDebugMessage(req, `Extracted attributes - ItemType: ${itemType} | ItemID: ${itemId} | FileID: ${fileId}`)
    )

    switch (req.method) {
      case 'GET':
        if (fileId) {
          const objectInfo = await s3Client.statObject(bucket, fullName)

          res.setHeader('Content-Type', objectInfo.metaData['content-type'] || 'application/octet-stream')
          res.setHeader('Content-Length', objectInfo.size)
          res.setHeader(
            'Content-Disposition',
            `attachment; filename=${encodeURIComponent(objectInfo.metaData['name'])}`
          )

          const fileStream = await s3Client.getObject(bucket, fullName)
          fileStream.pipe(res).on('error', err => {
            logger.error(err)
            res.status(500).end()
          })

          fileStream.once('error', err => {
            logger.error(err)
            res.status(500).end()
          })

          res.once('error', err => {
            logger.error(err)
            fileStream.destroy()
          })
        } else {
          const stream = s3Client.extensions.listObjectsV2WithMetadata(bucket, prefix + '/')

          const objects: FileItem[] = []

          stream.on('data', obj => {
            objects.push(makeFileItem(obj))
          })

          stream.once('error', err => {
            logger.error(err)
            res.status(500).end()
          })

          stream.once('end', () => {
            logger.debug(composeDebugMessage(req, 'Successfully listed objects in the bucket'))
            res.status(200).json(objects)
          })
        }

        break

      case 'POST':
        const { name, payload } = req.body
        const id = nanoid()

        const regex = /^data:(.*?);base64,(.*)$/
        const match = payload.match(regex)

        if (match) {
          const mimeType = match[1]
          const buffer = Buffer.from(match[2], 'base64')

          const metaData = {
            'Content-Type': mimeType,
            name
          }

          await s3Client.putObject(bucket, `${prefix}/${id}`, buffer, buffer.length, metaData)
          const objectInfo = await s3Client.statObject(bucket, `${prefix}/${id}`)

          logger.debug(composeDebugMessage(req, 'Successfully saved file'))
          res.status(201).json(makeFileItem(makeBucketItem(objectInfo, id, prefix)))
        } else {
          logger.debug(composeDebugMessage(req, 'Invalid base64 payload in request body'))
          res.status(400).end()
        }

        break

      case 'DELETE':
        if (fileId) {
          const fullName = `${prefix}/${fileId}`
          const objectInfo = await s3Client.statObject(bucket, fullName)
          await s3Client.removeObject(bucket, fullName)
          logger.debug(composeDebugMessage(req, 'Successfully deleted file'))
          res.status(200).json(makeBucketItem(objectInfo, fileId, prefix))
        } else {
          logger.debug(composeDebugMessage(req, 'File ID is missing in the request URL for deletion'))
          res.status(400).end()
        }

        break

      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
        logger.debug(composeDebugMessage(req, `Method ${req.method} Not Allowed`))
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await handler(req, res)
  } catch (err) {
    logger.debug(composeDebugMessage(req, 'An error occurred during request handling'))
    logger.error(err)
    res.status(500).end()
  }
}
