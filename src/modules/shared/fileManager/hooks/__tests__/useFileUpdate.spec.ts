import { act, renderHook, waitFor } from '@testing-library/react'
import { toast } from 'sonner'

import { AllProvidersWrapper } from '@/testutils/wrappers/AllProvidersWrapper'

import { FILE_TYPE } from '../../types'
import { useFileUpdate } from '../useFileUpdate'

jest.mock('sonner', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}))

const mockToast = toast as jest.Mocked<typeof toast>

const originalFetch = global.fetch
const mockFetch = jest.fn()

beforeAll(() => {
    global.fetch = mockFetch as unknown as typeof fetch
})

afterAll(() => {
    global.fetch = originalFetch
})

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useFileUpdate', () => {
    it('returns a mutate function', () => {
        const { result } = renderHook(
            () => useFileUpdate({ itemType: FILE_TYPE.SYSTEM, uid: 'u1' }),
            { wrapper: AllProvidersWrapper },
        )
        expect(typeof result.current.mutate).toBe('function')
    })

    it('calls fetch with PUT, correct URL, and JSON body', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: () =>
                Promise.resolve({
                    id: 'file-1',
                    name: 'new.txt',
                    url: 'u',
                    size: 0,
                    tags: ['t'],
                }),
        })

        const { result } = renderHook(
            () => useFileUpdate({ itemType: FILE_TYPE.SYSTEM, uid: 'u-9' }),
            { wrapper: AllProvidersWrapper },
        )

        await act(async () => {
            result.current.mutate({ id: 'file-1', body: { name: 'new.txt' } })
        })

        await waitFor(() => expect(mockFetch).toHaveBeenCalled())

        const [url, init] = mockFetch.mock.calls[0]
        expect(url).toBe('/api/system/u-9/files/file-1')
        expect((init as RequestInit).method).toBe('PUT')
        expect(JSON.parse((init as RequestInit).body as string)).toEqual({
            name: 'new.txt',
        })
    })

    it('calls toast.success with intl-formatted message after a successful update', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: () =>
                Promise.resolve({
                    id: 'file-1',
                    name: 'renamed.txt',
                    url: 'u',
                    size: 0,
                    tags: [],
                }),
        })

        const { result } = renderHook(
            () => useFileUpdate({ itemType: FILE_TYPE.SYSTEM, uid: 'u1' }),
            { wrapper: AllProvidersWrapper },
        )

        await act(async () => {
            result.current.mutate({ id: 'file-1', body: { name: 'renamed.txt' } })
        })

        await waitFor(() => expect(mockToast.success).toHaveBeenCalled())
        const successMsg = mockToast.success.mock.calls[0][0] as string
        expect(successMsg).toContain('renamed.txt')
        expect(successMsg).toContain('updated')
    })

    it('calls toast.error with intl-formatted server error', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
            statusText: 'Server Error',
            json: () => Promise.resolve({ error: 'rename forbidden' }),
        })

        const { result } = renderHook(
            () => useFileUpdate({ itemType: FILE_TYPE.SYSTEM, uid: 'u1' }),
            { wrapper: AllProvidersWrapper },
        )

        await act(async () => {
            result.current.mutate({ id: 'file-1', body: { name: 'x' } })
        })

        await waitFor(() => expect(mockToast.error).toHaveBeenCalled())
        const errorMsg = mockToast.error.mock.calls[0][0] as string
        expect(errorMsg).toContain('rename forbidden')
    })
})
