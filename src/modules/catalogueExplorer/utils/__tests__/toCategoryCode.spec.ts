import { toCategoryCode } from '../toCategoryCode'

describe('toCategoryCode', () => {
    it('lowercases', () => {
        expect(toCategoryCode('Widgets')).toBe('widgets')
    })

    it('replaces whitespace with hyphens', () => {
        expect(toCategoryCode('Laser Modules')).toBe('laser-modules')
    })

    it('collapses multiple whitespace', () => {
        expect(toCategoryCode('Big   Red  Thing')).toBe('big-red-thing')
    })

    it('preserves existing hyphens', () => {
        expect(toCategoryCode('Already-Coded')).toBe('already-coded')
    })

    it('returns empty string for empty input', () => {
        expect(toCategoryCode('')).toBe('')
    })
})
