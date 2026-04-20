import {
    getSerialNumberCount,
    hasDuplicateSerialNumbers,
    parseSerialNumbers,
} from '../parseSerialNumbers'

describe('parseSerialNumbers', () => {
    it('returns empty array for null/undefined/empty', () => {
        expect(parseSerialNumbers(null)).toEqual([])
        expect(parseSerialNumbers(undefined)).toEqual([])
        expect(parseSerialNumbers('')).toEqual([])
    })

    it('splits comma separated values', () => {
        expect(parseSerialNumbers('a,b,c')).toEqual(['a', 'b', 'c'])
    })

    it('trims whitespace around values', () => {
        expect(parseSerialNumbers('  a , b  ,  c ')).toEqual(['a', 'b', 'c'])
    })

    it('filters out empty strings produced by extra commas', () => {
        expect(parseSerialNumbers('a,,b,,,c')).toEqual(['a', 'b', 'c'])
    })

    it('deduplicates values keeping first occurrence order', () => {
        expect(parseSerialNumbers('a,b,a,c,b')).toEqual(['a', 'b', 'c'])
    })

    it('returns empty for non-string input (type guard)', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(parseSerialNumbers(123 as any)).toEqual([])
    })
})

describe('getSerialNumberCount', () => {
    it('counts unique trimmed non-empty values', () => {
        expect(getSerialNumberCount('a,b,a,c')).toBe(3)
    })

    it('returns 0 for empty/null', () => {
        expect(getSerialNumberCount('')).toBe(0)
        expect(getSerialNumberCount(null)).toBe(0)
    })
})

describe('hasDuplicateSerialNumbers', () => {
    it('returns true when duplicates exist', () => {
        expect(hasDuplicateSerialNumbers('a,b,a')).toBe(true)
    })

    it('returns false when all unique', () => {
        expect(hasDuplicateSerialNumbers('a,b,c')).toBe(false)
    })

    it('handles whitespace around values (a vs " a " are same)', () => {
        expect(hasDuplicateSerialNumbers('a, a')).toBe(true)
    })

    it('returns false for null/empty', () => {
        expect(hasDuplicateSerialNumbers('')).toBe(false)
        expect(hasDuplicateSerialNumbers(null)).toBe(false)
    })
})
