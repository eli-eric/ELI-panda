import { useMutation } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import { useRecalculate } from '../useRecalculate'
import { useSystemsReload } from '../useSystemsReload'

jest.mock('@tanstack/react-query', () => ({
    useMutation: jest.fn(),
}))

jest.mock('../useSystemsReload', () => ({
    useSystemsReload: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryMutate: jest.fn(() => 'mutate-fn'),
}))

jest.mock('sonner', () => ({
    toast: { error: jest.fn() },
}))

import { toast } from 'sonner'

const mockUseMutation = useMutation as jest.Mock
const mockUseSystemsReload = useSystemsReload as jest.Mock
const mockToast = toast as unknown as { error: jest.Mock }

beforeEach(() => {
    jest.clearAllMocks()
    mockUseSystemsReload.mockReturnValue([jest.fn()])
    mockUseMutation.mockReturnValue({ mutate: jest.fn(), isPending: false })
})

describe('useRecalculate', () => {
    it('returns tuple [mutate, isPending]', () => {
        const mutate = jest.fn()
        mockUseMutation.mockReturnValue({ mutate, isPending: true })
        const { result } = renderHook(() => useRecalculate({}))
        expect(result.current).toEqual([mutate, true])
    })

    it('threads tableId + enableQueryURL into useSystemsReload', () => {
        renderHook(() =>
            useRecalculate({ tableId: 'orders', enableQueryURL: false }),
        )
        expect(mockUseSystemsReload).toHaveBeenCalledWith({
            tableId: 'orders',
            onSuccess: undefined,
            enableQueryURL: false,
        })
    })

    it('defaults tableId="systems" + enableQueryURL=true', () => {
        renderHook(() => useRecalculate({}))
        expect(mockUseSystemsReload).toHaveBeenCalledWith({
            tableId: 'systems',
            onSuccess: undefined,
            enableQueryURL: true,
        })
    })

    it('onSuccess invokes reload', () => {
        const reload = jest.fn()
        mockUseSystemsReload.mockReturnValue([reload])
        renderHook(() => useRecalculate({}))
        const opts = mockUseMutation.mock.calls[0][0]
        opts.onSuccess()
        expect(reload).toHaveBeenCalled()
    })

    it('onError fires toast.error with message', () => {
        renderHook(() => useRecalculate({}))
        const opts = mockUseMutation.mock.calls[0][0]
        opts.onError({ message: 'boom' })
        expect(mockToast.error).toHaveBeenCalledWith('Something went wrong: boom')
    })
})
