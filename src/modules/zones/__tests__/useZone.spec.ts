import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import React from 'react'

import * as fetcher from '@/utils/fetcher'

import type { Zone } from '../types/zone.types'

jest.mock('@/utils/fetcher')

const mockQueryFetcher = fetcher.queryFetcher as jest.MockedFunction<typeof fetcher.queryFetcher>

const mockZone: Zone = {
    uid: '1',
    name: 'Zone A',
    code: 'ZA',
    parentZone: null,
}

describe('useZone', () => {
    let queryClient: QueryClient

    const createWrapper = () => {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
            },
        })
        const Wrapper = ({ children }: { children: React.ReactNode }) =>
            React.createElement(QueryClientProvider, { client: queryClient }, children)
        Wrapper.displayName = 'TestWrapper'
        return Wrapper
    }

    beforeEach(() => {
        jest.clearAllMocks()
        mockQueryFetcher.mockReturnValue(jest.fn().mockResolvedValue(mockZone))
    })

    it('fetches single zone by uid', async () => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { useZone } = require('../hooks/useZone')
        const { result } = renderHook(() => useZone('1'), {
            wrapper: createWrapper(),
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(mockQueryFetcher).toHaveBeenCalledWith('zone')
        expect(result.current.data).toEqual(mockZone)
    })

    it('does not fetch when uid is undefined', () => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { useZone } = require('../hooks/useZone')
        const { result } = renderHook(() => useZone(undefined), {
            wrapper: createWrapper(),
        })

        expect(result.current.fetchStatus).toBe('idle')
    })

    it('does not fetch when uid is empty string', () => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { useZone } = require('../hooks/useZone')
        const { result } = renderHook(() => useZone(''), {
            wrapper: createWrapper(),
        })

        expect(result.current.fetchStatus).toBe('idle')
    })

    it('has staleTime of 0', async () => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { useZone } = require('../hooks/useZone')
        const { result } = renderHook(() => useZone('1'), {
            wrapper: createWrapper(),
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        // Data should be immediately stale (staleTime: 0)
        expect(result.current.isStale).toBe(true)
    })
})
