// pages/api/files/copy.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import logger from 'src/server/logger'
import { composeDebugMessage } from 'src/server/logger'
import copyFiles from '@/server/files/api/copy-files'

/**
 * API Route Handler for Copying Files
 *
 * This handler manages incoming requests to copy files from a source UID directory
 * to a destination UID directory within MinIO. It ensures the user is authenticated
 * before proceeding and delegates the copying process to the `copyFiles` function.
 *
 * interface CopyFilesRequestBody {
 * sourceUid: string;
 * destinationUid: string;
 * }
 * @param req - The Next.js API request object.
 * @param res - The Next.js API response object.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Retrieve the user's authentication token from the request.
  const user = await getToken({ req })

  if (user) {
    // Log the incoming request for debugging purposes.
    logger.debug(composeDebugMessage(req, 'Incoming request'))

    switch (req.method) {
      case 'POST':
        // Handle the POST request by calling the copyFiles function.
        return copyFiles(req, res)
      default:
        // Respond with a 405 Method Not Allowed error for unsupported methods.
        res.setHeader('Allow', ['POST'])
        return res.status(405).json({ error: 'Method Not Allowed' })
    }
  } else {
    // Log the unauthorized access attempt.
    logger.error(composeDebugMessage(req, 'Unauthorized request'))
    // Respond with a 401 Unauthorized error.
    return res.status(401).json({ error: 'Unauthorized' })
  }
}
