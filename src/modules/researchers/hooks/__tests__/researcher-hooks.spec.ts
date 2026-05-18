import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import { useResearcher } from '../useResearcher'
import { useResearcherDelete } from '../useResearcherDelete'

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
    useMutation: jest.fn(),
    useQueryClient: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryFetcher: jest.fn(() => 'fn'),
    queryMutate: jest.fn(() => 'mutate-fn'),
}))

const mockUseQuery = useQuery as jest.Mock
const mockUseMutation = useMutation as jest.Mock
const mockUseQueryClient = useQueryClient as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseQuery.mockReturnValue({ data: undefined })
    mockUseMutation.mockReturnValue({ mutate: jest.fn() })
    mockUseQueryClient.mockReturnValue({ invalidateQueries: jest.fn() })
})

describe('useResearcher', () => {
    it('configures query with uid + staleTime 0 + enabled gating', () => {
        renderHook(() => useResearcher('r-1'))
        const opts = mockUseQuery.mock.calls[0][0]
        expect(opts.queryKey).toEqual(['researcher', { uid: 'r-1' }])
        expect(opts.staleTime).toBe(0)
        expect(opts.enabled).toBe(true)

        renderHook(() => useResearcher())
        expect(mockUseQuery.mock.calls[1][0].enabled).toBe(false)
    })
})

describe('useResearcherDelete', () => {
    it('returns mutate + invalidates ["researchers"] on success', () => {
        const mutate = jest.fn()
        const invalidateQueries = jest.fn()
        mockUseMutation.mockReturnValue({ mutate })
        mockUseQueryClient.mockReturnValue({ invalidateQueries })

        const { result } = renderHook(() => useResearcherDelete('r-1'))
        expect(result.current).toBe(mutate)

        const opts = mockUseMutation.mock.calls[0][0]
        opts.onSuccess()
        expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['researchers'] })
    })
})
