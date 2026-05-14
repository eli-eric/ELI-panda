import { renderHook, waitFor } from '@testing-library/react'

import { fetchRequest } from '@/core/http/fetchClient'
import { QueryClientWrapper } from '@/testutils/wrappers/QueryClientWrapper'

import { useImageDelete } from '../useImageDelete'

jest.mock('@/core/http/fetchClient', () => ({
    fetchRequest: jest.fn(),
}))

jest.mock('sonner', () => ({
    toast: { success: jest.fn(), error: jest.fn() },
}))

const mockFetchRequest = fetchRequest as jest.Mock
const sonner = jest.requireMock('sonner')

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useImageDelete', () => {
    it('throws when itemId missing on mutate', async () => {
        mockFetchRequest.mockResolvedValue(undefined)
        const { result } = renderHook(
            () => useImageDelete({ itemType: 'catalogue' as any, itemId: '' }),
            { wrapper: QueryClientWrapper },
        )
        result.current.mutate({ imageId: 'i-1', imageName: 'a.png' })
        await waitFor(() => expect(result.current.isError).toBe(true))
        expect(sonner.toast.error).toHaveBeenCalled()
    })

    it('issues DELETE to /api/{type}/{id}/image/{imageId} and shows success toast', async () => {
        mockFetchRequest.mockResolvedValue(undefined)
        const { result } = renderHook(
            () => useImageDelete({ itemType: 'catalogue' as any, itemId: 'sys-1' }),
            { wrapper: QueryClientWrapper },
        )
        result.current.mutate({ imageId: 'img-9', imageName: 'photo.png' })
        await waitFor(() => expect(result.current.isSuccess).toBe(true))
        expect(mockFetchRequest).toHaveBeenCalledWith('/api/catalogue/sys-1/image/img-9', {
            method: 'DELETE',
        })
        expect(sonner.toast.success).toHaveBeenCalledWith('Deleted photo.png')
    })

    it('error toast on failure', async () => {
        mockFetchRequest.mockRejectedValue(new Error('boom'))
        const { result } = renderHook(
            () => useImageDelete({ itemType: 'catalogue' as any, itemId: 'sys-1' }),
            { wrapper: QueryClientWrapper },
        )
        result.current.mutate({ imageId: 'i', imageName: 'p.png' })
        await waitFor(() => expect(result.current.isError).toBe(true))
        expect(sonner.toast.error).toHaveBeenCalledWith('Failed to delete p.png: boom')
    })
})
