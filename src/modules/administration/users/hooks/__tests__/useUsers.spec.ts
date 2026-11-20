import { renderHook } from '@testing-library/react'
import { useQueryState } from 'nuqs'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'

import { USERS_QUERY_KEY, useUsers } from '../useUsers'

jest.mock('nuqs', () => ({
    useQueryState: jest.fn(),
}))

jest.mock('@/hooks/fetch/useGraphQL', () => ({
    useGraphQL: jest.fn(),
}))

jest.mock('sonner', () => ({
    toast: { error: jest.fn() },
}))

import { toast } from 'sonner'

const user = (uid: string, username: string) => ({
    uid,
    username,
    email: username,
    roles: [],
    teams: [],
})

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
    it('fetches all users under a stable query key (no server-side search)', () => {
        mockUseQueryState.mockReturnValue(['jan', jest.fn()])
        renderHook(() => useUsers())
        const options = mockUseGraphQL.mock.calls[0][1]
        expect(options.variables).toBeUndefined()
        expect(options.customQueryKey).toEqual([USERS_QUERY_KEY])
    })

    it('filters users by the search string client-side', () => {
        mockUseQueryState.mockReturnValue(['NOVAK', jest.fn()])
        mockUseGraphQL.mockReturnValue({
            data: {
                users: [user('u1', 'jan.novak@eli-laser.eu'), user('u2', 'eva.mala@eli-laser.eu')],
            },
            isLoading: false,
            error: undefined,
            refetch: jest.fn(),
        })
        const { result } = renderHook(() => useUsers())
        expect(result.current.users?.map(u => u.uid)).toEqual(['u1'])
    })

    it('returns aliased users + loading + refetch', () => {
        const refetch = jest.fn()
        mockUseGraphQL.mockReturnValue({
            data: { users: [user('u', 'u@eli-laser.eu')] },
            isLoading: true,
            error: undefined,
            refetch,
        })
        const { result } = renderHook(() => useUsers())
        expect(result.current.users?.map(u => u.uid)).toEqual(['u'])
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
