import { versionsData } from '../versions'

describe('versionsData', () => {
    it('has currentVersion string in semver-ish shape', () => {
        expect(typeof versionsData.currentVersion).toBe('string')
        expect(versionsData.currentVersion).toMatch(/^\d+\.\d+\.\d+$/)
    })

    it('has at least one release with required fields', () => {
        expect(versionsData.releases.length).toBeGreaterThan(0)
        versionsData.releases.forEach(r => {
            expect(typeof r.version).toBe('string')
            expect(typeof r.date).toBe('string')
            expect(typeof r.title).toBe('string')
            expect(typeof r.description).toBe('string')
            expect(['major', 'minor', 'patch']).toContain(r.type)
            expect(Array.isArray(r.changes)).toBe(true)
        })
    })

    it('first release equals currentVersion', () => {
        expect(versionsData.releases[0].version).toBe(versionsData.currentVersion)
    })

    it('release versions are unique', () => {
        const versions = versionsData.releases.map(r => r.version)
        expect(new Set(versions).size).toBe(versions.length)
    })

    it('every change has category + non-empty items array', () => {
        versionsData.releases.forEach(r => {
            r.changes.forEach(change => {
                expect(typeof change.category).toBe('string')
                expect(change.category.length).toBeGreaterThan(0)
                expect(Array.isArray(change.items)).toBe(true)
                expect(change.items.length).toBeGreaterThan(0)
                change.items.forEach(item => expect(typeof item).toBe('string'))
            })
        })
    })
})
