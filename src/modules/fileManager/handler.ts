import { BucketItemStat, BucketItemWithMetadata } from 'minio'
import { nanoid } from 'nanoid'
import type { NextApiRequest, NextApiResponse } from 'next'

import { FileItem } from '@/components/fileManager/FileManager'

import logger from './logger'
import s3Client, { config } from './s3client'

const { bucket, endPoint, port } = config

const makeExternalURL = (restPath: string) =>
  `${
    process.env.PRODUCTION?.toLowerCase() === 'true' ? 'https://' : 'http://'
  }${endPoint}:${port}/${bucket}/${restPath}`

const makeBucketItem = (obj: BucketItemStat, name: string, prefix: string): BucketItemWithMetadata => ({
  ...obj,
  name,
  prefix,
  metadata: obj.metaData
})

const makeFileItem = (s3Object: BucketItemWithMetadata): FileItem => {
  const { name: path, metadata } = s3Object
  const [id] = path.split('/').reverse()
  return {
    id,
    name: metadata['X-Amz-Meta-Name'],
    type: metadata['content-type'],
    url: makeExternalURL(path)
  }
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.url) {
      res.status(400).end()
    } else {
      const [, , itemType, itemId, , fileId] = req.url.split('/')

      const prefix = `${itemType}/${itemId}`

      logger.info(
        `Request - URL: ${req.url} | Method: ${req.method} | Item Type: ${itemType} | Item ID: ${itemId} | FileID: ${fileId}`
      )

      switch (req.method) {
        case 'GET':
          const stream = s3Client.extensions.listObjectsV2WithMetadata(bucket, prefix + '/')

          const objects: FileItem[] = []

          stream.on('data', obj => {
            objects.push(makeFileItem(obj))
          })

          stream.on('error', err => {
            logger.error('Error listing bucket', err)
            res.status(500).end()
          })

          stream.on('end', () => res.status(200).json(objects))

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

            s3Client.putObject(bucket, `${prefix}/${id}`, buffer, buffer.length, metaData, err => {
              if (err) {
                logger.error('Error saving file', err)
                res.status(500).end()
              } else {
                s3Client.statObject(bucket, `${prefix}/${id}`, (err, obj) => {
                  if (err) return res.status(500).end()
                  res.status(201).json(makeFileItem(makeBucketItem(obj, id, prefix)))
                })
              }
            })
          } else {
            res.status(400).end()
          }

          break

        case 'DELETE':
          if (fileId) {
            const fullPath = `${prefix}/${fileId}`
            s3Client.statObject(bucket, fullPath, (err, result) => {
              if (err) {
                logger.error('Error finding object to delete', err)
                return res.status(500).end()
              } else {
                s3Client.removeObject(bucket, fullPath, err => {
                  if (err) {
                    logger.error('Error deleting file', err)
                    return res.status(500).end()
                  } else {
                    res.status(200).json(makeBucketItem(result, fileId, prefix))
                  }
                })
              }
            })
          } else {
            res.status(400).end()
          }

          break

        default:
          res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
          res.status(405).end(`Method ${req.method} Not Allowed`)
      }
    }
  } catch (error) {
    res.status(500).end()
    logger.error(error)
  }
}

export default handler
