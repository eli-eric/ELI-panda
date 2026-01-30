import type { NextApiRequest, NextApiResponse } from 'next'
import { composeDebugMessage } from 'src/server/logger'

import logger from '../logger'
import downloadFile from './api/download-file'
import listFiles from './api/list-files'
import removeFile from './api/remove-file'
import updateFile from './api/update-file'
import uploadFile from './api/upload-file'
import { getPathInfo } from './utils/path-utils'

class ClientError extends Error {
    constructor(
        message: string,
        public statusCode: number = 400,
    ) {
        super(message)
        this.name = 'ClientError'
    }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (!req.url) {
            logger.error(composeDebugMessage(req, 'Request URL is missing'))
            return res.status(400).json({ error: 'Request URL is missing' })
        }

        switch (req.method) {
            case 'GET': {
                const pathInfo = getPathInfo(req)
                return pathInfo?.id ? downloadFile(req, res) : listFiles(req, res)
            }
            case 'POST':
                return uploadFile(req, res)
            case 'DELETE':
                return removeFile(req, res)
            case 'PUT':
                return updateFile(req, res)
            default:
                logger.warn(composeDebugMessage(req, `Method not supported: ${req.method}`))
                return res.status(405).json({ error: `Method ${req.method} not supported` })
        }
    } catch (err) {
        // Distinguish between client errors (4xx) and server errors (5xx)
        if (err instanceof ClientError) {
            logger.warn(composeDebugMessage(req, err.message))
            return res.status(err.statusCode).json({ error: err.message })
        }

        // Log server errors
        logger.error(composeDebugMessage(req, 'Server error'), err)
        if (!res.headersSent) {
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
}

export default handler
