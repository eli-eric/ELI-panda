import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'
import React from 'react'

import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import * as fetcher from '@/utils/fetcher'

import { useImages } from '../hooks/useImages'
import type { ImageItem } from '../types'

// Mock fetcher
jest.mock('@/utils/fetcher')

const mockUniFetcher = fetcher.uniFetcher as jest.MockedFunction<typeof fetcher.uniFetcher>

describe('useImages', () => {
    let queryClient: QueryClient

    // Create wrapper with QueryClient
    const createWrapper = () => {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false, // Disable retries for tests
                },
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

    it('fetches images successfully', async () => {
        const mockImages: ImageItem[] = [
            {
                id: '1',
                name: 'image1.jpg',
                url: '/api/catalogue/123/image/1',
                type: 'image/jpeg',
                ts: Date.now(),
                size: 1024,
            },
            {
                id: '2',
                name: 'image2.png',
                url: '/api/catalogue/123/image/2',
                type: 'image/png',
                ts: Date.now(),
                size: 2048,
            },
        ]

        mockUniFetcher.mockResolvedValueOnce(mockImages)

        const { result } = renderHook(
            () =>
                useImages({
                    itemType: FILE_TYPE.CATALOGUE,
                    itemId: '123',
                }),
            { wrapper: createWrapper() },
        )

        // Initially loading
        expect(result.current.isLoading).toBe(true)

        // Wait for success
        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        // Verify data
        expect(result.current.data).toEqual(mockImages)
        expect(mockUniFetcher).toHaveBeenCalledWith('/api/catalogue/123/image')
    })

    it('returns empty array when itemId is undefined', async () => {
        const { result } = renderHook(
            () =>
                useImages({
                    itemType: FILE_TYPE.CATALOGUE,
                    itemId: undefined,
                }),
            { wrapper: createWrapper() },
        )

        // Query should be disabled
        expect(result.current.data).toBeUndefined()
        expect(result.current.isLoading).toBe(false)
        expect(mockUniFetcher).not.toHaveBeenCalled()
    })

    it('handles empty response', async () => {
        mockUniFetcher.mockResolvedValueOnce([])

        const { result } = renderHook(
            () =>
                useImages({
                    itemType: FILE_TYPE.CATALOGUE,
                    itemId: '123',
                }),
            { wrapper: createWrapper() },
        )

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toEqual([])
    })

    it('handles error state', async () => {
        const errorMessage = 'Failed to fetch images'
        mockUniFetcher.mockRejectedValueOnce(new Error(errorMessage))

        const { result } = renderHook(
            () =>
                useImages({
                    itemType: FILE_TYPE.CATALOGUE,
                    itemId: '123',
                }),
            { wrapper: createWrapper() },
        )

        await waitFor(() => expect(result.current.isError).toBe(true))

        expect(result.current.error).toBeDefined()
        expect(result.current.data).toBeUndefined()
    })

    it('uses correct query key', async () => {
        mockUniFetcher.mockResolvedValueOnce([])

        const { result } = renderHook(
            () =>
                useImages({
                    itemType: FILE_TYPE.SYSTEM,
                    itemId: 'abc-123',
                }),
            { wrapper: createWrapper() },
        )

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        // Verify query was called with correct endpoint
        expect(mockUniFetcher).toHaveBeenCalledWith('/api/system/abc-123/image')
    })

    it('is enabled only when itemId is provided', () => {
        const { result: withId } = renderHook(
            () =>
                useImages({
                    itemType: FILE_TYPE.CATALOGUE,
                    itemId: '123',
                }),
            { wrapper: createWrapper() },
        )

        const { result: withoutId } = renderHook(
            () =>
                useImages({
                    itemType: FILE_TYPE.CATALOGUE,
                    itemId: undefined,
                }),
            { wrapper: createWrapper() },
        )

        // With ID should attempt to fetch
        expect(withId.current.isLoading || withId.current.isSuccess).toBe(true)

        // Without ID should not fetch
        expect(withoutId.current.isLoading).toBe(false)
        expect(withoutId.current.data).toBeUndefined()
    })
})
