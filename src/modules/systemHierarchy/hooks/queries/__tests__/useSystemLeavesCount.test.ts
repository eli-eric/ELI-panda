import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'
import React from 'react'

import * as fetcher from '@/utils/fetcher'

import { useSystemLeavesCount } from '../useSystemLeavesCount'

jest.mock('@/utils/fetcher')

const mockQueryFetcher = fetcher.queryFetcher as jest.MockedFunction<typeof fetcher.queryFetcher>

describe('useSystemLeavesCount', () => {
    let queryClient: QueryClient

    const createWrapper = () => {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
            },
        })

        const Wrapper = ({ children }: { children: ReactNode }) =>
            React.createElement(QueryClientProvider, { client: queryClient }, children)
        Wrapper.displayName = 'QueryClientWrapper'
        return Wrapper
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('fetches recursive leaves count for given system uid', async () => {
        mockQueryFetcher.mockReturnValue(
            jest.fn().mockResolvedValue({
                count: 12,
            }),
        )

        const { result } = renderHook(() => useSystemLeavesCount('parent-uid'), {
            wrapper: createWrapper(),
        })

        await waitFor(() => expect(result.current.isLoading).toBe(false))

        expect(mockQueryFetcher).toHaveBeenCalledWith('systemLeavesCount')
        expect(result.current.count).toBe(12)
    })
})
