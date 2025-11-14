import { PATH } from '@/types/constants/paths'

import type { NodeType } from '../types'
import { getRedirectPath } from '../utils/getRedirectPath'

describe('getRedirectPath', () => {
  it('returns correct path for System node type', () => {
    const result = getRedirectPath('System', 'abc-123')
    expect(result).toBe(`${PATH.SYSTEM}/abc-123`)
  })

  it('returns correct path for Order node type', () => {
    const result = getRedirectPath('Order', 'order-456')
    expect(result).toBe(`${PATH.ORDER}/order-456`)
  })

  it('returns correct path for CatalogueItem node type', () => {
    const result = getRedirectPath('CatalogueItem', 'cat-789')
    expect(result).toBe(`${PATH.CATALOGUE_ITEM}/cat-789`)
  })

  it('handles special characters in uid', () => {
    const uidWithSpecialChars = 'test-123_ABC@xyz'
    const result = getRedirectPath('System', uidWithSpecialChars)
    expect(result).toBe(`${PATH.SYSTEM}/${uidWithSpecialChars}`)
  })

  it('generates correct paths for all node types', () => {
    const nodeTypes: NodeType[] = ['System', 'Order', 'CatalogueItem']
    const uid = 'test-uid'

    const expectedPaths = {
      System: `${PATH.SYSTEM}/${uid}`,
      Order: `${PATH.ORDER}/${uid}`,
      CatalogueItem: `${PATH.CATALOGUE_ITEM}/${uid}`
    }

    nodeTypes.forEach(nodeType => {
      expect(getRedirectPath(nodeType, uid)).toBe(expectedPaths[nodeType])
    })
  })
})
