import { renderHook, waitFor } from '@testing-library/react'

import { QueryClientWrapper } from '@/testutils/wrappers/QueryClientWrapper'
import { queryFetcher } from '@/utils/fetcher'

import { useSystemLeaves } from '../useSystemLeaves'

jest.mock('@/utils/fetcher', () => ({
    queryFetcher: jest.fn(),
}))

jest.mock('@/hooks/useQueryManager', () => ({
    __esModule: true,
    default: () => ({ query: { search: 'pump' } }),
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

    describe('directOnly', () => {
        const queryOf = (result: { current: { queryKey: unknown[] } }) =>
            (result.current.queryKey[1] as { query: Record<string, unknown> }).query

        it('omits the param when off, so the endpoint keeps its current shape', () => {
            mockQueryFetcher.mockReturnValue(jest.fn(() => new Promise<never>(() => {})))
            const { result } = renderHook(() => useSystemLeaves('sys-1'), {
                wrapper: QueryClientWrapper,
            })
            expect(queryOf(result)).not.toHaveProperty('directOnly')
        })

        it('adds the param alongside the existing query when on', () => {
            mockQueryFetcher.mockReturnValue(jest.fn(() => new Promise<never>(() => {})))
            const { result } = renderHook(() => useSystemLeaves('sys-1', true), {
                wrapper: QueryClientWrapper,
            })
            // search must survive — the mode narrows the scope, it does not replace filtering
            expect(queryOf(result)).toEqual({ search: 'pump', directOnly: true })
        })

        it('keys the two modes apart so neither serves the other cached rows', () => {
            mockQueryFetcher.mockReturnValue(jest.fn(() => new Promise<never>(() => {})))
            const { result: all } = renderHook(() => useSystemLeaves('sys-1'), {
                wrapper: QueryClientWrapper,
            })
            const { result: direct } = renderHook(() => useSystemLeaves('sys-1', true), {
                wrapper: QueryClientWrapper,
            })
            expect(all.current.queryKey).not.toEqual(direct.current.queryKey)
        })
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
