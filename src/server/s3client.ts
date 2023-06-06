import { Client } from 'minio'

import logger from './logger'

export const config = {
  bucket: process.env.MINIO_BUCKET_NAME ?? 'panda-files',
  endPoint: process.env.MINIO_ENDPOINT ?? 'localhost',
  port: Number.parseInt(process.env.MINIO_PORT ?? '9000'),
  accessKey: process.env.MINIO_ACCESS_KEY ?? '12345678',
  secretKey: process.env.MINIO_SECRET_KEY ?? '12345678',
  useSSL: process.env.MINIO_USE_SSL?.toLowerCase() === 'true'
}

const { bucket, accessKey, secretKey, port, useSSL, endPoint } = config

logger.info(
  `S3 Config - Credentials: ${!!(
    accessKey && secretKey
  )} | Bucket: ${bucket} | Endpoint: ${endPoint} | Port: ${port} | UseSSL: ${useSSL}`
)

const s3Client = new Client(config)

//Make sure we have buckets
s3Client.bucketExists(bucket, function (err, exists) {
  if (err) {
    return logger.error(`Error checking if ${bucket} exists`, err)
  }
  if (!exists) {
    s3Client.makeBucket(bucket, function (err) {
      if (err) {
        return logger.error(`Error creating ${bucket}`, err)
      }
      logger.info(`${bucket} created successfully`)
    })
  }
})

export default s3Client
