import { act, renderHook } from '@testing-library/react'

import { useLocationModal } from '../useLocationModal'
import { useLocation, useSubLocations } from '../useLocation'

jest.mock('../useLocation', () => ({
    useLocation: jest.fn(),
    useSubLocations: jest.fn(),
}))

jest.mock('../../utils', () => ({
    updateLocationWithSublocation: (prev: any[], subs: any[], uid: string) =>
        prev.map(p =>
            p.uid === uid ? { ...p, children: subs.map(s => ({ uid: s.uid })) } : p,
        ),
}))

const mockUseLocation = useLocation as jest.Mock
const mockUseSubLocations = useSubLocations as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseLocation.mockReturnValue({ locations: null, error: undefined })
    mockUseSubLocations.mockReturnValue({ subLocations: null, loading: false, error: undefined })
})

describe('useLocationModal', () => {
    it('returns initial empty codebooktree when no locations loaded', () => {
        const { result } = renderHook(() => useLocationModal())
        expect(result.current.codebooktree).toEqual([])
        expect(result.current.tableId).toBe('location-tree')
        expect(result.current.uid).toBe('')
    })

    it('builds codebooktree from locations and marks expandability', () => {
        mockUseLocation.mockReturnValue({
            locations: [
                { uid: 'a', name: 'A', code: 'CA', subLocations: [] },
                { uid: 'b', name: 'B', code: 'CB', subLocations: [{ uid: 'b1' }] },
            ],
            error: undefined,
        })
        const { result } = renderHook(() => useLocationModal())
        expect(result.current.codebooktree.map(l => l.uid)).toEqual(['a', 'b'])
        expect(result.current.codebooktree[0].isExpandable).toBe(false)
        expect(result.current.codebooktree[1].isExpandable).toBe(true)
    })

    it('fetchChildren updates uid', () => {
        const { result } = renderHook(() => useLocationModal())
        act(() => {
            result.current.fetchChildren('zzz')
        })
        expect(result.current.uid).toBe('zzz')
    })

    it('error surfaces from locations or sublocations', () => {
        mockUseLocation.mockReturnValue({ locations: null, error: new Error('locations down') })
        const { result } = renderHook(() => useLocationModal())
        expect((result.current.error as Error)?.message).toBe('locations down')

        mockUseLocation.mockReturnValue({ locations: null, error: undefined })
        mockUseSubLocations.mockReturnValue({
            subLocations: null,
            loading: false,
            error: new Error('sub down'),
        })
        const { result: r2 } = renderHook(() => useLocationModal())
        expect((r2.current.error as Error)?.message).toBe('sub down')
    })
})
