import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import useQueryManager from '@/hooks/useQueryManager'

import { usePublicationDelete } from '../usePublicationDelete'
import { usePublications } from '../usePublications'

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
    useMutation: jest.fn(),
    useQueryClient: jest.fn(),
}))

jest.mock('@/hooks/useQueryManager', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryFetcher: jest.fn(() => 'fn'),
    queryMutate: jest.fn(() => 'mutate-fn'),
}))

const mockUseQuery = useQuery as jest.Mock
const mockUseMutation = useMutation as jest.Mock
const mockUseQueryClient = useQueryClient as jest.Mock
const mockUseQueryManager = useQueryManager as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseQuery.mockReturnValue({ data: undefined })
    mockUseMutation.mockReturnValue({ mutate: jest.fn() })
    mockUseQueryClient.mockReturnValue({ invalidateQueries: jest.fn() })
    mockUseQueryManager.mockReturnValue({ query: { p: 1 } })
})

describe('usePublications', () => {
    it('uses tableId + enableQueryURL=true', () => {
        renderHook(() => usePublications('pubs-table'))
        expect(mockUseQueryManager).toHaveBeenCalledWith('pubs-table', undefined, true)
    })

    it('threads manager.query into queryKey', () => {
        mockUseQueryManager.mockReturnValue({ query: { p: 5 } })
        renderHook(() => usePublications('t'))
        expect(mockUseQuery.mock.calls[0][0].queryKey).toEqual([
            'publications',
            { query: { p: 5 } },
        ])
    })
})

describe('usePublicationDelete', () => {
    it('returns mutate + invalidates ["publications"] on success', () => {
        const mutate = jest.fn()
        const invalidateQueries = jest.fn()
        mockUseMutation.mockReturnValue({ mutate })
        mockUseQueryClient.mockReturnValue({ invalidateQueries })

        const { result } = renderHook(() => usePublicationDelete('p-1'))
        expect(result.current).toBe(mutate)

        const opts = mockUseMutation.mock.calls[0][0]
        opts.onSuccess()
        expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['publications'] })
    })
})
