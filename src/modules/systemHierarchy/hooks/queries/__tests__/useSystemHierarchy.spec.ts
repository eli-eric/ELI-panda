import { renderHook, waitFor } from '@testing-library/react'

import { QueryClientWrapper } from '@/testutils/wrappers/QueryClientWrapper'
import { queryFetcher } from '@/utils/fetcher'

import { useSystemHierarchy } from '../useSystemHierarchy'

jest.mock('@/utils/fetcher', () => ({
    queryFetcher: jest.fn(),
}))

jest.mock('sonner', () => ({ toast: { error: jest.fn() } }))
const sonner = jest.requireMock('sonner')

const mockQueryFetcher = queryFetcher as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useSystemHierarchy', () => {
    it('returns nodes from queryFetcher', async () => {
        mockQueryFetcher.mockReturnValue(
            jest.fn().mockResolvedValue([{ uid: 'a', name: 'A', children: [] }]),
        )
        const { result } = renderHook(() => useSystemHierarchy(), {
            wrapper: QueryClientWrapper,
        })
        await waitFor(() => expect(result.current.nodes.length).toBeGreaterThan(0))
        expect(result.current.nodes[0].uid).toBe('a')
    })

    it('nodes defaults to empty array', () => {
        mockQueryFetcher.mockReturnValue(jest.fn().mockResolvedValue(undefined as any))
        const { result } = renderHook(() => useSystemHierarchy(), {
            wrapper: QueryClientWrapper,
        })
        expect(result.current.nodes).toEqual([])
    })

    it('toasts error on failure', async () => {
        mockQueryFetcher.mockReturnValue(jest.fn().mockRejectedValue(new Error('boom')))
        renderHook(() => useSystemHierarchy(), { wrapper: QueryClientWrapper })
        await waitFor(() =>
            expect(sonner.toast.error).toHaveBeenCalledWith('Error fetching hierarchy: boom'),
        )
    })
})
