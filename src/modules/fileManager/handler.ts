import { nanoid } from 'nanoid'
import type { NextApiRequest, NextApiResponse } from 'next'

import { FileItem } from '@/components/fileManager/FileManager'

import logger from './logger'
import s3Client, { config } from './s3client'

const { bucket, endPoint, port } = config

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.url) return res.status(400).end()

    const [, , itemType, itemId, , fileId] = req.url.split('/')

    const prefix = `${itemType}/${itemId}`

    logger.debug(
      `Request - URL: ${req.url} | Method: ${req.method} | Item Type: ${itemType} | Item ID: ${itemId} | FileID: ${fileId}`
    )

    switch (req.method) {
      case 'GET':
        const stream = s3Client.extensions.listObjectsV2WithMetadata(bucket, prefix + '/')

        const objects: FileItem[] = []

        stream.on('data', obj => {
          const { name: path, metadata } = obj
          const [id] = path.split('/').reverse()

          if (!path) return res.status(500).end()

          objects.push({
            id,
            name: metadata['X-Amz-Meta-Name'],
            type: metadata['content-type'],
            url: `http://${endPoint}:${port}/${bucket}/${path}`
          })
        })

        stream.on('error', err => {
          logger.error('Error listing bucket', err)
          return res.status(500).end()
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
              return res.status(500).end()
            }
            return res.status(201).json({
              id,
              name,
              type: mimeType,
              url: `http://${endPoint}:${port}/${bucket}/${prefix}/${id}`
            })
          })
        }
        return res.status(400).end()

      case 'DELETE':
        if (fileId) {
          s3Client.removeObject(bucket, `${prefix}/${fileId}`, err => {
            if (err) {
              logger.error('Error deleting file', err)
              return res.status(500).end()
            }
            return res.status(204).end()
          })
        }
        return res.status(400).end()

      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    res.status(500).end()
    logger.error(error)
  }
}

export default handler
