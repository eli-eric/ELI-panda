import { messages } from '../messages'

describe('messages dictionary', () => {
    it('has the en locale populated', () => {
        expect(messages.en).toBeDefined()
        expect(typeof messages.en).toBe('object')
        expect(Object.keys(messages.en).length).toBeGreaterThan(0)
    })

    it('every entry is a string keyed by dot-separated path', () => {
        const entries = Object.entries(messages.en)
        expect(entries.length).toBeGreaterThan(0)
        entries.forEach(([key, value]) => {
            expect(key).toMatch(/^[a-zA-Z][\w.]*$/)
            expect(typeof value).toBe('string')
        })
    })

    it('exposes well-known top-level namespaces', () => {
        const keys = Object.keys(messages.en)
        expect(keys.some(k => k.startsWith('common.'))).toBe(true)
        expect(keys.some(k => k.startsWith('systemsPage.'))).toBe(true)
    })

    it('keys are unique', () => {
        const keys = Object.keys(messages.en)
        expect(new Set(keys).size).toBe(keys.length)
    })
})
