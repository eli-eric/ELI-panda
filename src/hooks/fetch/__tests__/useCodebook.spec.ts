import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import React from 'react'

import { queryFetcher } from '@/utils/fetcher'

import { useCodebook } from '../useCodebook'

jest.mock('@/utils/fetcher', () => ({
    queryFetcher: jest.fn(),
}))

const mockQueryFetcher = queryFetcher as jest.Mock
const mockFetchFn = jest.fn()

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    })
    const Wrapper = ({ children }: { children: React.ReactNode }) =>
        React.createElement(QueryClientProvider, { client: queryClient }, children)
    Wrapper.displayName = 'TestQueryWrapper'
    return Wrapper
}

beforeEach(() => {
    jest.clearAllMocks()
    mockQueryFetcher.mockReturnValue(mockFetchFn)
})

describe('useCodebook', () => {
    it('fetches codebook data when codebookName provided', async () => {
        mockFetchFn.mockResolvedValue([{ uid: '1', name: 'Item' }])

        const { result } = renderHook(() => useCodebook('MATERIAL_TYPE' as any), {
            wrapper: createWrapper(),
        })

        await waitFor(() => expect(result.current.data).toBeDefined())
        expect(mockQueryFetcher).toHaveBeenCalledWith('codebook')
    })

    it('does not fetch when codebookName is undefined', () => {
        const { result } = renderHook(() => useCodebook(undefined), {
            wrapper: createWrapper(),
        })

        expect(result.current.data).toBeUndefined()
        expect(mockFetchFn).not.toHaveBeenCalled()
    })

    it('returns queryKey for cache invalidation', () => {
        const { result } = renderHook(() => useCodebook('UNIT' as any), {
            wrapper: createWrapper(),
        })

        expect(result.current.queryKey[0]).toBe('codebook')
        expect(result.current.queryKey[1]).toMatchObject({ path: 'UNIT' })
    })
})
