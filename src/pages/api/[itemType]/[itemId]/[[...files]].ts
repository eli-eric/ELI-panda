import type { NextApiRequest, NextApiResponse } from 'next'
import logger from 'src/server/logger'
import handler from 'src/server/files/handler'
import { composeDebugMessage } from 'src/server/logger'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  logger.debug(composeDebugMessage(req, 'Incoming request'))
  return await handler(req, res)
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb'
    }
  }
}
