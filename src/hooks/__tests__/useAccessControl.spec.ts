import { renderHook } from '@testing-library/react'
import { useSession } from 'next-auth/react'

import { ROLE } from '@/types/constants/roles'

import { useAccessControl } from '../useAccessControl'

jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
}))

const mockUseSession = useSession as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useAccessControl', () => {
    it('returns a function', () => {
        mockUseSession.mockReturnValue({ data: null })
        const { result } = renderHook(() => useAccessControl(ROLE.ADMIN))
        expect(typeof result.current).toBe('function')
    })

    it('returns true when user has the single role', () => {
        mockUseSession.mockReturnValue({
            data: { user: { roles: [ROLE.ADMIN, ROLE.SYSTEMS_VIEW] } },
        })
        const { result } = renderHook(() => useAccessControl(ROLE.ADMIN))
        expect(result.current()).toBe(true)
    })

    it('returns true when user has one of the roles in array', () => {
        mockUseSession.mockReturnValue({
            data: { user: { roles: [ROLE.CATALOGUE_VIEW] } },
        })
        const { result } = renderHook(() => useAccessControl([ROLE.CATALOGUE_VIEW, ROLE.ADMIN]))
        expect(result.current()).toBe(true)
    })

    it('returns false when user lacks role', () => {
        mockUseSession.mockReturnValue({
            data: { user: { roles: [ROLE.CATALOGUE_VIEW] } },
        })
        const { result } = renderHook(() => useAccessControl(ROLE.ADMIN))
        expect(result.current()).toBe(false)
    })

    it('returns false when no session', () => {
        mockUseSession.mockReturnValue({ data: null })
        const { result } = renderHook(() => useAccessControl(ROLE.ADMIN))
        expect(result.current()).toBe(false)
    })
})
