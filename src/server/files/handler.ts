import type { NextApiRequest, NextApiResponse } from 'next'
import { composeDebugMessage } from 'src/server/logger'

import logger from '../logger'
import downloadFile from './api/download-file'
import listFiles from './api/list-files'
import removeFile from './api/remove-file'
import updateFile from './api/update-file'
import uploadFile from './api/upload-file'
import { getPathInfo } from './utils/path-utils'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.url) {
      logger.error(composeDebugMessage(req, 'Request URL is missing'))
      return res.status(400).end()
    }
    switch (req.method) {
      case 'GET':
        const pathInfo = getPathInfo(req)
        return pathInfo?.id ? downloadFile(req, res) : listFiles(req, res)
      case 'POST':
        return uploadFile(req, res)
      case 'DELETE':
        return removeFile(req, res)
      case 'PUT':
        return updateFile(req, res)
      default:
        throw new Error('Method not supported')
    }
  } catch (err) {
    logger.error(err)
    res.status(500).end()
  }
}

export default handler
