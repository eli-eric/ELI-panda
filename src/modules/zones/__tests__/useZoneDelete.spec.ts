import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act,renderHook, waitFor } from '@testing-library/react'
import React from 'react'

import * as fetcher from '@/utils/fetcher'

jest.mock('@/utils/fetcher')

const mockQueryMutate = fetcher.queryMutate as jest.MockedFunction<typeof fetcher.queryMutate>

describe('useZoneDelete', () => {
    let queryClient: QueryClient
    const mockMutateFn = jest.fn()

    const createWrapper = () => {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
                mutations: { retry: false },
            },
        })
        const Wrapper = ({ children }: { children: React.ReactNode }) =>
            React.createElement(QueryClientProvider, { client: queryClient }, children)
        Wrapper.displayName = 'TestWrapper'
        return Wrapper
    }

    beforeEach(() => {
        jest.clearAllMocks()
        mockMutateFn.mockResolvedValue({ data: null })
        mockQueryMutate.mockReturnValue(mockMutateFn)
    })

    it('calls queryMutate with delete method and uid', () => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { useZoneDelete } = require('../hooks/useZoneDelete')
        renderHook(() => useZoneDelete('zone-123'), { wrapper: createWrapper() })

        expect(mockQueryMutate).toHaveBeenCalledWith('zone', 'delete', 'zone-123')
    })

    it('returns mutate function', () => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { useZoneDelete } = require('../hooks/useZoneDelete')
        const { result } = renderHook(() => useZoneDelete('zone-123'), {
            wrapper: createWrapper(),
        })

        expect(typeof result.current).toBe('function')
    })

    it('invalidates zones query on success', async () => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { useZoneDelete } = require('../hooks/useZoneDelete')
        const { result } = renderHook(() => useZoneDelete('zone-123'), {
            wrapper: createWrapper(),
        })

        const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries')

        await act(async () => {
            result.current(undefined, {
                onSuccess: () => {},
                onError: () => {},
            })
        })

        await waitFor(() => {
            expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['zones'] })
        })
    })
})
