import { useQuery, useQueryClient } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import useQueryManager from '@/hooks/useQueryManager'

import { useSystems } from '../useSystems'

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
    useQueryClient: jest.fn(),
    keepPreviousData: 'keepPreviousData',
}))

jest.mock('@/hooks/useQueryManager', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryFetcher: jest.fn(() => jest.fn()),
}))

jest.mock('sonner', () => ({
    toast: { error: jest.fn() },
}))

import { toast } from 'sonner'

const mockUseQuery = useQuery as jest.Mock
const mockUseQueryClient = useQueryClient as jest.Mock
const mockUseQueryManager = useQueryManager as unknown as jest.Mock
const mockToast = toast as unknown as { error: jest.Mock }

beforeEach(() => {
    jest.clearAllMocks()
    mockUseQueryManager.mockReturnValue({ query: { page: 1 } })
    mockUseQuery.mockReturnValue({
        data: { data: [], totalCount: 0 },
        isFetching: false,
        isError: false,
        error: null,
        dataUpdatedAt: 0,
        refetch: jest.fn(),
    })
    mockUseQueryClient.mockReturnValue({
        setQueryData: jest.fn(),
        invalidateQueries: jest.fn(),
    })
})

describe('useSystems', () => {
    it('defaults tableId to "systems"', () => {
        renderHook(() => useSystems())
        expect(mockUseQueryManager).toHaveBeenCalledWith('systems', undefined, false)
    })

    it('threads custom tableId + pageSize + queryURL flag', () => {
        renderHook(() => useSystems('orders', false, 25 as any, true))
        expect(mockUseQueryManager).toHaveBeenCalledWith('orders', 25, true)
    })

    it('builds queryKey from tableId and manager query', () => {
        mockUseQueryManager.mockReturnValue({ query: { p: 2 } })
        renderHook(() => useSystems('orders'))
        const opts = mockUseQuery.mock.calls[0][0]
        expect(opts.queryKey).toEqual(['orders', { query: { p: 2 } }])
    })

    it('mutate forwards to queryClient.setQueryData with queryKey', () => {
        const setQueryData = jest.fn()
        mockUseQueryClient.mockReturnValue({
            setQueryData,
            invalidateQueries: jest.fn(),
        })
        const { result } = renderHook(() => useSystems())
        const mutator = jest.fn(x => x)
        result.current.mutate(mutator)
        expect(setQueryData).toHaveBeenCalledWith(result.current.queryKey, mutator)
    })

    it('invalidate forwards to queryClient.invalidateQueries with queryKey', () => {
        const invalidateQueries = jest.fn()
        mockUseQueryClient.mockReturnValue({
            setQueryData: jest.fn(),
            invalidateQueries,
        })
        const { result } = renderHook(() => useSystems())
        result.current.invalidate()
        expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: result.current.queryKey })
    })

    it('fires toast.error when isError flips with an error', () => {
        mockUseQuery.mockReturnValue({
            data: undefined,
            isFetching: false,
            isError: true,
            error: new Error('nope'),
            dataUpdatedAt: 0,
            refetch: jest.fn(),
        })
        renderHook(() => useSystems())
        expect(mockToast.error).toHaveBeenCalledWith(expect.stringContaining('nope'))
    })
})
