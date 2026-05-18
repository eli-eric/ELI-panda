import { useQuery, useQueryClient } from '@tanstack/react-query'
import { act, renderHook } from '@testing-library/react'

import { useSubsystems } from '../useSubsystems'
import { useSystems } from '../useSystems'

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
    useQueryClient: jest.fn(),
}))

jest.mock('../useSystems', () => ({
    useSystems: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryFetcher: jest.fn(() => 'fn'),
}))

const mockUseQuery = useQuery as jest.Mock
const mockUseQueryClient = useQueryClient as jest.Mock
const mockUseSystems = useSystems as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseSystems.mockReturnValue({ queryKey: ['systems', { query: {} }] })
    mockUseQuery.mockReturnValue({ isLoading: false, data: undefined })
    mockUseQueryClient.mockReturnValue({ setQueryData: jest.fn() })
})

describe('useSubsystems', () => {
    it('threads tableId + enableQueryURL into useSystems', () => {
        renderHook(() => useSubsystems('orders', true))
        expect(mockUseSystems).toHaveBeenCalledWith('orders', false, undefined, true)
    })

    it('starts disabled (no uid) and queryKey is ["subsystems", {uid: null}]', () => {
        renderHook(() => useSubsystems('t'))
        const opts = mockUseQuery.mock.calls[0][0]
        expect(opts.enabled).toBe(false)
        expect(opts.queryKey).toEqual(['subsystems', { uid: null }])
        expect(opts.staleTime).toBe(0)
    })

    it('setUid re-runs hook with new uid', () => {
        const { result, rerender } = renderHook(() => useSubsystems('t'))
        act(() => result.current.setUid('uid-1'))
        rerender()
        // last useQuery call should reflect the new uid
        const calls = mockUseQuery.mock.calls
        const last = calls[calls.length - 1][0]
        expect(last.queryKey).toEqual(['subsystems', { uid: 'uid-1' }])
        expect(last.enabled).toBe(true)
    })

    it('returns pending alias from useQuery.isLoading', () => {
        mockUseQuery.mockReturnValue({ isLoading: true, data: undefined })
        const { result } = renderHook(() => useSubsystems('t'))
        expect(result.current.pending).toBe(true)
    })
})
