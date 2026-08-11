import { getPathBelow } from '../relativePath'

const path = [
    { uid: 'root', name: 'Facility' },
    { uid: 'x', name: 'Beamline X' },
    { uid: 'a', name: 'Chamber A' },
    { uid: 'b', name: 'Module B' },
]

describe('getPathBelow', () => {
    it('drops everything up to and including the selected node', () => {
        // Breadcrumbs already show Facility › Beamline X, so the row need not repeat it.
        expect(getPathBelow(path, 'x')).toEqual([
            { uid: 'a', name: 'Chamber A' },
            { uid: 'b', name: 'Module B' },
        ])
    })

    it('returns nothing when the system hangs directly off the selected node', () => {
        expect(getPathBelow(path, 'b')).toEqual([])
    })

    it('returns the whole path when the root itself is selected', () => {
        expect(getPathBelow(path, 'root')).toEqual(path.slice(1))
    })

    it('falls back to the full path when the selected node is not in it', () => {
        // Mismatched data or a stale cache mid-navigation. Showing too much beats
        // hiding where the system lives.
        expect(getPathBelow(path, 'somewhere-else')).toEqual(path)
    })

    it('falls back to the full path when no node is selected', () => {
        expect(getPathBelow(path, null)).toEqual(path)
        expect(getPathBelow(path, undefined)).toEqual(path)
    })

    it('handles an absent or empty path', () => {
        expect(getPathBelow(null, 'x')).toEqual([])
        expect(getPathBelow(undefined, 'x')).toEqual([])
        expect(getPathBelow([], 'x')).toEqual([])
    })

    it('does not mutate the input', () => {
        const input = [...path]
        getPathBelow(input, 'x')
        expect(input).toEqual(path)
    })
})
