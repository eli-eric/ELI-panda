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

const makeBucketItem = (obj: BucketItemStat, id: string, prefix: string): BucketItemWithMetadata => ({
  ...obj,
  name: `${prefix}/${id}`,
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

const composeDebugMessage = (req: NextApiRequest, message: string) =>
  `Request URL: ${req.url} | Method: ${req.method} | ${message}`

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.url) {
      logger.debug(composeDebugMessage(req, 'Request URL is missing'))
      res.status(400).end()
    } else {
      const [, , itemType, itemId, , fileId] = req.url.split('/')

      const prefix = `${itemType}/${itemId}`

      logger.debug(
        composeDebugMessage(req, `Extracted attributes - ItemType: ${itemType} | ItemID: ${itemId} | FileID: ${fileId}`)
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
            logger.debug(composeDebugMessage(req, 'Failed to list objects in the bucket'))
            res.status(500).end()
          })

          stream.on('end', () => {
            logger.debug(composeDebugMessage(req, 'Successfully listed objects in the bucket'))
            res.status(200).json(objects)
          })

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
                logger.debug(composeDebugMessage(req, 'Failed to save file'))
                res.status(500).end()
              } else {
                s3Client.statObject(bucket, `${prefix}/${id}`, (err, obj) => {
                  if (err) {
                    logger.debug(composeDebugMessage(req, 'Failed to get file info after saving'))
                    return res.status(500).end()
                  }
                  logger.debug(composeDebugMessage(req, 'Successfully saved file'))
                  res.status(201).json(makeFileItem(makeBucketItem(obj, id, prefix)))
                })
              }
            })
          } else {
            logger.debug(composeDebugMessage(req, 'Invalid base64 payload in request body'))
            res.status(400).end()
          }

          break

        case 'DELETE':
          if (fileId) {
            const fullPath = `${prefix}/${fileId}`
            s3Client.statObject(bucket, fullPath, (err, result) => {
              if (err) {
                logger.error('Error finding object to delete', err)
                logger.debug(composeDebugMessage(req, 'Failed to find object to delete'))
                return res.status(500).end()
              } else {
                s3Client.removeObject(bucket, fullPath, err => {
                  if (err) {
                    logger.error('Error deleting file', err)
                    logger.debug(composeDebugMessage(req, 'Failed to delete file'))
                    return res.status(500).end
                  } else {
                    logger.debug(composeDebugMessage(req, 'Successfully deleted file'))
                    res.status(200).json(makeBucketItem(result, fileId, prefix))
                  }
                })
              }
            })
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
  } catch (error) {
    logger.debug(composeDebugMessage(req, 'An error occurred during request handling'))
    res.status(500).end()
    logger.error(error)
  }
}

export default handler
