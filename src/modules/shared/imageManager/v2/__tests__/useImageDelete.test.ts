import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'
import React from 'react'
import { toast } from 'sonner'

import * as fetchClient from '@/core/http/fetchClient'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'

import { useImageDelete } from '../hooks/useImageDelete'
import type { ImageItem } from '../types'

// Mock dependencies
jest.mock('@/core/http/fetchClient')
jest.mock('sonner')

const mockFetchRequest = fetchClient.fetchRequest as jest.MockedFunction<
    typeof fetchClient.fetchRequest
>
const mockToast = toast as jest.Mocked<typeof toast>

describe('useImageDelete', () => {
    let queryClient: QueryClient

    const createWrapper = () => {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
                mutations: { retry: false },
            },
        })

        const Wrapper = ({ children }: { children: ReactNode }) =>
            React.createElement(QueryClientProvider, { client: queryClient }, children)
        Wrapper.displayName = 'QueryClientWrapper'
        return Wrapper
    }

    const mockImages: ImageItem[] = [
        {
            id: 'image-1',
            name: 'first.jpg',
            url: '/api/catalogue/123/image/image-1',
            type: 'image/jpeg',
            ts: Date.now(),
            size: 1024,
        },
        {
            id: 'image-2',
            name: 'second.png',
            url: '/api/catalogue/123/image/image-2',
            type: 'image/png',
            ts: Date.now(),
            size: 2048,
        },
    ]

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('deletes image successfully', async () => {
        const wrapper = createWrapper()
        // Pre-populate cache with images
        queryClient.setQueryData(['images', FILE_TYPE.CATALOGUE, '123'], mockImages)

        mockFetchRequest.mockResolvedValueOnce(undefined)

        const { result } = renderHook(
            () =>
                useImageDelete({
                    itemType: FILE_TYPE.CATALOGUE,
                    itemId: '123',
                }),
            { wrapper },
        )

        act(() => {
            result.current.mutate({
                imageId: 'image-1',
                imageName: 'first.jpg',
            })
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        // Verify API call
        expect(mockFetchRequest).toHaveBeenCalledWith(
            '/api/catalogue/123/image/image-1',
            expect.objectContaining({
                method: 'DELETE',
            }),
        )

        // Verify success toast
        expect(mockToast.success).toHaveBeenCalledWith('Deleted first.jpg')

        // Verify cache updated
        const cacheData = queryClient.getQueryData<ImageItem[]>([
            'images',
            FILE_TYPE.CATALOGUE,
            '123',
        ])

        expect(cacheData).toHaveLength(1)
        expect(cacheData?.[0].id).toBe('image-2')
    })

    it('shows optimistic removal immediately', async () => {
        const wrapper = createWrapper()
        // Pre-populate cache with images
        queryClient.setQueryData(['images', FILE_TYPE.CATALOGUE, '123'], mockImages)

        // Delay the API response
        mockFetchRequest.mockImplementation(
            () => new Promise(resolve => setTimeout(() => resolve(undefined), 100)),
        )

        const { result } = renderHook(
            () =>
                useImageDelete({
                    itemType: FILE_TYPE.CATALOGUE,
                    itemId: '123',
                }),
            { wrapper },
        )

        // Verify initial state
        let cacheData = queryClient.getQueryData<ImageItem[]>([
            'images',
            FILE_TYPE.CATALOGUE,
            '123',
        ])
        expect(cacheData).toHaveLength(2)

        act(() => {
            result.current.mutate({
                imageId: 'image-1',
                imageName: 'first.jpg',
            })
        })

        // Wait for mutation to start
        await waitFor(() => expect(result.current.isPending).toBe(true))

        // Check optimistic update
        cacheData = queryClient.getQueryData<ImageItem[]>(['images', FILE_TYPE.CATALOGUE, '123'])

        expect(cacheData).toHaveLength(1) // Removed immediately
        expect(cacheData?.[0].id).toBe('image-2')

        // Wait for success
        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        // Final check
        cacheData = queryClient.getQueryData<ImageItem[]>(['images', FILE_TYPE.CATALOGUE, '123'])

        expect(cacheData).toHaveLength(1)
        expect(cacheData?.[0].id).toBe('image-2')
    })

    it('rolls back on delete error', async () => {
        const wrapper = createWrapper()
        // Pre-populate cache with images
        queryClient.setQueryData(['images', FILE_TYPE.CATALOGUE, '123'], mockImages)

        mockFetchRequest.mockRejectedValueOnce(new Error('Delete failed'))

        const { result } = renderHook(
            () =>
                useImageDelete({
                    itemType: FILE_TYPE.CATALOGUE,
                    itemId: '123',
                }),
            { wrapper },
        )

        // Verify initial state
        let cacheData = queryClient.getQueryData<ImageItem[]>([
            'images',
            FILE_TYPE.CATALOGUE,
            '123',
        ])
        expect(cacheData).toHaveLength(2)

        act(() => {
            result.current.mutate({
                imageId: 'image-1',
                imageName: 'first.jpg',
            })
        })

        await waitFor(() => expect(result.current.isError).toBe(true))

        // Verify cache was rolled back
        cacheData = queryClient.getQueryData<ImageItem[]>(['images', FILE_TYPE.CATALOGUE, '123'])

        expect(cacheData).toHaveLength(2) // Restored
        expect(cacheData).toEqual(mockImages)

        expect(mockToast.error).toHaveBeenCalledWith(
            expect.stringContaining('Failed to delete first.jpg'),
        )
    })

    it('throws error when itemId is undefined', async () => {
        const wrapper = createWrapper()

        const { result } = renderHook(
            () =>
                useImageDelete({
                    itemType: FILE_TYPE.CATALOGUE,
                    itemId: undefined,
                }),
            { wrapper },
        )

        act(() => {
            result.current.mutate({
                imageId: 'image-1',
                imageName: 'test.jpg',
            })
        })

        await waitFor(() => expect(result.current.isError).toBe(true))

        expect(result.current.error?.message).toContain('itemId is required')
        expect(mockFetchRequest).not.toHaveBeenCalled()
    })

    it('invalidates query after mutation settles', async () => {
        const wrapper = createWrapper()
        // Pre-populate cache with images
        queryClient.setQueryData(['images', FILE_TYPE.CATALOGUE, '123'], mockImages)

        mockFetchRequest.mockResolvedValueOnce(undefined)

        const { result } = renderHook(
            () =>
                useImageDelete({
                    itemType: FILE_TYPE.CATALOGUE,
                    itemId: '123',
                }),
            { wrapper },
        )

        // Spy on invalidateQueries
        const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries')

        act(() => {
            result.current.mutate({
                imageId: 'image-1',
                imageName: 'first.jpg',
            })
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        // Verify invalidation was called
        expect(invalidateSpy).toHaveBeenCalledWith({
            queryKey: ['images', FILE_TYPE.CATALOGUE, '123'],
        })
    })

    it('handles deleting the last image', async () => {
        const wrapper = createWrapper()
        // Set cache with only one image
        queryClient.setQueryData(['images', FILE_TYPE.CATALOGUE, '123'], [mockImages[0]])

        mockFetchRequest.mockResolvedValueOnce(undefined)

        const { result } = renderHook(
            () =>
                useImageDelete({
                    itemType: FILE_TYPE.CATALOGUE,
                    itemId: '123',
                }),
            { wrapper },
        )

        act(() => {
            result.current.mutate({
                imageId: 'image-1',
                imageName: 'first.jpg',
            })
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        // Verify cache is empty
        const cacheData = queryClient.getQueryData<ImageItem[]>([
            'images',
            FILE_TYPE.CATALOGUE,
            '123',
        ])

        expect(cacheData).toHaveLength(0)
    })
})
