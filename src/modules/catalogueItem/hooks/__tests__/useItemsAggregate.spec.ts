import { useQuery } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import { useItemsAggregate } from '../useItemsAggregate'

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryFetcher: jest.fn(() => jest.fn()),
}))

const mockUseQuery = useQuery as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseQuery.mockReturnValue({ data: undefined, error: undefined, isLoading: false })
})

describe('useItemsAggregate', () => {
    it('uses singular queryKey + endpoint when uid is given', () => {
        renderHook(() => useItemsAggregate('uid-1'))
        const opts = mockUseQuery.mock.calls[0][0]
        expect(opts.queryKey).toEqual(['catalogueItemStatistics', { uid: 'uid-1' }])
    })

    it('uses plural queryKey + endpoint when uid is missing', () => {
        renderHook(() => useItemsAggregate())
        const opts = mockUseQuery.mock.calls[0][0]
        expect(opts.queryKey).toEqual(['catalogueItemsStatistics'])
    })

    it('aliases itemStatistics/loading/error', () => {
        const err = new Error('boom')
        mockUseQuery.mockReturnValue({ data: [{ count: 1 }], error: err, isLoading: true })
        const { result } = renderHook(() => useItemsAggregate('u'))
        expect(result.current.itemStatistics).toEqual([{ count: 1 }])
        expect(result.current.loading).toBe(true)
        expect(result.current.error).toBe(err)
    })
})
