import { useQuery } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'
import { useRouter } from 'next/router'

import useGroupDetails from '../useGroupDetails'

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
    mockUseQuery.mockReturnValue({ data: undefined })
})

describe('useGroupDetails', () => {
    it('queryKey includes itemUid (from router) when present', () => {
        mockUseRouter.mockReturnValue({ query: { uid: 'item-1' } })
        renderHook(() => useGroupDetails('cat-1'))
        const opts = mockUseQuery.mock.calls[0][0]
        expect(opts.queryKey).toEqual([
            'catalogueCategoryProperties',
            { uid: 'cat-1', query: { itemUid: 'item-1' } },
        ])
    })

    it('queryKey omits itemUid query when router uid is missing', () => {
        mockUseRouter.mockReturnValue({ query: {} })
        renderHook(() => useGroupDetails('cat-1'))
        const opts = mockUseQuery.mock.calls[0][0]
        expect(opts.queryKey).toEqual(['catalogueCategoryProperties', { uid: 'cat-1' }])
    })

    it('returns sorted unique propertyGroup list', () => {
        mockUseRouter.mockReturnValue({ query: { uid: 'i' } })
        mockUseQuery.mockReturnValue({
            data: [
                { propertyGroup: 'main' },
                { propertyGroup: 'physical' },
                { propertyGroup: 'main' },
                { propertyGroup: 'electrical' },
            ],
        })
        const { result } = renderHook(() => useGroupDetails('cat-1'))
        expect(result.current.groups).toEqual(['electrical', 'main', 'physical'])
    })

    it('returns undefined groups when data is undefined', () => {
        mockUseRouter.mockReturnValue({ query: {} })
        mockUseQuery.mockReturnValue({ data: undefined })
        const { result } = renderHook(() => useGroupDetails('c'))
        expect(result.current.groups).toBeUndefined()
        expect(result.current.groupDetails).toBeUndefined()
    })
})
