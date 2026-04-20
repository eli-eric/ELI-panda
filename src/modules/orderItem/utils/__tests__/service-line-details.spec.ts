import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'

import { detailsToArray, detailsToObject } from '../service-line-details'

const makeDetail = (uid: string, value: unknown = 'v'): CatalogueItemDetail =>
    ({
        propertyGroup: 'g1',
        value,
        property: { uid, name: uid } as CatalogueItemDetail['property'],
    }) as CatalogueItemDetail

describe('detailsToObject', () => {
    it('returns empty object for undefined', () => {
        expect(detailsToObject(undefined)).toEqual({})
    })

    it('returns empty object for empty array', () => {
        expect(detailsToObject([])).toEqual({})
    })

    it('converts array to UID-keyed object', () => {
        const a = makeDetail('A', 1)
        const b = makeDetail('B', 2)
        expect(detailsToObject([a, b])).toEqual({ A: a, B: b })
    })

    it('skips entries without property.uid', () => {
        const valid = makeDetail('A')
        const invalid = { propertyGroup: 'g', value: 'x' } as CatalogueItemDetail
        expect(detailsToObject([valid, invalid])).toEqual({ A: valid })
    })

    it('last entry wins on duplicate UID', () => {
        const first = makeDetail('A', 'first')
        const second = makeDetail('A', 'second')
        expect(detailsToObject([first, second])).toEqual({ A: second })
    })

    it('passes through object input unchanged', () => {
        const obj = { A: makeDetail('A') }
        expect(detailsToObject(obj)).toBe(obj)
    })
})

describe('detailsToArray', () => {
    it('returns empty array for undefined', () => {
        expect(detailsToArray(undefined)).toEqual([])
    })

    it('returns empty array for empty object', () => {
        expect(detailsToArray({})).toEqual([])
    })

    it('passes through array input unchanged', () => {
        const arr = [makeDetail('A'), makeDetail('B')]
        expect(detailsToArray(arr)).toBe(arr)
    })

    it('converts UID-keyed object to array via Object.values', () => {
        const a = makeDetail('A')
        const b = makeDetail('B')
        const result = detailsToArray({ A: a, B: b })
        expect(result).toHaveLength(2)
        expect(result).toContain(a)
        expect(result).toContain(b)
    })
})

describe('detailsToArray ∘ detailsToObject round-trip', () => {
    it('preserves all items with unique UIDs', () => {
        const input = [makeDetail('A', 1), makeDetail('B', 2), makeDetail('C', 3)]
        const result = detailsToArray(detailsToObject(input))
        expect(result).toHaveLength(3)
        expect(result).toEqual(expect.arrayContaining(input))
    })
})
