import type { NextApiRequest, NextApiResponse } from 'next'
import logger from 'src/server/logger'
import handler from 'src/server/files/handler'
import { composeDebugMessage } from 'src/server/logger'
import { getToken } from 'next-auth/jwt'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getToken({ req })
  if (user) {
    logger.debug(composeDebugMessage(req, 'Incoming request'))
    await handler(req, res)
  } else {
    logger.error(composeDebugMessage(req, 'Unauthorized request'))
    res.status(401).end()
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb'
    }
  }
}
