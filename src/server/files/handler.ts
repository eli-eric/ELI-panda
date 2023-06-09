import type { NextApiRequest, NextApiResponse } from 'next'
import { composeDebugMessage } from 'src/server/logger'

import logger from '../logger'
import { downloadFile, getPathInfo, listFiles, removeFile, uploadFile } from './methods'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.url) {
      logger.error(composeDebugMessage(req, 'Request URL is missing'))
      return res.status(400).end()
    }
    switch (req.method) {
      case 'GET':
        const { id } = getPathInfo(req, res)
        return id ? downloadFile(req, res) : listFiles(req, res)
      case 'POST':
        return uploadFile(req, res)
      case 'DELETE':
        return removeFile(req, res)
      default:
        throw new Error('Method not supported')
    }
  } catch (err) {
    logger.error(err)
    res.status(500).end()
  }
}

export default handler
