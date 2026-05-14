import {
    COL_SIZES,
    HORIZONTAL_SPACING_CLASSES,
    LG_COL_SIZES,
    MD_COL_SIZES,
    VERTICAL_SPACING_CLASSES,
} from '../ColSizes'

describe('COL_SIZES', () => {
    it('has entries for 1..12 + full', () => {
        for (let i = 1; i <= 12; i++) {
            expect(COL_SIZES[i as keyof typeof COL_SIZES]).toBe(`col-span-${i}`)
        }
        expect(COL_SIZES.full).toBe('col-span-full')
    })
})

describe('MD_COL_SIZES + LG_COL_SIZES', () => {
    it('prefixes md: + lg: respectively', () => {
        expect(MD_COL_SIZES[1]).toBe('md:col-span-1')
        expect(MD_COL_SIZES[6]).toBe('md:col-span-6')
        expect(MD_COL_SIZES.full).toBe('md:col-span-full')
        expect(LG_COL_SIZES[12]).toBe('lg:col-span-12')
        expect(LG_COL_SIZES.full).toBe('lg:col-span-full')
    })
})

describe('VERTICAL_SPACING_CLASSES', () => {
    it('exposes gap-y-N entries', () => {
        expect(VERTICAL_SPACING_CLASSES[1]).toBe('gap-y-1')
        expect(VERTICAL_SPACING_CLASSES[4]).toBe('gap-y-4')
        expect(VERTICAL_SPACING_CLASSES[12]).toBe('gap-y-12')
    })

    it('skips 7, 9, 11 (only 1..6, 8, 10, 12 supported)', () => {
        const keys = Object.keys(VERTICAL_SPACING_CLASSES)
        expect(keys.length).toBe(9)
        expect(keys).not.toContain('7')
        expect(keys).not.toContain('9')
        expect(keys).not.toContain('11')
    })
})

describe('HORIZONTAL_SPACING_CLASSES', () => {
    it('exposes gap-x-N entries 1..6 + 8', () => {
        expect(HORIZONTAL_SPACING_CLASSES[1]).toBe('gap-x-1')
        expect(HORIZONTAL_SPACING_CLASSES[8]).toBe('gap-x-8')
        const keys = Object.keys(HORIZONTAL_SPACING_CLASSES)
        expect(keys.length).toBe(7)
    })
})
