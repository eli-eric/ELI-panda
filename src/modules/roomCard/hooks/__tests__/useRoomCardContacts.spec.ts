import { renderHook } from '@testing-library/react'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'

import {
    useRoomCardContactsDept,
    useRoomCardContactsHall,
    useRoomCardLocations,
    useRoomCardTeams,
} from '../useRoomCardContacts'

jest.mock('@/hooks/fetch/useGraphQL', () => ({
    useGraphQL: jest.fn(),
}))

const mockUseGraphQL = useGraphQL as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseGraphQL.mockReturnValue({
        data: undefined,
        refetch: jest.fn(),
        isFetching: false,
    })
})

describe.each([
    ['useRoomCardContactsDept', useRoomCardContactsDept, 'contactPersonsDept'],
    ['useRoomCardContactsHall', useRoomCardContactsHall, 'contactPersonsHall'],
    ['useRoomCardTeams', useRoomCardTeams, 'teams'],
    ['useRoomCardLocations', useRoomCardLocations, 'locations'],
] as const)('%s', (_name, hook, field) => {
    const aliasFor = (h: typeof hook) =>
        h === useRoomCardContactsDept
            ? 'contactPersonsDept'
            : h === useRoomCardContactsHall
              ? 'contactPersonsHall'
              : h === useRoomCardTeams
                ? 'teams'
                : 'locations'

    it('disables query without roomCardUid and returns []', () => {
        const { result } = renderHook(() => hook())
        expect(mockUseGraphQL.mock.calls[0][1].enabled).toBe(false)
        expect((result.current as any)[aliasFor(hook)]).toEqual([])
    })

    it('passes uid as where.uid when present', () => {
        renderHook(() => hook('uid-1'))
        const opts = mockUseGraphQL.mock.calls[0][1]
        expect(opts.variables.where.uid).toBe('uid-1')
        expect(opts.enabled).toBe(true)
    })

    it('returns the field unwrapped from roomCards[0]', () => {
        mockUseGraphQL.mockReturnValue({
            data: { roomCards: [{ [field]: [{ uid: 'x' }] }] },
            refetch: jest.fn(),
            isFetching: false,
        })
        const { result } = renderHook(() => hook('uid'))
        expect((result.current as any)[aliasFor(hook)]).toEqual([{ uid: 'x' }])
    })

    it('returns undefined when uid present but data loading', () => {
        mockUseGraphQL.mockReturnValue({
            data: undefined,
            refetch: jest.fn(),
            isFetching: true,
        })
        const { result } = renderHook(() => hook('uid'))
        expect((result.current as any)[aliasFor(hook)]).toBeUndefined()
    })

    it('returns [] when data present but field missing', () => {
        mockUseGraphQL.mockReturnValue({
            data: { roomCards: [{}] },
            refetch: jest.fn(),
            isFetching: false,
        })
        const { result } = renderHook(() => hook('uid'))
        expect((result.current as any)[aliasFor(hook)]).toEqual([])
    })
})
