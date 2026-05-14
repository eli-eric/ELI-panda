import { detectSearchPattern, hasAsteriskPattern } from '../searchPattern'

describe('detectSearchPattern', () => {
    it.each([
        ['', null],
        ['   ', null],
        ['C01', 'startsWith'],
        ['C01*', 'startsWith'],
        ['*C01', 'endsWith'],
        ['*C01*', 'contains'],
    ] as const)('"%s" -> %s', (input, expected) => {
        expect(detectSearchPattern(input)).toBe(expected)
    })

    it('treats only "*" / "**" as startsWith (length not > 2 rule)', () => {
        expect(detectSearchPattern('*')).toBe('startsWith')
        expect(detectSearchPattern('**')).toBe('startsWith')
    })

    it('trims whitespace before evaluating', () => {
        expect(detectSearchPattern('  *abc*  ')).toBe('contains')
    })
})

describe('hasAsteriskPattern', () => {
    it('returns true when value contains an asterisk', () => {
        expect(hasAsteriskPattern('a*b')).toBe(true)
        expect(hasAsteriskPattern('*')).toBe(true)
    })

    it('returns false when value has no asterisk', () => {
        expect(hasAsteriskPattern('abc')).toBe(false)
        expect(hasAsteriskPattern('')).toBe(false)
    })
})
