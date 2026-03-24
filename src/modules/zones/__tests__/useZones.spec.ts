import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import React from 'react'

import * as fetcher from '@/utils/fetcher'

import type { ZonesResponse } from '../types/zone.types'

jest.mock('@/utils/fetcher')
jest.mock('@/hooks/useQueryManager', () => ({
    __esModule: true,
    default: () => ({ query: '?page=1&pageSize=25' }),
}))

const mockQueryFetcher = fetcher.queryFetcher as jest.MockedFunction<typeof fetcher.queryFetcher>

const mockZonesResponse: ZonesResponse = {
    data: [
        { uid: '1', name: 'Zone A', code: 'ZA', parentZone: null },
        {
            uid: '2',
            name: 'Zone B',
            code: 'ZB',
            parentZone: { uid: '1', name: 'Zone A' },
        },
    ],
    totalCount: 2,
}

describe('useZones', () => {
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
        mockQueryFetcher.mockReturnValue(jest.fn().mockResolvedValue(mockZonesResponse))
    })

    it('fetches zones with correct endpoint type', async () => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { useZones } = require('../hooks/useZones')
        const { result } = renderHook(() => useZones('zones'), {
            wrapper: createWrapper(),
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(mockQueryFetcher).toHaveBeenCalledWith('zones')
        expect(result.current.data).toEqual(mockZonesResponse)
    })

    it('returns loading state initially', () => {
        mockQueryFetcher.mockReturnValue(
            jest.fn().mockReturnValue(new Promise(() => {})),
        )
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { useZones } = require('../hooks/useZones')
        const { result } = renderHook(() => useZones('zones'), {
            wrapper: createWrapper(),
        })

        expect(result.current.isLoading).toBe(true)
        expect(result.current.data).toBeUndefined()
    })

    it('handles error state', async () => {
        mockQueryFetcher.mockReturnValue(
            jest.fn().mockRejectedValue(new Error('Network error')),
        )
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { useZones } = require('../hooks/useZones')
        const { result } = renderHook(() => useZones('zones'), {
            wrapper: createWrapper(),
        })

        await waitFor(() => expect(result.current.isError).toBe(true))
        expect(result.current.error).toBeDefined()
    })
})
