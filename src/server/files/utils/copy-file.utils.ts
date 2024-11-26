import type { BucketItem } from 'minio'

import s3Client, { config } from '@/server/s3client'

const { bucket } = config

/**
 * Helper function to list all objects under a given prefix in the bucket.
 *
 * @param bucket - The name of the bucket.
 * @param prefix - The prefix path to list objects from.
 * @returns A promise that resolves to an array of BucketItem objects.
 */
export const listObjects = (
  bucket: string,
  prefix: string
): Promise<BucketItem[]> => {
  return new Promise((resolve, reject) => {
    const stream = s3Client.listObjectsV2(bucket, prefix, true)
    const objects: BucketItem[] = []

    stream.on('data', obj => objects.push(obj))
    stream.on('error', reject)
    stream.on('end', () => resolve(objects))
  })
}

/**
 * Helper function to get mini image URLs for a given UID.
 *
 * @param uid - The UID of the system.
 * @returns A promise that resolves to an array of mini image URLs.
 */
export const getMiniImageUrls = async (uid: string): Promise<string[]> => {
  const prefix = `/system/${uid}/image-small/`

  // List all objects under the mini image directory.
  const list = await listObjects(bucket, prefix)

  // Construct URLs for each mini image.
  const urls = list.map(obj => '/api/' + obj.name)

  return urls
}
