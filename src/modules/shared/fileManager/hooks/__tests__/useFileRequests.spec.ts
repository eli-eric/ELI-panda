import { act, renderHook } from '@testing-library/react'

import executeRequest from '@/utils/executeRequest'
import { QueryClientWrapper } from '@/testutils/wrappers/QueryClientWrapper'

import { useFileRequests } from '../useFileRequests'

jest.mock('@/utils/executeRequest', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('sonner', () => ({
    toast: { success: jest.fn(), error: jest.fn() },
}))

const mockExecuteRequest = executeRequest as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useFileRequests', () => {
    it('returns onDrop, handlePost, handlePut, loading, resetDropzone', () => {
        const { result } = renderHook(
            () => useFileRequests({ itemType: 'system', uid: 'u1' }),
            { wrapper: QueryClientWrapper },
        )
        expect(typeof result.current.onDrop).toBe('function')
        expect(typeof result.current.handlePost).toBe('function')
        expect(typeof result.current.handlePut).toBe('function')
        expect(Array.isArray(result.current.loading)).toBe(true)
        expect(typeof result.current.resetDropzone).toBe('function')
    })

    it('handlePut calls executeRequest with PUT + endpoint + body', () => {
        const { result } = renderHook(
            () => useFileRequests({ itemType: 'system', uid: 'u1' }),
            { wrapper: QueryClientWrapper },
        )
        act(() => {
            result.current.handlePut('file-1', { name: 'new.txt' })
        })
        expect(mockExecuteRequest).toHaveBeenCalledWith(
            '/api/system/u1/files/file-1',
            { method: 'PUT', body: JSON.stringify({ name: 'new.txt' }) },
            expect.any(Function),
            expect.any(Function),
        )
    })

    it('resetDropzone empties loading + new file lists', () => {
        const { result } = renderHook(
            () => useFileRequests({ itemType: 'system', uid: 'u1' }),
            { wrapper: QueryClientWrapper },
        )
        act(() => {
            result.current.resetDropzone()
        })
        expect(result.current.loading).toEqual([])
    })
})
