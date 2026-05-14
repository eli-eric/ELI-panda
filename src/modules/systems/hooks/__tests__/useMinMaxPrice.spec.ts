import { useQuery } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import { useMinMaxPrice } from '../useMinMaxPrice'

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryFetcher: jest.fn(() => jest.fn()),
}))

const mockUseQuery = useQuery as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useMinMaxPrice', () => {
    it('queries the ordersMinMaxPrice endpoint', () => {
        mockUseQuery.mockReturnValue({ data: undefined })
        renderHook(() => useMinMaxPrice())
        expect(mockUseQuery.mock.calls[0][0].queryKey).toEqual(['ordersMinMaxPrice'])
    })

    it('returns minMaxPrice aliased from query data', () => {
        mockUseQuery.mockReturnValue({ data: { min: 0, max: 1000 } })
        const { result } = renderHook(() => useMinMaxPrice())
        expect(result.current.minMaxPrice).toEqual({ min: 0, max: 1000 })
    })

    it('returns undefined when no data', () => {
        mockUseQuery.mockReturnValue({ data: undefined })
        const { result } = renderHook(() => useMinMaxPrice())
        expect(result.current.minMaxPrice).toBeUndefined()
    })
})
