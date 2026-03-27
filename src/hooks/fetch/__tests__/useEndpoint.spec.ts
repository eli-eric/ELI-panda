import { renderHook } from '@testing-library/react'

import { getEndpoints, useEndpoint } from '../useEndpoint'

describe('getEndpoints', () => {
  it('returns endpoints with uid', () => {
    const ep = getEndpoints('123')
    expect(ep.systemDetail).toBe('/system/123')
    expect(ep.catalogueItem).toBe('/catalogue/item/123')
  })

  it('returns endpoints without uid', () => {
    const ep = getEndpoints()
    expect(ep.catalogueItem).toBe('/catalogue/item')
    expect(ep.system).toBe('/system')
  })

  it('returns null for uid-required endpoints when uid missing', () => {
    const ep = getEndpoints()
    expect(ep.systemSubsystems).toBeNull()
  })

  it('includes path in category endpoints', () => {
    const ep = getEndpoints(undefined, '/electronics')
    expect(ep.catalogueCategories).toBe('/catalogue/categories/electronics')
  })

  it('includes query string', () => {
    const ep = getEndpoints(undefined, undefined, undefined, '?search=test')
    expect(ep.systemsList).toBe('/systems?search=test')
  })
})

describe('useEndpoint', () => {
  it('returns endpoints with query params', () => {
    const { result } = renderHook(() =>
      useEndpoint({ query: { search: 'test' } }),
    )
    expect(result.current.systemsList).toContain('?search=test')
  })

  it('returns endpoints without query when query is undefined', () => {
    const { result } = renderHook(() => useEndpoint({ uid: '123' }))
    expect(result.current.systemDetail).toBe('/system/123')
    expect(result.current.systemsList).toBe('/systems')
  })

  it('works with no args', () => {
    const { result } = renderHook(() => useEndpoint())
    expect(result.current.system).toBe('/system')
  })
})
