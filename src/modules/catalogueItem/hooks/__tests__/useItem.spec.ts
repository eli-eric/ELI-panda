import { useQuery } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'
import { useRouter } from 'next/router'

import { useCatalogueItem } from '../useItem'

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
}))

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryFetcher: jest.fn(() => jest.fn()),
}))

const mockUseQuery = useQuery as jest.Mock
const mockUseRouter = useRouter as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseRouter.mockReturnValue({ query: { uid: 'cat-1' } })
    mockUseQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: undefined,
        refetch: jest.fn(),
    })
})

describe('useCatalogueItem', () => {
    it('builds queryKey from router uid', () => {
        renderHook(() => useCatalogueItem())
        expect(mockUseQuery.mock.calls[0][0].queryKey).toEqual([
            'catalogueItem',
            { uid: 'cat-1' },
        ])
    })

    it('disables query when uid is missing', () => {
        mockUseRouter.mockReturnValue({ query: {} })
        renderHook(() => useCatalogueItem())
        expect(mockUseQuery.mock.calls[0][0].enabled).toBe(false)
    })

    it('returns groups as deduplicated, sorted propertyGroup list', () => {
        mockUseQuery.mockReturnValue({
            data: {
                details: [
                    { propertyGroup: 'b' },
                    { propertyGroup: 'a' },
                    { propertyGroup: 'b' },
                    { propertyGroup: 'c' },
                ],
            },
            isLoading: false,
            error: undefined,
            refetch: jest.fn(),
        })
        const { result } = renderHook(() => useCatalogueItem())
        expect(result.current.groups).toEqual(['a', 'b', 'c'])
    })

    it('returns undefined groups when item has no details', () => {
        mockUseQuery.mockReturnValue({
            data: { details: undefined },
            isLoading: false,
            error: undefined,
            refetch: jest.fn(),
        })
        const { result } = renderHook(() => useCatalogueItem())
        expect(result.current.groups).toBeUndefined()
    })

    it('aliases loading from isLoading', () => {
        mockUseQuery.mockReturnValue({
            data: undefined,
            isLoading: true,
            error: undefined,
            refetch: jest.fn(),
        })
        const { result } = renderHook(() => useCatalogueItem())
        expect(result.current.loading).toBe(true)
    })
})
