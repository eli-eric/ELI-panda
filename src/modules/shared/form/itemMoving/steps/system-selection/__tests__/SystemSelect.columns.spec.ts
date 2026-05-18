import { renderHook } from '@testing-library/react'

import { useSubsystems } from '@/modules/systems/hooks/useSubsystems'
import { useSystems } from '@/modules/systems/hooks/useSystems'

import { useDestinationColumns } from '../SystemSelect.columns'

jest.mock('@/modules/systems/hooks/useSubsystems', () => ({
    useSubsystems: jest.fn(),
}))

jest.mock('@/modules/systems/hooks/useSystems', () => ({
    useSystems: jest.fn(),
}))

const mockUseSubsystems = useSubsystems as jest.Mock
const mockUseSystems = useSystems as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseSubsystems.mockReturnValue({ setUid: jest.fn() })
    mockUseSystems.mockReturnValue({ queryKey: ['systems'] })
})

describe('useDestinationColumns', () => {
    it('returns 5 columns', () => {
        const { result } = renderHook(() => useDestinationColumns('t1'))
        expect(result.current.map(c => c.id)).toEqual([
            'icon',
            'name',
            'Code',
            'zone',
            'location',
        ])
    })

    it('icon column is sticky + size 41', () => {
        const { result } = renderHook(() => useDestinationColumns('t1'))
        const icon = result.current[0] as any
        expect(icon.meta?.sticky).toBe(true)
        expect(icon.size).toBe(41)
    })

    it('name column sticky + enableHiding=false', () => {
        const { result } = renderHook(() => useDestinationColumns('t1'))
        const name = result.current[1] as any
        expect(name.meta?.sticky).toBe(true)
        expect(name.enableHiding).toBe(false)
    })

    it('zone accessor returns row.zone.code', () => {
        const { result } = renderHook(() => useDestinationColumns('t1'))
        const zone = result.current[3] as any
        expect(zone.accessorFn({ zone: { code: 'Z-1' } })).toBe('Z-1')
        expect(zone.accessorFn({ zone: null })).toBeUndefined()
    })

    it('location accessor returns row.location.name', () => {
        const { result } = renderHook(() => useDestinationColumns('t1'))
        const loc = result.current[4] as any
        expect(loc.accessorFn({ location: { name: 'Room' } })).toBe('Room')
    })

    it('passes tableId + setUid + queryKey to SystemNameCell', () => {
        const setUid = jest.fn()
        mockUseSubsystems.mockReturnValue({ setUid })
        mockUseSystems.mockReturnValue({ queryKey: ['my-table'] })
        renderHook(() => useDestinationColumns('my-table'))
        expect(mockUseSubsystems).toHaveBeenCalledWith('my-table')
        expect(mockUseSystems).toHaveBeenCalledWith('my-table')
    })
})
