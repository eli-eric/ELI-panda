import { renderHook } from '@testing-library/react'
import { useSession } from 'next-auth/react'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'

import { useCanEditOperationalState } from '../useCanEditOperationalState'
import { useRoomCardContactsHall } from '../useRoomCardContacts'

jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
}))

jest.mock('@/hooks/fetch/useGraphQL', () => ({
    useGraphQL: jest.fn(),
}))

jest.mock('../useRoomCardContacts', () => ({
    useRoomCardContactsHall: jest.fn(),
}))

const mockUseSession = useSession as jest.Mock
const mockUseGraphQL = useGraphQL as jest.Mock
const mockUseRoomCardContactsHall = useRoomCardContactsHall as jest.Mock

const contact = (employeeUid: string, roleName?: string) => ({
    employee: { uid: employeeUid },
    role: roleName ? { name: roleName } : null,
})

beforeEach(() => {
    jest.clearAllMocks()
    mockUseSession.mockReturnValue({ data: { user: { uid: 'user-1' } } })
    mockUseGraphQL.mockReturnValue({
        data: { users: [{ uid: 'user-1', employee: { uid: 'emp-1' } }] },
    })
    mockUseRoomCardContactsHall.mockReturnValue({ contactPersonsHall: [] })
})

describe('useCanEditOperationalState', () => {
    it('returns false when no logged-in user employee uid', () => {
        mockUseGraphQL.mockReturnValue({ data: { users: [{ employee: null }] } })
        const { result } = renderHook(() => useCanEditOperationalState('r'))
        expect(result.current).toBe(false)
    })

    it('returns true when employee is Area Manager', () => {
        mockUseRoomCardContactsHall.mockReturnValue({
            contactPersonsHall: [contact('emp-1', 'Area Manager')],
        })
        const { result } = renderHook(() => useCanEditOperationalState('r'))
        expect(result.current).toBe(true)
    })

    it('returns true when employee is Area Manager - Deputy', () => {
        mockUseRoomCardContactsHall.mockReturnValue({
            contactPersonsHall: [contact('emp-1', 'Area Manager - Deputy')],
        })
        const { result } = renderHook(() => useCanEditOperationalState('r'))
        expect(result.current).toBe(true)
    })

    it('returns false when employee matches but role is different', () => {
        mockUseRoomCardContactsHall.mockReturnValue({
            contactPersonsHall: [contact('emp-1', 'Visitor')],
        })
        const { result } = renderHook(() => useCanEditOperationalState('r'))
        expect(result.current).toBe(false)
    })

    it('returns false when no contact matches employee uid', () => {
        mockUseRoomCardContactsHall.mockReturnValue({
            contactPersonsHall: [contact('emp-other', 'Area Manager')],
        })
        const { result } = renderHook(() => useCanEditOperationalState('r'))
        expect(result.current).toBe(false)
    })

    it('returns false when contactPersonsHall is undefined', () => {
        mockUseRoomCardContactsHall.mockReturnValue({ contactPersonsHall: undefined })
        const { result } = renderHook(() => useCanEditOperationalState('r'))
        expect(result.current).toBe(false)
    })

    it('disables current-user query when no session user uid', () => {
        mockUseSession.mockReturnValue({ data: undefined })
        renderHook(() => useCanEditOperationalState('r'))
        const opts = mockUseGraphQL.mock.calls[0][1]
        expect(opts.enabled).toBe(false)
    })
})
