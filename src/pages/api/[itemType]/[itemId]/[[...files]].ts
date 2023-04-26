import type { NextApiRequest, NextApiResponse } from 'next'

import { Client } from 'minio'
import { FileItem } from '@/modules/fileManager/FileManager'
import { nanoid } from 'nanoid'
import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple())
    })
  ]
})

const bucket = process.env.MINIO_BUCKET_NAME ?? 'panda-files'
const endPoint = process.env.MINIO_ENDPOINT ?? 'localhost'
const port = Number.parseInt(process.env.MINIO_PORT ?? '9000')
const accessKey = process.env.MINIO_ACCESS_KEY ?? '12345678'
const secretKey = process.env.MINIO_SECRET_KEY ?? '12345678'
const useSSL = process.env.MINIO_USE_SSL?.toLowerCase() === 'true'

logger.info(
  `S3 Config - Bucket: ${bucket} | AccessKey: ${accessKey} | SecretKey: ${secretKey} | Port: ${port} | UseSSL: ${useSSL} | EndPoint: ${endPoint}`
)

//Resource not ready
let ready = false

const s3Client = new Client({
  endPoint,
  port,
  useSSL,
  accessKey,
  secretKey
})

//Bucket Policy allows public read-only access
const bucketPolicy = {
  Version: '2012-10-17',
  Statement: [
    {
      Action: ['s3:GetObject'],
      Effect: 'Allow',
      Principal: { AWS: ['*'] },
      Resource: [`arn:aws:s3:::${bucket}/*`],
      Sid: 'PublicRead'
    }
  ]
}

// Create the bucket only if it doesn't exist
s3Client.bucketExists(bucket, function (err, exists) {
  if (err) {
    return logger.error('Error checking if bucket exists', err)
  }
  if (!exists) {
    s3Client.makeBucket(bucket, function (err) {
      if (err) {
        return logger.error('Error creating bucket', err)
      }
      logger.info('Bucket created successfully')
      // Apply bucket policy
      s3Client.setBucketPolicy(bucket, JSON.stringify(bucketPolicy), err => {
        if (err) return logger.error('Error setting bucker policy', err)
        ready = true
        return logger.info('Successfully applied bucket policy. FileManager is ready')
      })
    })
  } else {
    logger.info('Bucket already exists. FileManager is ready')
    ready = true
  }
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!ready) return res.status(503).end()
  try {
    if (!req.url) return res.status(400).end()

    const [_, __, itemType, itemId, ___, fileId] = req.url.split('/')

    const prefix = `${itemType}/${itemId}`

    logger.debug(
      `Request - URL: ${req.url} | Method: ${req.method} | Item Type: ${itemType} | Item ID: ${itemId} | FileID: ${fileId}`
    )

    switch (req.method) {
      case 'GET':
        const stream = s3Client.extensions.listObjectsV2WithMetadata(bucket, prefix + '/')

        let objects: FileItem[] = []

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
