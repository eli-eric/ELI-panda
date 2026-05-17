import { useQuery } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import useQueryManager from '@/hooks/useQueryManager'

import { useOrders } from '../useOrders'

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
    keepPreviousData: 'keepPreviousData',
}))

jest.mock('@/hooks/useQueryManager', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryFetcher: jest.fn(() => 'fn'),
}))

const mockUseQuery = useQuery as jest.Mock
const mockUseQueryManager = useQueryManager as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseQueryManager.mockReturnValue({ query: { page: 1 } })
    mockUseQuery.mockReturnValue({
        data: undefined,
        isFetching: false,
        error: undefined,
        refetch: jest.fn(),
    })
})

describe('useOrders', () => {
    it('uses tableId "orders" with enableQueryURL=true', () => {
        renderHook(() => useOrders())
        expect(mockUseQueryManager).toHaveBeenCalledWith('orders', undefined, true)
    })

    it('queryKey includes manager.query under "orders"', () => {
        mockUseQueryManager.mockReturnValue({ query: { page: 2 } })
        renderHook(() => useOrders())
        expect(mockUseQuery.mock.calls[0][0].queryKey).toEqual([
            'orders',
            { query: { page: 2 } },
        ])
    })

    it('aliases orderList/loading/error/mutate', () => {
        const refetch = jest.fn()
        const err = new Error('x')
        mockUseQuery.mockReturnValue({
            data: { items: [] },
            isFetching: true,
            error: err,
            refetch,
        })
        const { result } = renderHook(() => useOrders())
        expect(result.current.orderList).toEqual({ items: [] })
        expect(result.current.loading).toBe(true)
        expect(result.current.error).toBe(err)
        expect(result.current.mutate).toBe(refetch)
    })
})
