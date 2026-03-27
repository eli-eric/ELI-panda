import { getEndpoints } from '../getEndpoints'

describe('getEndpoints', () => {
  it('returns endpoints with uid in paths', () => {
    const endpoints = getEndpoints({ uid: '123' })
    expect(endpoints.systemDetail).toBe('/system/123')
    expect(endpoints.catalogueItem).toBe('/catalogue/item/123')
    expect(endpoints.system).toBe('/system/123')
    expect(endpoints.order).toBe('/order/123')
  })

  it('returns endpoints without uid', () => {
    const endpoints = getEndpoints({})
    expect(endpoints.catalogueItem).toBe('/catalogue/item')
    expect(endpoints.system).toBe('/system')
    expect(endpoints.order).toBe('/order')
  })

  it('returns null for uid-required endpoints when uid missing', () => {
    const endpoints = getEndpoints({})
    expect(endpoints.systemSubsystems).toBeNull()
    expect(endpoints.systemLeaves).toBeNull()
    expect(endpoints.systemLeavesCount).toBeNull()
  })

  it('includes path in category endpoints', () => {
    const endpoints = getEndpoints({ path: '/electronics' })
    expect(endpoints.catalogueCategories).toBe('/catalogue/categories/electronics')
  })

  it('includes itemUid in delivery endpoints', () => {
    const endpoints = getEndpoints({ uid: 'order-1', itemUid: 'line-1' })
    expect(endpoints.orderLineDelivery).toBe('/order/order-1/orderline/line-1/delivery')
    expect(endpoints.serviceLineDelivery).toBe('/order/order-1/serviceline/line-1/delivery')
  })

  it('appends query string from query param', () => {
    const endpoints = getEndpoints({ query: { search: 'test', page: 1 } })
    expect(endpoints.catalogueItems).toContain('?')
    expect(endpoints.catalogueItems).toContain('search=test')
    expect(endpoints.catalogueItems).toContain('page=1')
  })

  it('sanitizes null/undefined/empty values from query', () => {
    const endpoints = getEndpoints({
      query: { search: 'test', empty: '', nil: null } as any,
    })
    expect(endpoints.catalogueItems).toContain('search=test')
    expect(endpoints.catalogueItems).not.toContain('empty')
    expect(endpoints.catalogueItems).not.toContain('nil')
  })

  it('handles codebook in tree endpoint', () => {
    const endpoints = getEndpoints({ codebook: 'MATERIAL_TYPE' })
    expect(endpoints.codebookTree).toContain('/codebook/MATERIAL_TYPE/tree')
  })

  it('returns no query string when query is null', () => {
    const endpoints = getEndpoints({ query: null })
    expect(endpoints.systemsList).toBe('/systems')
  })
})
