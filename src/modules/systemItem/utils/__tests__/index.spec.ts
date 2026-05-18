import { formatParentPath } from '../index'

describe('formatParentPath', () => {
    it('joins names with " > " separator', () => {
        const result = formatParentPath([{ name: 'A' }, { name: 'B' }, { name: 'C' }])
        expect(result).toBe('A > B > C')
    })

    it('appends currentName onto path when provided', () => {
        const result = formatParentPath([{ name: 'A' }, { name: 'B' }], 'Current')
        expect(result).toBe('A > B > Current')
    })

    it('returns "" for empty path and no currentName', () => {
        expect(formatParentPath()).toBe('')
        expect(formatParentPath(null)).toBe('')
        expect(formatParentPath([])).toBe('')
    })

    it('returns just currentName when path is empty', () => {
        expect(formatParentPath([], 'Solo')).toBe('Solo')
    })

    it('skips entries with null/undefined names', () => {
        const result = formatParentPath([
            { name: 'A' },
            null,
            undefined,
            { name: null } as any,
            { name: 'B' },
        ])
        expect(result).toBe('A > B')
    })

    it('skips non-string name entries defensively', () => {
        const result = formatParentPath([{ name: 'A' }, { name: 42 as any }, { name: 'C' }])
        expect(result).toBe('A > C')
    })
})
