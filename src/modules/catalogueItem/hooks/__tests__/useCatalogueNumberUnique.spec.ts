import { useQuery } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import { useCatalogueNumberUnique } from '../useCatalogueNumberUnique'

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryFetcher: jest.fn(() => jest.fn()),
}))

const mockUseQuery = useQuery as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseQuery.mockReturnValue({ data: undefined, isFetching: false })
})

describe('useCatalogueNumberUnique', () => {
    it('builds queryKey with catalogueNumber in query bag', () => {
        renderHook(() =>
            useCatalogueNumberUnique({ catalogueNumber: 'PN-1', enabled: true }),
        )
        const opts = mockUseQuery.mock.calls[0][0]
        expect(opts.queryKey).toEqual([
            'catalogueNumberUniqueCheck',
            { query: { catalogueNumber: 'PN-1' } },
        ])
    })

    it('enables only when both enabled flag and number are present', () => {
        renderHook(() =>
            useCatalogueNumberUnique({ catalogueNumber: 'PN-1', enabled: true }),
        )
        expect(mockUseQuery.mock.calls[0][0].enabled).toBe(true)

        renderHook(() =>
            useCatalogueNumberUnique({ catalogueNumber: '', enabled: true }),
        )
        expect(mockUseQuery.mock.calls[1][0].enabled).toBe(false)

        renderHook(() =>
            useCatalogueNumberUnique({ catalogueNumber: 'PN-1', enabled: false }),
        )
        expect(mockUseQuery.mock.calls[2][0].enabled).toBe(false)
    })

    it('sets staleTime to 0 so checks always revalidate', () => {
        renderHook(() =>
            useCatalogueNumberUnique({ catalogueNumber: 'PN-1', enabled: true }),
        )
        expect(mockUseQuery.mock.calls[0][0].staleTime).toBe(0)
    })

    it('exposes isUnique + catalogueNumber + isChecking aliases', () => {
        mockUseQuery.mockReturnValue({
            data: { isUnique: true, catalogueNumber: 'PN-1' },
            isFetching: true,
        })
        const { result } = renderHook(() =>
            useCatalogueNumberUnique({ catalogueNumber: 'PN-1', enabled: true }),
        )
        expect(result.current.isUnique).toBe(true)
        expect(result.current.catalogueNumber).toBe('PN-1')
        expect(result.current.isChecking).toBe(true)
    })
})
