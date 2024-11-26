// api/copyFiles.ts

import { CopyConditions } from 'minio'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import path from 'path'

import logger, { composeDebugMessage } from '@/server/logger'
import s3Client, { config } from '@/server/s3client'

import { saveUrlsToNode } from '../service/node-service'
import { getMiniImageUrls, listObjects } from '../utils/copy-file.utils'
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

  // Verify that sourceUid and destinationUid are different
  if (sourceUid === destinationUid) {
    logger.error(
      composeDebugMessage(req, 'Source and destination UIDs are the same')
    )
    return res
      .status(400)
      .json({ error: 'Source and destination UIDs must be different' })
  }

  try {
    // Define the source and destination prefixes based on the UIDs.
    const sourcePrefix = `/system/${sourceUid}/`
    const destinationPrefix = `/system/${destinationUid}/`

    // Log prefixes
    logger.debug(`Source Prefix: ${sourcePrefix}`)
    logger.debug(`Destination Prefix: ${destinationPrefix}`)

    // List all objects under the source UID directory.
    const objects = await listObjects(bucket, sourcePrefix)

    // If no objects are found, return an error response.
    if (objects.length === 0) {
      return res.status(404).json({ error: 'No files found to copy' })
    }

    // Copy each object to the destination directory concurrently.
    await Promise.all(
      objects.map(async obj => {
        const sourceObjectName = '/' + obj.name

        // Ensure the sourceObjectName starts with sourcePrefix
        if (!sourceObjectName?.startsWith(sourcePrefix)) {
          logger.warn(
            `Skipping object ${sourceObjectName} as it does not start with sourcePrefix: ${sourcePrefix}`
          )
          return
        }

        // Get the relative path after the sourcePrefix
        const relativePath = sourceObjectName?.substring(sourcePrefix.length)

        // Construct the destinationObjectName
        const destinationObjectName = path.posix.join(
          destinationPrefix,
          relativePath
        )

        // Add logging
        logger.debug(
          `Copying object from ${sourceObjectName} to ${destinationObjectName}`
        )

        // Check if source and destination names are the same
        if (sourceObjectName === destinationObjectName) {
          logger.warn(
            `Skipping copy for ${sourceObjectName} as source and destination are the same.`
          )
          return
        }

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
    let errorMessage = 'Unknown error'

    // Type guard to check if error is an instance of Error
    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === 'string') {
      // If error is a string
      errorMessage = error
    } else {
      // For other types, convert to string
      errorMessage = JSON.stringify(error)
    }

    // Log the error with more details
    logger.error(
      `Failed to copy files from ${sourceUid} to ${destinationUid}: ${errorMessage}`
    )

    // Send the response
    res
      .status(500)
      .json({ error: 'Failed to copy files', details: errorMessage })
  }
}

// Export the handler with error handling applied.
export default withErrorHandler(copyFiles)
