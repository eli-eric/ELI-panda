import { renderHook } from '@testing-library/react'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'

import { useUserDetail } from '../useUserDetail'

jest.mock('@/hooks/fetch/useGraphQL', () => ({
    useGraphQL: jest.fn(),
}))

const mockUseGraphQL = useGraphQL as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseGraphQL.mockReturnValue({
        data: { users: [] },
        refetch: jest.fn(),
        isLoading: false,
    })
})

describe('useUserDetail', () => {
    it('passes uid as where.uid variable', () => {
        renderHook(() => useUserDetail('user-1'))
        const variables = mockUseGraphQL.mock.calls[0][1].variables
        expect(variables.where.uid).toBe('user-1')
    })

    it('returns the first user from the array', () => {
        mockUseGraphQL.mockReturnValue({
            data: { users: [{ uid: 'u', email: 'a@b.cz' }, { uid: 'u2' }] },
            refetch: jest.fn(),
            isLoading: false,
        })
        const { result } = renderHook(() => useUserDetail('u'))
        expect(result.current.userDetail).toEqual({ uid: 'u', email: 'a@b.cz' })
    })

    it('aliases loading + refetch', () => {
        const refetch = jest.fn()
        mockUseGraphQL.mockReturnValue({
            data: { users: [] },
            refetch,
            isLoading: true,
        })
        const { result } = renderHook(() => useUserDetail('u'))
        expect(result.current.loading).toBe(true)
        expect(result.current.refetch).toBe(refetch)
    })
})
