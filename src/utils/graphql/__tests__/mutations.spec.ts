import { connectAndDisconnectNode, connectN, deleteN, disconnectN, whereC, whereN } from '../mutations'

describe('whereN', () => {
  it('wraps uid in where.node structure', () => {
    expect(whereN('abc')).toEqual({ where: { node: { uid: 'abc' } } })
  })

  it('handles undefined uid', () => {
    expect(whereN(undefined)).toEqual({ where: { node: { uid: undefined } } })
  })
})

describe('whereC', () => {
  it('wraps code in where.node structure', () => {
    expect(whereC('CODE1')).toEqual({ where: { node: { code: 'CODE1' } } })
  })

  it('handles undefined code', () => {
    expect(whereC(undefined)).toEqual({ where: { node: { code: undefined } } })
  })
})

describe('connectN', () => {
  it('returns connect with whereN when uid provided', () => {
    expect(connectN('abc')).toEqual({
      connect: { where: { node: { uid: 'abc' } } },
    })
  })

  it('returns undefined when no uid', () => {
    expect(connectN(undefined)).toBeUndefined()
  })

  it('returns undefined for empty string', () => {
    expect(connectN('')).toBeUndefined()
  })
})

describe('disconnectN', () => {
  it('returns disconnect with whereN', () => {
    expect(disconnectN('abc')).toEqual({
      disconnect: { where: { node: { uid: 'abc' } } },
    })
  })
})

describe('deleteN', () => {
  it('returns delete with whereN', () => {
    expect(deleteN('abc')).toEqual({
      delete: { where: { node: { uid: 'abc' } } },
    })
  })
})

describe('connectAndDisconnectNode', () => {
  it('returns both connect and disconnect', () => {
    expect(connectAndDisconnectNode('new-uid', 'old-uid')).toEqual({
      connect: { where: { node: { uid: 'new-uid' } } },
      disconnect: { where: { node: { uid: 'old-uid' } } },
    })
  })

  it('returns undefined connect when no uid', () => {
    const result = connectAndDisconnectNode(undefined, 'old-uid')
    expect(result.connect).toBeUndefined()
    expect(result.disconnect).toEqual({ where: { node: { uid: 'old-uid' } } })
  })
})
