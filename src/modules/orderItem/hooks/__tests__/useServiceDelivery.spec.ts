import { useMutation } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'
import { useRouter } from 'next/router'

import { useServiceLineDeliver } from '../useServiceDelivery'
import { useServiceLine } from '../useServiceLine'

jest.mock('@tanstack/react-query', () => ({
    useMutation: jest.fn(),
}))

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}))

jest.mock('../useServiceLine', () => ({
    useServiceLine: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryMutate: jest.fn(() => 'mutate-fn'),
}))

jest.mock('sonner', () => ({
    toast: { success: jest.fn(), error: jest.fn() },
}))

import { toast } from 'sonner'

const mockUseMutation = useMutation as jest.Mock
const mockUseRouter = useRouter as jest.Mock
const mockUseServiceLine = useServiceLine as jest.Mock
const mockToast = toast as unknown as { success: jest.Mock; error: jest.Mock }

beforeEach(() => {
    jest.clearAllMocks()
    mockUseRouter.mockReturnValue({ query: { uid: 'order-1' } })
    mockUseServiceLine.mockReturnValue({ setServiceLine: jest.fn() })
    mockUseMutation.mockReturnValue({ mutate: jest.fn() })
})

const baseLine = { uid: 'sl-1' } as any

describe('useServiceLineDeliver', () => {
    it('onSuccess sets isDelivered + success toast', () => {
        const setServiceLine = jest.fn()
        mockUseServiceLine.mockReturnValue({ setServiceLine })
        renderHook(() => useServiceLineDeliver(baseLine))
        const opts = mockUseMutation.mock.calls[0][0]
        opts.onSuccess({ data: { isDelivered: true } })
        expect(setServiceLine).toHaveBeenCalledWith({ ...baseLine, isDelivered: true })
        expect(mockToast.success).toHaveBeenCalledWith('Service delivered successfully')
    })

    it('onError 409 fires conflict toast', () => {
        renderHook(() => useServiceLineDeliver(baseLine))
        const opts = mockUseMutation.mock.calls[0][0]
        opts.onError({ response: { status: 409 }, message: 'x' })
        expect(mockToast.error).toHaveBeenCalledWith(
            'Order was updated by another user. Please refresh the page. And try again.',
        )
    })

    it('onError non-409 fires error.message toast', () => {
        renderHook(() => useServiceLineDeliver(baseLine))
        const opts = mockUseMutation.mock.calls[0][0]
        opts.onError({ response: { status: 500 }, message: 'fail' })
        expect(mockToast.error).toHaveBeenCalledWith('fail')
    })
})
