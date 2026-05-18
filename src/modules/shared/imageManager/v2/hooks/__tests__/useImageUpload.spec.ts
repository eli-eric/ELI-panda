import { renderHook, waitFor } from '@testing-library/react'

import { fetchRequest } from '@/core/http/fetchClient'
import { QueryClientWrapper } from '@/testutils/wrappers/QueryClientWrapper'

import { useImageUpload } from '../useImageUpload'

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
    // FileReader polyfill: readAsDataURL must invoke onload synchronously with a base64 stub
    ;(global as any).FileReader = class {
        result: string | null = null
        onload: (() => void) | null = null
        onerror: (() => void) | null = null
        readAsDataURL() {
            this.result = 'data:base64,xxx'
            this.onload?.()
        }
    }
    ;(global as any).URL = global.URL || {}
    ;(global.URL as any).createObjectURL = jest.fn(() => 'blob:fake')
})

describe('useImageUpload', () => {
    it('rejects when itemId missing', async () => {
        const { result } = renderHook(
            () => useImageUpload({ itemType: 'catalogue' as any, itemId: '' }),
            { wrapper: QueryClientWrapper },
        )
        result.current.mutate({ file: new File(['x'], 'a.png', { type: 'image/png' }) })
        await waitFor(() => expect(result.current.isError).toBe(true))
        expect(sonner.toast.error).toHaveBeenCalled()
    })

    it('POSTs base64 payload to /api/{type}/{id}/image and shows success toast', async () => {
        mockFetchRequest.mockResolvedValue({ id: 'i', name: 'a.png', url: '/u', type: 'image/png' })
        const { result } = renderHook(
            () => useImageUpload({ itemType: 'catalogue' as any, itemId: 'sys-1' }),
            { wrapper: QueryClientWrapper },
        )
        result.current.mutate({ file: new File(['x'], 'a.png', { type: 'image/png' }) })
        await waitFor(() => expect(result.current.isSuccess).toBe(true))
        expect(mockFetchRequest).toHaveBeenCalledWith(
            '/api/catalogue/sys-1/image',
            expect.objectContaining({
                method: 'POST',
                body: expect.objectContaining({
                    name: 'a.png',
                    payload: expect.stringContaining('base64'),
                }),
            }),
        )
    })

    it('error toast on upload failure', async () => {
        mockFetchRequest.mockRejectedValue(new Error('boom'))
        const { result } = renderHook(
            () => useImageUpload({ itemType: 'catalogue' as any, itemId: 'sys-1' }),
            { wrapper: QueryClientWrapper },
        )
        result.current.mutate({ file: new File(['x'], 'a.png', { type: 'image/png' }) })
        await waitFor(() => expect(result.current.isError).toBe(true))
        expect(sonner.toast.error).toHaveBeenCalled()
    })
})
