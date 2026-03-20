import executeRequest from '../executeRequest'

// Polyfill Request for jsdom
if (typeof globalThis.Request === 'undefined') {
  globalThis.Request = class Request {
    url: string
    method: string
    headers: Headers
    constructor(url: string, options: RequestInit = {}) {
      this.url = url
      this.method = options.method ?? 'GET'
      this.headers = new Headers(options.headers)
    }
  } as any
}

const mockFetch = jest.fn()
global.fetch = mockFetch

beforeEach(() => {
  jest.clearAllMocks()
})

describe('executeRequest', () => {
  it('calls onSuccess with parsed JSON on successful response', async () => {
    const data = { result: 'ok' }
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve(data),
    })
    const onSuccess = jest.fn()

    await executeRequest('/api/test', {}, onSuccess)

    expect(onSuccess).toHaveBeenCalledWith(data)
  })

  it('calls onError when fetch throws', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'))
    const onError = jest.fn()

    await executeRequest('/api/test', {}, undefined, onError)

    expect(onError).toHaveBeenCalledWith(expect.any(Error))
    expect(onError.mock.calls[0][0].message).toBe('Network error')
  })

  it('wraps non-Error throws in Error', async () => {
    mockFetch.mockRejectedValue('string error')
    const onError = jest.fn()

    await executeRequest('/api/test', {}, undefined, onError)

    expect(onError).toHaveBeenCalledWith(expect.any(Error))
    expect(onError.mock.calls[0][0].message).toBe('string error')
  })

  it('calls fetch with the url', async () => {
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve({}),
    })

    await executeRequest('/api/test', { method: 'POST' })

    expect(mockFetch).toHaveBeenCalledTimes(1)
  })

  it('uses default callbacks when none provided', async () => {
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve({ ok: true }),
    })

    await expect(executeRequest('/api/test')).resolves.toBeUndefined()
  })
})
