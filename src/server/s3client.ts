import { Client } from 'minio'

import logger from './logger'

export const config = {
  bucket: process.env.MINIO_BUCKET_NAME as string,
  endPoint: process.env.MINIO_ENDPOINT as string,
  port: Number.parseInt(process.env.MINIO_PORT ?? '9000', 10),
  accessKey:
    process.env.MINIO_ACCESS_KEY ||
    (process.env.MINIO_ACCESS_KEY_PROD as string),
  secretKey:
    process.env.MINIO_SECRET_KEY ||
    (process.env.MINIO_ACCESS_KEY_PROD as string),
  useSSL: process.env.MINIO_USE_SSL?.toLowerCase() === 'true'
}

const initClient = () => {
  try {
    const { bucket, accessKey, secretKey, port, useSSL, endPoint } = config

    logger.debug(
      `S3 Config - Credentials: ${!!(
        accessKey && secretKey
      )} | Bucket: ${bucket} | Endpoint: ${endPoint} | Port: ${port} | UseSSL: ${useSSL}`
    )

    const s3Client = new Client(config)

    //Make sure we have buckets
    s3Client.bucketExists(bucket)

    return s3Client
  } catch (err) {
    logger.error('Error initializing S3 client:', err)
    throw new Error('Error initializing S3 client')
  }
}

export default initClient()
