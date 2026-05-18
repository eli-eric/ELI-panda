import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import useQueryManager from '@/hooks/useQueryManager'

import { useGrant } from '../useGrant'
import { useGrantDelete } from '../useGrantDelete'
import { useGrants } from '../useGrants'

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
    queryFetcher: jest.fn(() => 'query-fn'),
    queryMutate: jest.fn(() => 'mutate-fn'),
}))

const mockUseQuery = useQuery as jest.Mock
const mockUseMutation = useMutation as jest.Mock
const mockUseQueryClient = useQueryClient as jest.Mock
const mockUseQueryManager = useQueryManager as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseQueryClient.mockReturnValue({ invalidateQueries: jest.fn() })
    mockUseMutation.mockReturnValue({ mutate: jest.fn() })
    mockUseQuery.mockReturnValue({ data: undefined })
    mockUseQueryManager.mockReturnValue({ query: { page: 1 } })
})

describe('useGrant', () => {
    it('queryKey includes uid + staleTime 0 + enabled gating', () => {
        renderHook(() => useGrant('g-1'))
        const opts = mockUseQuery.mock.calls[0][0]
        expect(opts.queryKey).toEqual(['grant', { uid: 'g-1' }])
        expect(opts.staleTime).toBe(0)
        expect(opts.enabled).toBe(true)

        renderHook(() => useGrant())
        expect(mockUseQuery.mock.calls[1][0].enabled).toBe(false)
    })
})

describe('useGrants', () => {
    it('queryKey includes manager query + threads tableId', () => {
        renderHook(() => useGrants('grants-table'))
        expect(mockUseQueryManager).toHaveBeenCalledWith('grants-table', undefined, true)
        expect(mockUseQuery.mock.calls[0][0].queryKey).toEqual([
            'grants',
            { query: { page: 1 } },
        ])
    })
})

describe('useGrantDelete', () => {
    it('returns mutate from useMutation', () => {
        const mutate = jest.fn()
        mockUseMutation.mockReturnValue({ mutate })
        const { result } = renderHook(() => useGrantDelete('g-1'))
        expect(result.current).toBe(mutate)
    })

    it('onSuccess invalidates the grants list', () => {
        const invalidateQueries = jest.fn()
        mockUseQueryClient.mockReturnValue({ invalidateQueries })
        renderHook(() => useGrantDelete('g-1'))
        const opts = mockUseMutation.mock.calls[0][0]
        opts.onSuccess()
        expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['grants'] })
    })
})
