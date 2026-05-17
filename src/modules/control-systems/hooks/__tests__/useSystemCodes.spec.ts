import { useQuery } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import useQueryManager from '@/hooks/useQueryManager'

import { CONTROL_SYSTEMS_TABLE_ID, useSystemCodes } from '../useSystemCodes'

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
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
})

describe('useSystemCodes', () => {
    it('defaults tableId to CONTROL_SYSTEMS_TABLE_ID', () => {
        renderHook(() => useSystemCodes())
        expect(mockUseQueryManager).toHaveBeenCalledWith(
            CONTROL_SYSTEMS_TABLE_ID,
            undefined,
            true,
        )
    })

    it('honours a custom tableId', () => {
        renderHook(() => useSystemCodes('custom'))
        expect(mockUseQueryManager).toHaveBeenCalledWith('custom', undefined, true)
    })

    it('returns aliased fields', () => {
        const refetch = jest.fn()
        mockUseQuery.mockReturnValue({
            data: { data: [{ uid: 'x' }], totalCount: 1 },
            isFetching: true,
            isError: false,
            error: null,
            dataUpdatedAt: 42,
            refetch,
        })
        const { result } = renderHook(() => useSystemCodes())
        expect(result.current.systemCodes).toEqual({ data: [{ uid: 'x' }], totalCount: 1 })
        expect(result.current.loading).toBe(true)
        expect(result.current.dataUpdatedAt).toBe(42)
        expect(result.current.refetch).toBe(refetch)
    })

    it('builds queryKey with the manager query', () => {
        mockUseQueryManager.mockReturnValue({ query: { page: 2, limit: 10 } })
        renderHook(() => useSystemCodes())
        const opts = mockUseQuery.mock.calls[0][0]
        expect(opts.queryKey).toEqual(['systemCodes', { query: { page: 2, limit: 10 } }])
    })

    it('does not error-toast when isError is false', () => {
        renderHook(() => useSystemCodes())
        expect(mockToast.error).not.toHaveBeenCalled()
    })

    it('fires error-toast when isError is true', () => {
        mockUseQuery.mockReturnValue({
            data: undefined,
            isFetching: false,
            isError: true,
            error: new Error('boom'),
            dataUpdatedAt: 0,
            refetch: jest.fn(),
        })
        renderHook(() => useSystemCodes())
        expect(mockToast.error).toHaveBeenCalledWith(expect.stringContaining('boom'))
    })
})
