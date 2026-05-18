import { ROLE } from '@/types/constants/roles'

import { NAV_ITEMS } from '../config'

describe('NAV_ITEMS', () => {
    it('is a non-empty array', () => {
        expect(Array.isArray(NAV_ITEMS)).toBe(true)
        expect(NAV_ITEMS.length).toBeGreaterThan(0)
    })

    it('every root item has title + url + role + icon', () => {
        NAV_ITEMS.forEach(item => {
            expect(typeof item.title).toBe('string')
            expect(item.title.length).toBeGreaterThan(0)
            expect(typeof item.url).toBe('string')
            expect(item.url.startsWith('/')).toBe(true)
            expect(typeof item.role).toBe('string')
            expect(Object.values(ROLE)).toContain(item.role)
            expect(item.icon).toBeDefined()
        })
    })

    it('every sub-item has title + url + role from ROLE enum', () => {
        NAV_ITEMS.forEach(item => {
            item.items?.forEach(sub => {
                expect(typeof sub.title).toBe('string')
                expect(sub.url.startsWith('/')).toBe(true)
                expect(Object.values(ROLE)).toContain(sub.role)
            })
        })
    })

    it('starts with Dashboard', () => {
        expect(NAV_ITEMS[0].title).toBe('Dashboard')
    })

    it('Systems group contains Hierarchy + Moving sub-items', () => {
        const systems = NAV_ITEMS.find(i => i.title === 'Systems')
        expect(systems).toBeDefined()
        const titles = systems?.items?.map(s => s.title)
        expect(titles).toContain('Hierarchy')
        expect(titles).toContain('Moving')
    })
})
