import { PATH } from '@/types/constants/paths'

import type { NodeType } from '../types'

/**
 * Maps a node type and UID to the correct application path
 */
export const getRedirectPath = (nodeType: NodeType, uid: string): string => {
  const pathMap: Record<NodeType, string> = {
    System: `${PATH.SYSTEM}/${uid}`,
    Order: `${PATH.ORDER}/${uid}`,
    CatalogueItem: `${PATH.CATALOGUE_ITEM}/${uid}`
  }

  return pathMap[nodeType]
}
