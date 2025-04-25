import { Client } from 'minio'

import logger from './logger'

export const config = {
  bucket: process.env.MINIO_BUCKET_NAME ?? 'panda-files',
  endPoint: process.env.MINIO_ENDPOINT ?? 'localhost',
  port: Number.parseInt(process.env.MINIO_PORT ?? '9000'),
  accessKey: process.env.MINIO_ACCESS_KEY_PROD,
  secretKey: process.env.MINIO_SECRET_KEY_PROD,
  useSSL: process.env.MINIO_USE_SSL?.toLowerCase() === 'true'
}

const initClient = () => {
  const { bucket, accessKey, secretKey, port, useSSL, endPoint } = config
  try {
    logger.info(
      `S3 Config - Credentials: ${!!(
        accessKey && secretKey
      )} | AccessKey: ${accessKey} | Bucket: ${bucket} | Endpoint: ${endPoint} | Port: ${port} | UseSSL: ${useSSL}`
    )
    if (!config.accessKey || !config.secretKey) {
      logger.error('Missing S3 credentials')
      throw new Error('Missing S3 credentials')
    } else {
      const s3Client = new Client({
        ...config,
        accessKey: accessKey as string,
        secretKey: secretKey as string
      })
      //Make sure we have buckets
      s3Client.bucketExists(bucket).then(exists => {
        if (!exists) {
          logger.error(`Bucket ${bucket} does not exist`)
          throw new Error(`Bucket ${bucket} does not exist`)
        }
      })

      return s3Client
    }
  } catch (err) {
    logger.error('Error initializing S3 client:', err)
    throw new Error(`Error initializing S3 client: ${err}`)
  }
}

export default initClient()
