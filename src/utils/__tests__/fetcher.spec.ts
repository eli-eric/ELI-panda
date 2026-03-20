import { fetchRequest, fetchRequestDetailed } from '@/core/http/fetchClient'

import { queryFetcher, queryMutate, uniFetcher } from '../fetcher'

jest.mock('@/core/http/fetchClient', () => ({
  fetchRequest: jest.fn(),
  fetchRequestDetailed: jest.fn(),
}))

const mockFetchRequest = fetchRequest as jest.Mock
const mockFetchRequestDetailed = fetchRequestDetailed as jest.Mock

beforeEach(() => {
  jest.clearAllMocks()
})

describe('uniFetcher', () => {
  it('calls fetchRequest with url and returns result', async () => {
    mockFetchRequest.mockResolvedValue({ data: 'test' })
    const result = await uniFetcher('/api/test')
    expect(mockFetchRequest).toHaveBeenCalledWith('/api/test')
    expect(result).toEqual({ data: 'test' })
  })
})

describe('queryFetcher', () => {
  it('returns a function', () => {
    const fn = queryFetcher('systemsList')
    expect(typeof fn).toBe('function')
  })

  it('fetches with resolved endpoint', async () => {
    mockFetchRequest.mockResolvedValue([{ uid: '1' }])
    const fn = queryFetcher('systemsList')
    const result = await fn({
      queryKey: ['systemsList', { query: { search: 'x' } }],
      signal: new AbortController().signal,
      meta: undefined,
    } as any)
    expect(mockFetchRequest).toHaveBeenCalled()
    expect(result).toEqual([{ uid: '1' }])
  })

  it('fetches with simple key (no params)', async () => {
    mockFetchRequest.mockResolvedValue({ ok: true })
    const fn = queryFetcher('systemsHierarchy')
    await fn({
      queryKey: ['systemsHierarchy'],
      signal: new AbortController().signal,
      meta: undefined,
    } as any)
    expect(mockFetchRequest).toHaveBeenCalled()
    const url = mockFetchRequest.mock.calls[0][0] as string
    expect(url).toContain('/systems/hierarchy')
  })

  it('throws when endpoint resolves to null', async () => {
    const fn = queryFetcher('systemSubsystems')
    await expect(
      fn({
        queryKey: ['systemSubsystems', {}],
        signal: new AbortController().signal,
        meta: undefined,
      } as any),
    ).rejects.toThrow()
  })
})

describe('queryMutate', () => {
  it('returns a function', () => {
    const fn = queryMutate('system', 'post', '123')
    expect(typeof fn).toBe('function')
  })

  it('calls fetchRequestDetailed with POST method and body', async () => {
    mockFetchRequestDetailed.mockResolvedValue({
      data: { uid: '123' },
      status: 200,
      statusText: 'OK',
      headers: {},
    })

    const fn = queryMutate('system', 'post', '123')
    const result = await fn({ name: 'Test' })

    expect(mockFetchRequestDetailed).toHaveBeenCalledWith(
      expect.stringContaining('/system/123'),
      expect.objectContaining({
        method: 'POST',
        body: { name: 'Test' },
      }),
    )
    expect(result.data).toEqual({ uid: '123' })
    expect(result.status).toBe(200)
  })

  it('does not send body for delete', async () => {
    mockFetchRequestDetailed.mockResolvedValue({
      data: null,
      status: 204,
      statusText: 'No Content',
      headers: {},
    })

    const fn = queryMutate('system', 'delete', '123')
    await fn({ name: 'ignored' })

    expect(mockFetchRequestDetailed).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'DELETE',
        body: undefined,
      }),
    )
  })

  it('passes responseType option', async () => {
    mockFetchRequestDetailed.mockResolvedValue({
      data: 'blob-data',
      status: 200,
      statusText: 'OK',
      headers: {},
    })

    const fn = queryMutate('system', 'post', '123', false, undefined, 'blob')
    await fn({})

    expect(mockFetchRequestDetailed).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ responseType: 'blob' }),
    )
  })
})
