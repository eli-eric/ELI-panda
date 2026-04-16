import { sortBy } from '../sortBy'

describe('sortBy', () => {
    it('returns empty array for null/undefined input', () => {
        expect(sortBy(null, 'name')).toEqual([])
        expect(sortBy(undefined, 'name')).toEqual([])
    })

    it('returns empty array for empty array', () => {
        expect(sortBy([], 'name')).toEqual([])
    })

    it('sorts by single string path', () => {
        const list = [{ name: 'Charlie' }, { name: 'Alice' }, { name: 'Bob' }]
        expect(sortBy(list, 'name')).toEqual([
            { name: 'Alice' },
            { name: 'Bob' },
            { name: 'Charlie' },
        ])
    })

    it('sorts by numeric values', () => {
        const list = [{ age: 30 }, { age: 10 }, { age: 20 }]
        expect(sortBy(list, 'age')).toEqual([{ age: 10 }, { age: 20 }, { age: 30 }])
    })

    it('sorts by nested dot-notation path', () => {
        const list = [
            { user: { name: 'Charlie' } },
            { user: { name: 'Alice' } },
            { user: { name: 'Bob' } },
        ]
        expect(sortBy(list, 'user.name')).toEqual([
            { user: { name: 'Alice' } },
            { user: { name: 'Bob' } },
            { user: { name: 'Charlie' } },
        ])
    })

    it('sorts by multiple paths (tiebreaker)', () => {
        const list = [
            { group: 'A', name: 'Zara' },
            { group: 'A', name: 'Alice' },
            { group: 'B', name: 'Bob' },
        ]
        expect(sortBy(list, ['group', 'name'])).toEqual([
            { group: 'A', name: 'Alice' },
            { group: 'A', name: 'Zara' },
            { group: 'B', name: 'Bob' },
        ])
    })

    it('pushes null/undefined values to end', () => {
        const list = [{ name: null }, { name: 'Alice' }, { name: undefined }, { name: 'Bob' }]
        const result = sortBy(list, 'name')
        expect(result[0]).toEqual({ name: 'Alice' })
        expect(result[1]).toEqual({ name: 'Bob' })
    })

    it('does not mutate original array', () => {
        const list = [{ name: 'B' }, { name: 'A' }]
        const original = [...list]
        sortBy(list, 'name')
        expect(list).toEqual(original)
    })

    it('handles missing nested paths gracefully', () => {
        const list = [{ a: { b: 1 } }, { a: {} }, { a: { b: 3 } }]
        const result = sortBy(list, 'a.b')
        expect(result[0]).toEqual({ a: { b: 1 } })
        expect(result[1]).toEqual({ a: { b: 3 } })
        // missing path treated as undefined, pushed to end
        expect(result[2]).toEqual({ a: {} })
    })
})
