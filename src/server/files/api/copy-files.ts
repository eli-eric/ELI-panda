// api/copyFiles.ts

import type { BucketItem } from 'minio'
import { CopyConditions } from 'minio'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

import logger, { composeDebugMessage } from '@/server/logger'
import s3Client, { config } from '@/server/s3client'

import { saveUrlsToNode } from '../service/node-service'
import { withErrorHandler } from '../utils/with-error-handler'

const { bucket } = config

// Define an interface for the request body
interface CopyFilesRequestBody {
  sourceUid: string
  destinationUid: string
}

/**
 * API handler to copy all files from a source UID directory to a destination UID directory in MinIO.
 * After copying, it collects mini image URLs from the destination directory and saves them to the node.
 *
 * @param req - The Next.js API request object.
 * @param res - The Next.js API response object.
 */
const copyFiles = async (req: NextApiRequest, res: NextApiResponse) => {
  // Ensure the request method is POST.
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  // Get the authentication token from the request.
  const token = await getToken({ req })
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // Ensure that the request body has the correct structure
  const body = req.body as CopyFilesRequestBody
  const { sourceUid, destinationUid } = body

  if (!body || !sourceUid || !destinationUid) {
    logger.error(composeDebugMessage(req, 'Invalid request body'))
    return res.status(400).json({ error: 'Invalid request body' })
  }

  try {
    // Define the source and destination prefixes based on the UIDs.
    const sourcePrefix = `/system/${sourceUid}/`
    const destinationPrefix = `/system/${destinationUid}/`

    // List all objects under the source UID directory.
    const objects = await listObjects(bucket, sourcePrefix)

    // If no objects are found, return an error response.
    if (objects.length === 0) {
      return res.status(404).json({ error: 'No files found to copy' })
    }

    // Copy each object to the destination directory concurrently.
    await Promise.all(
      objects.map(async obj => {
        const sourceObjectName = obj.name
        const destinationObjectName = sourceObjectName?.replace(
          sourcePrefix,
          destinationPrefix
        )
        if (!destinationObjectName) return

        const copyConditions = new CopyConditions()

        // Copy the object from source to destination.
        await s3Client.copyObject(
          bucket,
          destinationObjectName,
          `/${bucket}/${sourceObjectName}`,
          copyConditions
        )
      })
    )

    // After copying, collect mini image URLs from the destination directory.
    const miniImageUrls = await getMiniImageUrls(destinationUid)

    // Save mini image URLs to the node.
    const nodeLabel = 'System' // Adjust as necessary.
    await saveUrlsToNode(destinationUid, miniImageUrls, token, nodeLabel)

    // Log the successful operation.
    logger.info(
      `User ${token.sub} copied ${objects.length} files from ${sourceUid} to ${destinationUid} and updated mini image URLs`
    )

    // Send a success response.
    res.status(200).json({ message: 'Files copied successfully' })
  } catch (error) {
    // Log the error and send an error response.
    logger.error(`Failed to copy files: ${error}`)
    res.status(500).json({ error: 'Failed to copy files' })
  }
}

/**
 * Helper function to list all objects under a given prefix in the bucket.
 *
 * @param bucket - The name of the bucket.
 * @param prefix - The prefix path to list objects from.
 * @returns A promise that resolves to an array of BucketItem objects.
 */
const listObjects = (bucket: string, prefix: string): Promise<BucketItem[]> => {
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
const getMiniImageUrls = async (uid: string): Promise<string[]> => {
  const prefix = `/system/${uid}/image-small/`

  // List all objects under the mini image directory.
  const list = await listObjects(bucket, prefix)

  // Construct URLs for each mini image.
  const urls = list.map(obj => '/api/' + obj.name)

  return urls
}

// Export the handler with error handling applied.
export default withErrorHandler(copyFiles)
