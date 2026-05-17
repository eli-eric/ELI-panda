import { useMutation } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'
import { useRouter } from 'next/router'

import { useDeliver } from '../useDeliver'
import { useOrderLine } from '../useOrderLine'

jest.mock('@tanstack/react-query', () => ({
    useMutation: jest.fn(),
}))

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}))

jest.mock('../useOrderLine', () => ({
    useOrderLine: jest.fn(),
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
const mockUseOrderLine = useOrderLine as jest.Mock
const mockToast = toast as unknown as { success: jest.Mock; error: jest.Mock }

beforeEach(() => {
    jest.clearAllMocks()
    mockUseRouter.mockReturnValue({ query: { uid: 'order-1' } })
    mockUseOrderLine.mockReturnValue({ setOrderLine: jest.fn() })
    mockUseMutation.mockReturnValue({ mutate: jest.fn() })
})

const baseLine = { uid: 'line-1', id: 'id-1' } as any

describe('useDeliver', () => {
    it('configures mutation key + endpoint via queryMutate', () => {
        renderHook(() => useDeliver(baseLine))
        expect(mockUseMutation).toHaveBeenCalled()
    })

    it('onSuccess updates orderLine with delivery fields + success toast', () => {
        const setOrderLine = jest.fn()
        mockUseOrderLine.mockReturnValue({ setOrderLine })
        renderHook(() => useDeliver(baseLine))
        const opts = mockUseMutation.mock.calls[0][0]
        opts.onSuccess({
            data: { isDelivered: true, serialNumber: 'SN1', eun: 'EUN1' },
        })
        expect(setOrderLine).toHaveBeenCalledWith({
            ...baseLine,
            id: baseLine.id,
            isDelivered: true,
            serialNumber: 'SN1',
            eun: 'EUN1',
        })
        expect(mockToast.success).toHaveBeenCalledWith('Order delivered successfully')
    })

    it('onError 409 fires conflict-specific toast', () => {
        renderHook(() => useDeliver(baseLine))
        const opts = mockUseMutation.mock.calls[0][0]
        opts.onError({ response: { status: 409 }, message: 'conflict' })
        expect(mockToast.error).toHaveBeenCalledWith(
            'Order was updated by another user. Please refresh the page. And try again.',
        )
    })

    it('onError non-409 fires error.message toast', () => {
        renderHook(() => useDeliver(baseLine))
        const opts = mockUseMutation.mock.calls[0][0]
        opts.onError({ response: { status: 500 }, message: 'boom' })
        expect(mockToast.error).toHaveBeenCalledWith('boom')
    })
})
