import type { SystemDetail } from '@/modules/shared/system/system-detail'

import { hasPhysicalItem, hasSpareFor, hasSpareParts } from '../predicates'

const statistics = (
    overrides: Partial<SystemDetail['statistics']>,
): SystemDetail['statistics'] => ({
    subsystemsCount: 0,
    directSubsystemsCount: 0,
    sparePartsCount: 0,
    sparesForCount: 0,
    minimalSpareParstCount: null,
    sparePartsCoverageSum: null,
    sp_coverage: null,
    ...overrides,
})

describe('hasPhysicalItem', () => {
    it('true when system.physicalItem is set', () => {
        expect(
            hasPhysicalItem({ physicalItem: { uid: 'p' } as SystemDetail['physicalItem'] }),
        ).toBe(true)
    })

    it('false when physicalItem is null', () => {
        expect(hasPhysicalItem({ physicalItem: null })).toBe(false)
    })
})

describe('hasSpareParts', () => {
    it.each([
        [1, true],
        [5, true],
        [0, false],
    ])('sparePartsCount %p -> %p', (count, expected) => {
        expect(
            hasSpareParts({
                physicalItem: null,
                statistics: statistics({ sparePartsCount: count }),
            }),
        ).toBe(expected)
    })
})

describe('hasSpareFor', () => {
    it.each([
        [1, true],
        [0, false],
    ])('sparesForCount %p -> %p', (count, expected) => {
        expect(
            hasSpareFor({ physicalItem: null, statistics: statistics({ sparesForCount: count }) }),
        ).toBe(expected)
    })
})
