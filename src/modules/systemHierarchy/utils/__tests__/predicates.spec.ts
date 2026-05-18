import type { SystemLeaf } from '../../types'
import { hasPhysicalItem, hasSpareFor, hasSpareParts } from '../predicates'

const leaf = (overrides: Partial<SystemLeaf>): SystemLeaf => ({ ...overrides } as any)

describe('hasPhysicalItem', () => {
    it('true when system.physicalItem is set', () => {
        expect(hasPhysicalItem(leaf({ physicalItem: { uid: 'p' } as any }))).toBe(true)
    })

    it('false when physicalItem is null/undefined', () => {
        expect(hasPhysicalItem(leaf({ physicalItem: undefined }))).toBe(false)
        expect(hasPhysicalItem(leaf({ physicalItem: null as any }))).toBe(false)
    })
})

describe('hasSpareParts', () => {
    it.each([
        [{ sparesIn: 1 }, true],
        [{ sparesIn: 5 }, true],
        [{ sparesIn: 0 }, false],
        [{ sparesIn: undefined }, false],
        [{}, false],
    ])('returns expected for %p', (input, expected) => {
        expect(hasSpareParts(leaf(input as any))).toBe(expected)
    })
})

describe('hasSpareFor', () => {
    it.each([
        [{ sparesOut: 1 }, true],
        [{ sparesOut: 0 }, false],
        [{ sparesOut: undefined }, false],
    ])('returns expected for %p', (input, expected) => {
        expect(hasSpareFor(leaf(input as any))).toBe(expected)
    })
})
