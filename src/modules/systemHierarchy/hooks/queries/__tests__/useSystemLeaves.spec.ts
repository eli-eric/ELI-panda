import { renderHook, waitFor } from '@testing-library/react'

import { QueryClientWrapper } from '@/testutils/wrappers/QueryClientWrapper'
import { queryFetcher } from '@/utils/fetcher'

import { useSystemLeaves } from '../useSystemLeaves'

jest.mock('@/utils/fetcher', () => ({
    queryFetcher: jest.fn(),
}))

jest.mock('@/hooks/useQueryManager', () => ({
    __esModule: true,
    default: () => ({ query: {} }),
}))

const mockQueryFetcher = queryFetcher as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useSystemLeaves', () => {
    it('disabled with no parent: empty + not in initial-load (query idle)', () => {
        mockQueryFetcher.mockReturnValue(jest.fn())
        const { result } = renderHook(() => useSystemLeaves(null), {
            wrapper: QueryClientWrapper,
        })
        expect(result.current.isInitialLoad).toBe(false)
        expect(result.current.leaves).toEqual([])
    })

    it('isInitialLoad true before first response arrives', () => {
        // never-resolving fetch keeps the query pending
        mockQueryFetcher.mockReturnValue(jest.fn(() => new Promise<never>(() => {})))
        const { result } = renderHook(() => useSystemLeaves('sys-1'), {
            wrapper: QueryClientWrapper,
        })
        expect(result.current.isInitialLoad).toBe(true)
        expect(result.current.leaves).toEqual([])
    })

    it('isInitialLoad false once data is loaded', async () => {
        mockQueryFetcher.mockReturnValue(
            jest.fn().mockResolvedValue({
                data: [{ uid: 'l1', name: 'Leaf 1' }],
                totalCount: 1,
            }),
        )
        const { result } = renderHook(() => useSystemLeaves('sys-1'), {
            wrapper: QueryClientWrapper,
        })
        await waitFor(() => expect(result.current.isInitialLoad).toBe(false))
        expect(result.current.leaves).toHaveLength(1)
        expect(result.current.totalCount).toBe(1)
    })

    it('isInitialLoad false after a failed first fetch (no perpetual skeleton)', async () => {
        mockQueryFetcher.mockReturnValue(jest.fn().mockRejectedValue(new Error('boom')))
        const { result } = renderHook(() => useSystemLeaves('sys-1'), {
            wrapper: QueryClientWrapper,
        })
        // data stays undefined, but once the fetch stops the table must fall
        // through to the empty/error state rather than show the skeleton forever.
        await waitFor(() => expect(result.current.error).toBeTruthy())
        expect(result.current.isInitialLoad).toBe(false)
        expect(result.current.leaves).toEqual([])
    })
})
