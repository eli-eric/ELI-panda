import { renderHook } from '@testing-library/react'

import { AllProvidersWrapper } from '@/testutils/wrappers/AllProvidersWrapper'

import type { Zone } from '../types/zone.types'
import { useZoneColumns } from '../zones.columns'

describe('zone columns accessors', () => {
    const rootZone: Zone = {
        uid: '1',
        name: 'Root Zone',
        code: 'RZ',
        parentZone: null,
    }

    const childZone: Zone = {
        uid: '2',
        name: 'Child Zone',
        code: 'CZ',
        parentZone: { uid: '1', name: 'Root Zone' },
    }

    it('accesses name correctly', () => {
        expect(rootZone.name).toBe('Root Zone')
    })

    it('accesses code correctly', () => {
        expect(rootZone.code).toBe('RZ')
    })

    it('shows parent zone name for child zone', () => {
        expect(childZone.parentZone?.name ?? '—').toBe('Root Zone')
    })

    it('shows dash for root zone without parent', () => {
        expect(rootZone.parentZone?.name ?? '—').toBe('—')
    })

    it('handles null parentZone', () => {
        const zone: Zone = { uid: '3', name: 'Test', code: 'T', parentZone: null }
        expect(zone.parentZone?.name ?? '—').toBe('—')
    })

    it('handles undefined parentZone', () => {
        const zone: Zone = { uid: '4', name: 'Test', code: 'T' }
        expect(zone.parentZone?.name ?? '—').toBe('—')
    })

    it('accesses notes correctly', () => {
        const zone: Zone = { uid: '5', name: 'Test', code: 'T', notes: 'Some notes' }
        expect(zone.notes ?? '—').toBe('Some notes')
    })

    it('shows dash for empty notes', () => {
        const zone: Zone = { uid: '6', name: 'Test', code: 'T', notes: null }
        expect(zone.notes ?? '—').toBe('—')
    })
})

describe('useZoneColumns', () => {
    const renderColumns = () => {
        const { result } = renderHook(() => useZoneColumns(), {
            wrapper: AllProvidersWrapper,
        })
        return result.current
    }

    const readCell = (columnId: string, zone: Zone) => {
        const column = renderColumns().find(c => c.id === columnId)
        expect(column).toBeDefined()
        // accessorFn is what the table actually renders for this column
        return (column as { accessorFn: (row: Zone, index: number) => unknown }).accessorFn(
            zone,
            0,
        )
    }

    it('exposes a defaultParentSystem column', () => {
        expect(renderColumns().map(c => c.id)).toContain('defaultParentSystem')
    })

    it('renders the default parent system name', () => {
        const zone: Zone = {
            uid: '1',
            name: 'L1',
            code: '01',
            defaultParentSystem: { uid: 'sys-1', name: '01 - L1 laser system', code: 'PLC01-001' },
        }
        expect(readCell('defaultParentSystem', zone)).toBe('01 - L1 laser system')
    })

    it('renders the name even when the system has no code', () => {
        const zone: Zone = {
            uid: '1',
            name: 'L1',
            code: '01',
            defaultParentSystem: { uid: 'sys-1', name: 'Legacy system' },
        }
        expect(readCell('defaultParentSystem', zone)).toBe('Legacy system')
    })

    it.each([
        ['null', null],
        ['undefined', undefined],
    ])('renders a dash when defaultParentSystem is %s', (_label, value) => {
        const zone: Zone = {
            uid: '1',
            name: 'L1',
            code: '01',
            defaultParentSystem: value as Zone['defaultParentSystem'],
        }
        expect(readCell('defaultParentSystem', zone)).toBe('—')
    })
})
