import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'
import React from 'react'
import { toast } from 'sonner'

import * as fetchClient from '@/core/http/fetchClient'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'

import { useImageUpload } from '../hooks/useImageUpload'
import type { ImageItem, ImageUploadResponse } from '../types'

// Mock dependencies
jest.mock('@/core/http/fetchClient')
jest.mock('sonner')

const mockFetchRequest = fetchClient.fetchRequest as jest.MockedFunction<
    typeof fetchClient.fetchRequest
>
const mockToast = toast as jest.Mocked<typeof toast>

// Mock FileReader
global.FileReader = class FileReader {
    onload: ((this: FileReader, ev: ProgressEvent<FileReader>) => void) | null = null
    onerror: ((this: FileReader, ev: ProgressEvent<FileReader>) => void) | null = null
    result: string | ArrayBuffer | null = null

    readAsDataURL() {
        setTimeout(() => {
            this.result = 'data:image/jpeg;base64,fakebase64data'
            if (this.onload) {
                this.onload.call(this, {} as ProgressEvent<FileReader>)
            }
        }, 0)
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    addEventListener() {}
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    removeEventListener() {}
    dispatchEvent(): boolean {
        return true
    }
} as any

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'blob:mock-url')

describe('useImageUpload', () => {
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

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('uploads image successfully', async () => {
        const mockFile = new File(['fake content'], 'test.jpg', {
            type: 'image/jpeg',
        })

        const mockResponse: ImageUploadResponse = {
            id: 'new-image-id',
            name: 'test.jpg',
            url: '/api/catalogue/123/image/new-image-id',
            type: 'image/jpeg',
        }

        mockFetchRequest.mockResolvedValueOnce(mockResponse)

        const { result } = renderHook(
            () =>
                useImageUpload({
                    itemType: FILE_TYPE.CATALOGUE,
                    itemId: '123',
                }),
            { wrapper: createWrapper() },
        )

        act(() => {
            result.current.mutate({ file: mockFile })
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        // Verify API call
        expect(mockFetchRequest).toHaveBeenCalledWith(
            '/api/catalogue/123/image',
            expect.objectContaining({
                method: 'POST',
                body: expect.objectContaining({
                    name: 'test.jpg',
                    payload: 'data:image/jpeg;base64,fakebase64data',
                }),
            }),
        )

        // Verify success toast
        expect(mockToast.success).toHaveBeenCalledWith('Uploaded test.jpg')
    })

    it('shows optimistic update immediately', async () => {
        const mockFile = new File(['fake content'], 'optimistic.jpg', {
            type: 'image/jpeg',
        })

        // Block the API response on an explicit resolver — using a timeout
        // races with coverage instrumentation overhead and can resolve before
        // the optimistic-update assertion runs.
        let resolveFetch!: (value: ImageUploadResponse) => void
        mockFetchRequest.mockImplementation(
            () =>
                new Promise<ImageUploadResponse>(resolve => {
                    resolveFetch = resolve
                }),
        )

        // Pre-populate cache with existing images
        const existingImages: ImageItem[] = [
            {
                id: 'existing-1',
                name: 'existing.jpg',
                url: '/api/catalogue/123/image/existing-1',
                type: 'image/jpeg',
                ts: Date.now(),
                size: 1024,
            },
        ]

        const wrapper = createWrapper()
        queryClient.setQueryData(['images', FILE_TYPE.CATALOGUE, '123'], existingImages)

        const { result } = renderHook(
            () =>
                useImageUpload({
                    itemType: FILE_TYPE.CATALOGUE,
                    itemId: '123',
                }),
            { wrapper },
        )

        act(() => {
            result.current.mutate({ file: mockFile })
        })

        // Wait for mutation to start
        await waitFor(() => expect(result.current.isPending).toBe(true))

        // Check cache has optimistic update
        const cacheData = queryClient.getQueryData<ImageItem[]>([
            'images',
            FILE_TYPE.CATALOGUE,
            '123',
        ])

        expect(cacheData).toHaveLength(2) // existing + temp
        expect(cacheData?.[0].id).toMatch(/^temp-/) // Temp image first
        expect(cacheData?.[0].name).toBe('optimistic.jpg')
        expect(cacheData?.[1].id).toBe('existing-1') // Existing image still there

        // Now release the fetch and wait for success
        resolveFetch({
            id: 'final-id',
            name: 'optimistic.jpg',
            url: '/api/catalogue/123/image/final-id',
            type: 'image/jpeg',
        })
        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        // After success, temp should be replaced with real image
        const finalData = queryClient.getQueryData<ImageItem[]>([
            'images',
            FILE_TYPE.CATALOGUE,
            '123',
        ])

        expect(finalData).toHaveLength(2)
        expect(finalData?.[0].id).toBe('final-id') // Real image
        expect(finalData?.every(img => !img.id.startsWith('temp-'))).toBe(true)
    })

    it('rolls back on upload error', async () => {
        const mockFile = new File(['fake content'], 'error.jpg', {
            type: 'image/jpeg',
        })

        // Pre-populate cache
        const existingImages: ImageItem[] = [
            {
                id: 'existing-1',
                name: 'existing.jpg',
                url: '/api/catalogue/123/image/existing-1',
                type: 'image/jpeg',
                ts: Date.now(),
                size: 1024,
            },
        ]

        const wrapper = createWrapper()
        queryClient.setQueryData(['images', FILE_TYPE.CATALOGUE, '123'], existingImages)

        // Mock API error
        mockFetchRequest.mockRejectedValueOnce(new Error('Upload failed'))

        const { result } = renderHook(
            () =>
                useImageUpload({
                    itemType: FILE_TYPE.CATALOGUE,
                    itemId: '123',
                }),
            { wrapper },
        )

        act(() => {
            result.current.mutate({ file: mockFile })
        })

        await waitFor(() => expect(result.current.isError).toBe(true))

        // Verify cache was rolled back
        const cacheData = queryClient.getQueryData<ImageItem[]>([
            'images',
            FILE_TYPE.CATALOGUE,
            '123',
        ])

        expect(cacheData).toEqual(existingImages) // Should be restored
        expect(mockToast.error).toHaveBeenCalledWith(
            expect.stringContaining('Failed to upload error.jpg'),
        )
    })

    it('throws error when itemId is undefined', async () => {
        const mockFile = new File(['fake content'], 'test.jpg', {
            type: 'image/jpeg',
        })

        const { result } = renderHook(
            () =>
                useImageUpload({
                    itemType: FILE_TYPE.CATALOGUE,
                    itemId: undefined,
                }),
            { wrapper: createWrapper() },
        )

        act(() => {
            result.current.mutate({ file: mockFile })
        })

        await waitFor(() => expect(result.current.isError).toBe(true))

        expect(result.current.error?.message).toContain('itemId is required')
        expect(mockFetchRequest).not.toHaveBeenCalled()
    })

    it('invalidates query after mutation settles', async () => {
        const mockFile = new File(['fake content'], 'test.jpg', {
            type: 'image/jpeg',
        })

        mockFetchRequest.mockResolvedValueOnce({
            id: 'new-id',
            name: 'test.jpg',
            url: '/api/catalogue/123/image/new-id',
            type: 'image/jpeg',
        })

        const { result } = renderHook(
            () =>
                useImageUpload({
                    itemType: FILE_TYPE.CATALOGUE,
                    itemId: '123',
                }),
            { wrapper: createWrapper() },
        )

        // Spy on invalidateQueries
        const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries')

        act(() => {
            result.current.mutate({ file: mockFile })
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        // Verify invalidation was called
        expect(invalidateSpy).toHaveBeenCalledWith({
            queryKey: ['images', FILE_TYPE.CATALOGUE, '123'],
        })
    })
})
