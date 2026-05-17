import { useMutation, useQueryClient } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'
import { useFormContext, useWatch } from 'react-hook-form'

import { useDeliverAll } from '../useDeliverAll'
import { useDeliveryHandler } from '../useDeliveryHandler'
import useOrderDetail from '../useOrderDetail'

jest.mock('@tanstack/react-query', () => ({
    useMutation: jest.fn(),
    useQueryClient: jest.fn(),
}))

jest.mock('react-hook-form', () => ({
    useFormContext: jest.fn(),
    useWatch: jest.fn(),
}))

jest.mock('../useDeliveryHandler', () => ({
    useDeliveryHandler: jest.fn(),
}))

jest.mock('../useOrderDetail', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryMutate: jest.fn(() => 'mutate-fn'),
}))

jest.mock('sonner', () => ({
    toast: { success: jest.fn(), error: jest.fn() },
}))

import { toast } from 'sonner'

const mockUseMutation = useMutation as jest.Mock
const mockUseQueryClient = useQueryClient as jest.Mock
const mockUseFormContext = useFormContext as jest.Mock
const mockUseWatch = useWatch as jest.Mock
const mockUseDeliveryHandler = useDeliveryHandler as jest.Mock
const mockUseOrderDetail = useOrderDetail as unknown as jest.Mock
const mockToast = toast as unknown as { success: jest.Mock; error: jest.Mock }

beforeEach(() => {
    jest.clearAllMocks()
    mockUseFormContext.mockReturnValue({ control: 'ctl' })
    mockUseWatch.mockReturnValue([])
    mockUseDeliveryHandler.mockReturnValue({ handleSuccessfulDelivery: jest.fn() })
    mockUseOrderDetail.mockReturnValue({ uid: 'order-1', refetch: jest.fn(), queryKey: ['key'] })
    mockUseMutation.mockReturnValue({ mutate: jest.fn(), isPending: false })
    mockUseQueryClient.mockReturnValue({ invalidateQueries: jest.fn() })
})

describe('useDeliverAll', () => {
    it('returns handleDelivery + isPending', () => {
        mockUseMutation.mockReturnValue({ mutate: jest.fn(), isPending: true })
        const { result } = renderHook(() => useDeliverAll(jest.fn()))
        expect(typeof result.current.handleDelivery).toBe('function')
        expect(result.current.isPending).toBe(true)
    })

    it('handleDelivery is no-op when all lines already delivered', () => {
        mockUseWatch.mockReturnValue([
            { uid: 'a', isDelivered: true },
            { uid: 'b', isDelivered: true },
        ])
        const mutate = jest.fn()
        mockUseMutation.mockReturnValue({ mutate, isPending: false })

        const { result } = renderHook(() => useDeliverAll(jest.fn()))
        result.current.handleDelivery()
        expect(mutate).not.toHaveBeenCalled()
    })

    it('handleDelivery sends only undelivered uids', () => {
        mockUseWatch.mockReturnValue([
            { uid: 'a', isDelivered: true },
            { uid: 'b', isDelivered: false },
            { uid: 'c', isDelivered: false },
            { isDelivered: false }, // no uid -> filtered out
        ])
        const mutate = jest.fn()
        mockUseMutation.mockReturnValue({ mutate, isPending: false })

        const { result } = renderHook(() => useDeliverAll(jest.fn()))
        result.current.handleDelivery()
        expect(mutate).toHaveBeenCalledWith(['b', 'c'], expect.any(Object))
    })

    it('onError 409 fires conflict toast', () => {
        renderHook(() => useDeliverAll(jest.fn()))
        const opts = mockUseMutation.mock.calls[0][0]
        opts.onError({ response: { status: 409 }, message: 'x' })
        expect(mockToast.error).toHaveBeenCalledWith(
            'Order was updated by another user. Please refresh the page. And try again.',
        )
    })

    it('onError non-409 forwards message to toast', () => {
        renderHook(() => useDeliverAll(jest.fn()))
        const opts = mockUseMutation.mock.calls[0][0]
        opts.onError({ response: { status: 500 }, message: 'fail' })
        expect(mockToast.error).toHaveBeenCalledWith('fail')
    })
})
