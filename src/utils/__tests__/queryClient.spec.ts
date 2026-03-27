import { getQueryClient } from '../queryClient'

describe('getQueryClient', () => {
  it('returns a QueryClient instance', () => {
    const client = getQueryClient()
    expect(client).toBeDefined()
    expect(typeof client.getQueryData).toBe('function')
  })

  it('returns same instance on subsequent calls (browser singleton)', () => {
    const client1 = getQueryClient()
    const client2 = getQueryClient()
    expect(client1).toBe(client2)
  })

  it('has staleTime of 60 seconds', () => {
    const client = getQueryClient()
    const defaults = client.getDefaultOptions()
    expect(defaults.queries?.staleTime).toBe(60 * 1000)
  })
})
