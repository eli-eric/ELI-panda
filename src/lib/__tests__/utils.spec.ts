import { cn, truncateString } from '../utils'

describe('cn', () => {
    it('joins class strings', () => {
        expect(cn('a', 'b')).toBe('a b')
    })

    it('drops falsy values', () => {
        expect(cn('a', false, null, undefined, 'b')).toBe('a b')
    })

    it('merges conflicting tailwind classes (last wins)', () => {
        // twMerge resolves conflicting utilities
        expect(cn('p-2', 'p-4')).toBe('p-4')
    })

    it('handles object form (conditional classes)', () => {
        expect(cn({ a: true, b: false }, 'c')).toBe('a c')
    })
})

describe('truncateString', () => {
    it('returns empty string for undefined/empty input', () => {
        expect(truncateString()).toBe('')
        expect(truncateString(undefined)).toBe('')
        expect(truncateString('')).toBe('')
    })

    it('returns string unchanged when shorter than length', () => {
        expect(truncateString('hello', 10)).toBe('hello')
    })

    it('returns string unchanged when exactly at length', () => {
        expect(truncateString('hello', 5)).toBe('hello')
    })

    it('truncates strings longer than length with ...', () => {
        expect(truncateString('hello world', 5)).toBe('hello...')
    })

    it('defaults length to 30', () => {
        const long = 'a'.repeat(40)
        expect(truncateString(long)).toBe('a'.repeat(30) + '...')
        expect(truncateString('short')).toBe('short')
    })
})
