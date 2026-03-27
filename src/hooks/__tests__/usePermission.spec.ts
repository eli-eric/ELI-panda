import { renderHook } from '@testing-library/react'
import { useSession } from 'next-auth/react'

import { ROLE } from '@/types/constants/roles'

import { usePermission } from '../usePermission'

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}))

const mockUseSession = useSession as jest.Mock

beforeEach(() => {
  jest.clearAllMocks()
})

describe('usePermission', () => {
  it('returns true when user has matching role', () => {
    mockUseSession.mockReturnValue({
      data: { user: { roles: [ROLE.SYSTEMS_VIEW, ROLE.CATALOGUE_VIEW] } },
    })
    const { result } = renderHook(() => usePermission([ROLE.SYSTEMS_VIEW]))
    expect(result.current).toBe(true)
  })

  it('returns false when user lacks the role', () => {
    mockUseSession.mockReturnValue({
      data: { user: { roles: [ROLE.CATALOGUE_VIEW] } },
    })
    const { result } = renderHook(() => usePermission([ROLE.ADMIN]))
    expect(result.current).toBe(false)
  })

  it('returns undefined when no session', () => {
    mockUseSession.mockReturnValue({ data: null })
    const { result } = renderHook(() => usePermission([ROLE.SYSTEMS_VIEW]))
    expect(result.current).toBeFalsy()
  })

  it('returns undefined when roles arg is undefined', () => {
    mockUseSession.mockReturnValue({
      data: { user: { roles: [ROLE.ADMIN] } },
    })
    const { result } = renderHook(() => usePermission(undefined))
    expect(result.current).toBeFalsy()
  })
})
