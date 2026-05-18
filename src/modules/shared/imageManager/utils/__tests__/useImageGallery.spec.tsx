import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'

import axiosInstance from '@/core/axios/axiosInstance'

import type { FileItem } from '../../../fileManager/types'
import { useImageGallery } from '../useImageGallery'

jest.mock('@/core/axios/axiosInstance', () => ({
    __esModule: true,
    default: {
        post: jest.fn(),
        delete: jest.fn(),
        get: jest.fn(),
        put: jest.fn(),
    },
}))

jest.mock('sonner', () => ({
    toast: { error: jest.fn(), success: jest.fn(), promise: jest.fn() },
}))

const mockedAxios = axiosInstance as unknown as {
    post: jest.Mock
    delete: jest.Mock
}
import { toast } from 'sonner'
const mockedToast = toast as unknown as { error: jest.Mock }

const endpoint = '/api/items/uid-1/images'
const ARGS = { itemCategory: 'items', itemId: 'uid-1', fileCategory: 'images' }

const buildWrapper = (qc: QueryClient) => {
    const Wrapper = ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={qc}>{children}</QueryClientProvider>
    )
    return Wrapper
}

describe('useImageGallery', () => {
    let qc: QueryClient

    beforeEach(() => {
        jest.clearAllMocks()
        qc = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    })

    it('handleDelete removes persisted item from cache and queues it for delete', async () => {
        const persisted: FileItem = { id: 'real-1', name: 'a.png', url: '', size: 1 }
        qc.setQueryData<FileItem[]>(['fileItem', endpoint], [persisted])

        const { result } = renderHook(() => useImageGallery(ARGS), { wrapper: buildWrapper(qc) })
        act(() => result.current.handleDelete(persisted))

        expect(qc.getQueryData<FileItem[]>(['fileItem', endpoint])).toEqual([])

        mockedAxios.delete.mockResolvedValueOnce({ data: null })
        mockedAxios.post.mockResolvedValueOnce({ data: null })
        const onSuccess = jest.fn()
        act(() => result.current.submit('uid-1', onSuccess))

        await waitFor(() => expect(onSuccess).toHaveBeenCalled())
        expect(mockedAxios.delete).toHaveBeenCalledWith(`${endpoint}/real-1`)
        const status = onSuccess.mock.calls[0][0]
        expect(status.successfulDeletions).toEqual(['a.png'])
    })

    it('handleDelete on a temp item drops it from upload queue without scheduling delete', async () => {
        const { result } = renderHook(() => useImageGallery(ARGS), { wrapper: buildWrapper(qc) })

        const file = new File(['hi'], 'temp.png', { type: 'image/png' })
        await act(async () => {
            result.current.onDrop([file])
            await new Promise(r => setTimeout(r, 0))
        })

        const cached = qc.getQueryData<FileItem[]>(['fileItem', endpoint])!
        expect(cached.length).toBe(1)
        expect(cached[0].id.startsWith('temp-')).toBe(true)

        act(() => result.current.handleDelete(cached[0]))
        expect(qc.getQueryData<FileItem[]>(['fileItem', endpoint])).toEqual([])

        mockedAxios.delete.mockResolvedValue({ data: null })
        mockedAxios.post.mockResolvedValue({ data: null })
        const onSuccess = jest.fn()
        act(() => result.current.submit('uid-1', onSuccess))
        await waitFor(() => expect(onSuccess).toHaveBeenCalled())

        expect(mockedAxios.delete).not.toHaveBeenCalled()
        expect(mockedAxios.post).not.toHaveBeenCalled()
    })

    it('onDrop reads files and prepends temp entries to the cache', async () => {
        const { result } = renderHook(() => useImageGallery(ARGS), { wrapper: buildWrapper(qc) })

        qc.setQueryData<FileItem[]>(['fileItem', endpoint], [
            { id: 'existing', name: 'existing.png', url: '', size: 1 },
        ])

        const file = new File(['hello'], 'new.png', { type: 'image/png' })
        await act(async () => {
            result.current.onDrop([file])
            await new Promise(r => setTimeout(r, 0))
        })

        const cached = qc.getQueryData<FileItem[]>(['fileItem', endpoint])!
        expect(cached.map(c => c.name)).toEqual(['new.png', 'existing.png'])
        expect(cached[0].id.startsWith('temp-')).toBe(true)
    })

    it('submit reports failures and shows toast.error when a delete fails', async () => {
        const persisted: FileItem = { id: 'real-1', name: 'a.png', url: '', size: 1 }
        qc.setQueryData<FileItem[]>(['fileItem', endpoint], [persisted])

        const { result } = renderHook(() => useImageGallery(ARGS), { wrapper: buildWrapper(qc) })
        act(() => result.current.handleDelete(persisted))

        mockedAxios.delete.mockRejectedValueOnce(new Error('nope'))
        mockedAxios.post.mockResolvedValue({ data: null })
        const onSuccess = jest.fn()
        act(() => result.current.submit('uid-1', onSuccess))

        await waitFor(() => expect(onSuccess).toHaveBeenCalled())
        const status = onSuccess.mock.calls[0][0]
        expect(status.failedDeletions).toEqual(['a.png'])
        expect(mockedToast.error).toHaveBeenCalledWith('Some files failed to upload or delete')
    })

    it('submit posts to a freshly computed endpoint when itemId differs from initial args', async () => {
        const { result } = renderHook(() => useImageGallery(ARGS), { wrapper: buildWrapper(qc) })

        const file = new File(['x'], 'x.png', { type: 'image/png' })
        await act(async () => {
            result.current.onDrop([file])
            await new Promise(r => setTimeout(r, 0))
        })

        mockedAxios.post.mockResolvedValue({ data: null })
        mockedAxios.delete.mockResolvedValue({ data: null })
        act(() => result.current.submit('new-uid', jest.fn()))

        await waitFor(() => expect(mockedAxios.post).toHaveBeenCalled())
        const url = mockedAxios.post.mock.calls[0][0]
        expect(url).toBe('/api/items/new-uid/images')
    })
})
