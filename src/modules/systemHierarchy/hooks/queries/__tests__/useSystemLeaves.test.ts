import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { useQueryState } from 'next-usequerystate'
import type { ReactNode } from 'react'
import React from 'react'

import useTableStateStore from '@/store/useTableStateStore'
import * as fetcher from '@/utils/fetcher'

import { useSystemLeaves } from '../useSystemLeaves'

jest.mock('next-usequerystate', () => ({
    useQueryState: jest.fn(),
}))

jest.mock('@/utils/fetcher')

const mockUseQueryState = useQueryState as jest.Mock
const mockQueryFetcher = fetcher.queryFetcher as jest.MockedFunction<typeof fetcher.queryFetcher>

const queryState: Record<string, string | null> = {}

const getPagination = (queryKey: any) => JSON.parse(queryKey[1].query.pagination)

describe('useSystemLeaves', () => {
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
        sessionStorage.clear()
        useTableStateStore.setState({ instances: {} })

        Object.keys(queryState).forEach(key => {
            delete queryState[key]
        })

        mockUseQueryState.mockImplementation((key: string) => [queryState[key] ?? null, jest.fn()])
    })

    it('uses table default pageSize 25 on initial query', async () => {
        mockQueryFetcher.mockReturnValue(
            jest.fn().mockResolvedValue({
                data: [],
                totalCount: 0,
            }),
        )

        const { result } = renderHook(() => useSystemLeaves('parent-uid'), {
            wrapper: createWrapper(),
        })

        await waitFor(() => expect(result.current.isLoading).toBe(false))

        expect(mockQueryFetcher).toHaveBeenCalledWith('systemLeaves')
        expect(getPagination(result.current.queryKey)).toEqual({
            page: 1,
            pageSize: 25,
        })
    })

    it('uses paginationState from store when available', async () => {
        useTableStateStore.setState({
            instances: {
                systemLeaves: {
                    paginationState: {
                        page: 3,
                        pageSize: 10,
                    },
                    pagination: '{"page":3,"pageSize":10}',
                },
            },
        })

        mockQueryFetcher.mockReturnValue(
            jest.fn().mockResolvedValue({
                data: [],
                totalCount: 0,
            }),
        )

        const { result } = renderHook(() => useSystemLeaves('parent-uid'), {
            wrapper: createWrapper(),
        })

        await waitFor(() => expect(result.current.isLoading).toBe(false))

        expect(getPagination(result.current.queryKey)).toEqual({
            page: 3,
            pageSize: 10,
        })
    })
})
