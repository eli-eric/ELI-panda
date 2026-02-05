// utils/withErrorHandler.ts

import type { NextApiRequest, NextApiResponse } from 'next'

import logger from '@/server/logger'

export const withErrorHandler = (
    handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            await handler(req, res)
        } catch (error) {
            logger.error(`Error in API handler: ${error}`)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}
