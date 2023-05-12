import type { NextApiRequest, NextApiResponse } from 'next'
import logger from 'src/server/logger'
import handler from 'src/server/files/handler'
import { composeDebugMessage } from 'src/server/logger'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await handler(req, res)
  } catch (err) {
    logger.debug(composeDebugMessage(req, 'An error occurred during request handling'))
    logger.error(err)
    res.status(500).end()
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb'
    }
  }
}
