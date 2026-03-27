import { renderHook } from '@testing-library/react'
import { useSession } from 'next-auth/react'

import type { NavigationItem } from '@/lib/navigation/types'
import { ROLE } from '@/types/constants/roles'

import { useFilteredNavigation } from '../useFilteredNavigation'

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}))

const mockUseSession = useSession as jest.Mock

const navItems: NavigationItem[] = [
  { title: 'Systems', url: '/systems', role: ROLE.SYSTEMS_VIEW },
  { title: 'Catalogue', url: '/catalogue', role: ROLE.CATALOGUE_VIEW },
  { title: 'Admin', url: '/admin', role: ROLE.ADMIN },
]

beforeEach(() => {
  jest.clearAllMocks()
})

describe('useFilteredNavigation', () => {
  it('returns only items matching user roles', () => {
    mockUseSession.mockReturnValue({
      data: { user: { roles: [ROLE.SYSTEMS_VIEW, ROLE.CATALOGUE_VIEW] } },
    })
    const { result } = renderHook(() => useFilteredNavigation(navItems))
    expect(result.current).toHaveLength(2)
    expect(result.current.map(i => i.title)).toEqual(['Systems', 'Catalogue'])
  })

  it('returns empty array when no session', () => {
    mockUseSession.mockReturnValue({ data: null })
    const { result } = renderHook(() => useFilteredNavigation(navItems))
    expect(result.current).toEqual([])
  })

  it('returns empty array when user has no roles', () => {
    mockUseSession.mockReturnValue({
      data: { user: { roles: [] } },
    })
    const { result } = renderHook(() => useFilteredNavigation(navItems))
    expect(result.current).toEqual([])
  })

  it('returns all items for admin with all roles', () => {
    mockUseSession.mockReturnValue({
      data: { user: { roles: [ROLE.SYSTEMS_VIEW, ROLE.CATALOGUE_VIEW, ROLE.ADMIN] } },
    })
    const { result } = renderHook(() => useFilteredNavigation(navItems))
    expect(result.current).toHaveLength(3)
  })
})
