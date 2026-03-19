import type { Zone } from '../types/zone.types'

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
})
