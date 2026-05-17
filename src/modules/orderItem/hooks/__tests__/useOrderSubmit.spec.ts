import { useMutation, useQueryClient } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'
import { useRouter } from 'next/router'

import useOrderDetail from '../useOrderDetail'
import { useOrderSubmit } from '../useOrderSubmit'

jest.mock('@tanstack/react-query', () => ({
    useMutation: jest.fn(),
    useQueryClient: jest.fn(),
}))

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}))

jest.mock('../useOrderDetail', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryMutate: jest.fn(() => 'mutate-fn'),
}))

jest.mock('../../utils/order-transforms', () => ({
    addUuidsToOrderData: jest.fn(data => ({ ...data, _withUuids: true })),
}))

jest.mock('sonner', () => ({
    toast: { success: jest.fn(), error: jest.fn() },
}))

import { toast } from 'sonner'

const mockUseMutation = useMutation as jest.Mock
const mockUseQueryClient = useQueryClient as jest.Mock
const mockUseRouter = useRouter as jest.Mock
const mockUseOrderDetail = useOrderDetail as unknown as jest.Mock
const mockToast = toast as unknown as { success: jest.Mock; error: jest.Mock }

beforeEach(() => {
    jest.clearAllMocks()
    mockUseRouter.mockReturnValue({ push: jest.fn() })
    mockUseOrderDetail.mockReturnValue({ uid: 'order-1', queryKey: ['orderKey'] })
    mockUseMutation.mockReturnValue({ mutate: jest.fn(), isPending: false })
    mockUseQueryClient.mockReturnValue({
        setQueryData: jest.fn(),
        invalidateQueries: jest.fn().mockResolvedValue(undefined),
    })
})

describe('useOrderSubmit', () => {
    it('returns submit + loading', () => {
        mockUseMutation.mockReturnValue({ mutate: jest.fn(), isPending: true })
        const { result } = renderHook(() => useOrderSubmit(jest.fn()))
        expect(typeof result.current.submit).toBe('function')
        expect(result.current.loading).toBe(true)
    })

    it('submit transforms price to Number for both line types', () => {
        const mutate = jest.fn()
        mockUseMutation.mockReturnValue({ mutate, isPending: false })
        const { result } = renderHook(() => useOrderSubmit(jest.fn()))

        result.current.submit(
            {
                name: 'O',
                serviceLines: [{ uid: 's', price: '100' } as any],
                orderLines: [
                    { uid: 'l1', price: '50' } as any,
                    { uid: 'l2', price: null } as any,
                ],
            } as any,
            false,
        )

        const sent = mutate.mock.calls[0][0]
        expect(sent.serviceLines[0].price).toBe(100)
        expect(sent.orderLines[0].price).toBe(50)
        expect(sent.orderLines[1].price).toBeUndefined()
    })

    it('onSuccess flow: resets form with uuid data, updates cache, invalidates, navigates back to /orders when saveAndExit', async () => {
        const setQueryData = jest.fn()
        const invalidateQueries = jest.fn().mockResolvedValue(undefined)
        mockUseQueryClient.mockReturnValue({ setQueryData, invalidateQueries })
        const push = jest.fn()
        mockUseRouter.mockReturnValue({ push })
        const mutate = jest.fn()
        mockUseMutation.mockReturnValue({ mutate, isPending: false })
        const formReset = jest.fn()

        const { result } = renderHook(() => useOrderSubmit(formReset))
        result.current.submit({} as any, true)

        const onSuccess = mutate.mock.calls[0][1].onSuccess
        await onSuccess({ data: { uid: 'order-1', name: 'Order' } })

        expect(formReset).toHaveBeenCalledWith(
            expect.objectContaining({ _withUuids: true }),
        )
        expect(setQueryData).toHaveBeenCalledWith(['orderKey'], { uid: 'order-1', name: 'Order' })
        expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['orderKey'] })
        expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['orders'] })
        expect(push).toHaveBeenCalledWith('/orders')
    })

    it('onSuccess routes to new order detail when no current uid (create flow)', async () => {
        mockUseOrderDetail.mockReturnValue({ uid: undefined, queryKey: ['ok'] })
        const push = jest.fn()
        mockUseRouter.mockReturnValue({ push })
        const mutate = jest.fn()
        mockUseMutation.mockReturnValue({ mutate, isPending: false })

        const { result } = renderHook(() => useOrderSubmit(jest.fn()))
        result.current.submit({} as any, false)
        const onSuccess = mutate.mock.calls[0][1].onSuccess
        await onSuccess({ data: { uid: 'new-uid' } })

        expect(push).toHaveBeenCalledWith('/order/new-uid')
        expect(mockToast.success).toHaveBeenCalledWith('Order was successfully saved.')
    })

    it('onError 409 fires conflict toast', () => {
        renderHook(() => useOrderSubmit(jest.fn()))
        const opts = mockUseMutation.mock.calls[0][0]
        opts.onError({ response: { status: 409 }, message: 'x' })
        expect(mockToast.error).toHaveBeenCalledWith(
            'Order was updated by another user. Please refresh the page. And try again.',
        )
    })

    it('onError non-409 fires error.message toast', () => {
        renderHook(() => useOrderSubmit(jest.fn()))
        const opts = mockUseMutation.mock.calls[0][0]
        opts.onError({ response: { status: 500 }, message: 'boom' })
        expect(mockToast.error).toHaveBeenCalledWith('boom')
    })
})
