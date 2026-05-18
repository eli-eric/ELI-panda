import { renderHook } from '@testing-library/react'
import { useQueryState } from 'next-usequerystate'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'

import { useUsers } from '../useUsers'

jest.mock('next-usequerystate', () => ({
    useQueryState: jest.fn(),
}))

jest.mock('@/hooks/fetch/useGraphQL', () => ({
    useGraphQL: jest.fn(),
}))

jest.mock('sonner', () => ({
    toast: { error: jest.fn() },
}))

import { toast } from 'sonner'

const mockUseQueryState = useQueryState as unknown as jest.Mock
const mockUseGraphQL = useGraphQL as jest.Mock
const mockToast = toast as unknown as { error: jest.Mock }

beforeEach(() => {
    jest.clearAllMocks()
    mockUseQueryState.mockReturnValue(['', jest.fn()])
    mockUseGraphQL.mockReturnValue({
        data: { users: [] },
        isLoading: false,
        error: undefined,
        refetch: jest.fn(),
    })
})

describe('useUsers', () => {
    it('passes empty username_CONTAINS when no search', () => {
        renderHook(() => useUsers())
        const variables = mockUseGraphQL.mock.calls[0][1].variables
        expect(variables.where.username_CONTAINS).toBe('')
    })

    it('passes the search string when set', () => {
        mockUseQueryState.mockReturnValue(['jan', jest.fn()])
        renderHook(() => useUsers())
        const variables = mockUseGraphQL.mock.calls[0][1].variables
        expect(variables.where.username_CONTAINS).toBe('jan')
    })

    it('returns aliased users + loading + refetch', () => {
        const refetch = jest.fn()
        mockUseGraphQL.mockReturnValue({
            data: { users: [{ uid: 'u' }] },
            isLoading: true,
            error: undefined,
            refetch,
        })
        const { result } = renderHook(() => useUsers())
        expect(result.current.users).toEqual([{ uid: 'u' }])
        expect(result.current.loading).toBe(true)
        expect(result.current.refetch).toBe(refetch)
    })

    it('does not fire toast.error when error is undefined', () => {
        renderHook(() => useUsers())
        expect(mockToast.error).not.toHaveBeenCalled()
    })

    it('fires toast.error when error is set', () => {
        mockUseGraphQL.mockReturnValue({
            data: undefined,
            isLoading: false,
            error: new Error('boom'),
            refetch: jest.fn(),
        })
        renderHook(() => useUsers())
        expect(mockToast.error).toHaveBeenCalledWith('Failed to fetch users')
    })
})
