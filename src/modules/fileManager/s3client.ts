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
  `S3 Config - Bucket: ${bucket} | AccessKey: ${accessKey ? '*****' : 'undefined'} | SecretKey: ${
    secretKey ? '*****' : 'undefined'
  } | Port: ${port} | UseSSL: ${useSSL} | EndPoint: ${endPoint}`
)

const s3Client = new Client(config)

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
        return logger.info('Successfully applied bucket policy')
      })
    })
  } else {
    logger.info('Bucket already exists')
  }
})

export default s3Client
