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
  const pathInfo = { prefix, id, fullPath, uid: itemId, shortPrefix }

  return {
    ...pathInfo,
    prefix: prefix.startsWith('/') ? prefix.substring(1) : prefix
  }
}
// Add this function:

/**
 * Sanitizes an S3 object key to ensure it's valid.
 * - Removes leading slashes
 * - Ensures no double slashes
 * - Removes trailing slashes
 */
export function sanitizeS3Key(key: string): string {
  // Remove leading slash
  let sanitized = key.startsWith('/') ? key.substring(1) : key

  // Replace any double slashes with single slash
  sanitized = sanitized.replace(/\/+/g, '/')

  // Remove trailing slash if present
  sanitized = sanitized.endsWith('/') ? sanitized.slice(0, -1) : sanitized

  return sanitized
}
