import type { NextApiRequest } from 'next'

import logger from '@/server/logger'

export interface PathInfo {
  prefix: string
  id: string
  fullPath: string
  uid: string
  shortPrefix: string
}

export const getPathInfo = (req: NextApiRequest): PathInfo | null => {
  const [, , itemCategory, itemId, fileCategory, fileId] = (
    req.url ?? ''
  ).split('/')

  if (!(itemCategory && itemId && fileCategory)) {
    logger.info('Failed to extract PathInfo from request')
    return null
  }

  const prefix = `/${itemCategory}/${itemId}/${fileCategory}/`
  const shortPrefix = `/${itemCategory}/${itemId}/`
  const id = fileId
  const fullPath = prefix + id
  return { prefix, id, fullPath, uid: itemId, shortPrefix }
}
