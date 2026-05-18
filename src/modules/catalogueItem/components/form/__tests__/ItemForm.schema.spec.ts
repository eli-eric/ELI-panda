import { catalogueItemSchema, isCodebookType } from '../ItemForm.schema'

const validCategory = { uid: 'c', name: 'Cat' }

const baseValid = {
    name: 'Widget',
    catalogueNumber: 'PN-1',
    category: validCategory,
}

describe('catalogueItemSchema', () => {
    it('accepts minimal payload with required fields', () => {
        expect(catalogueItemSchema.safeParse(baseValid).success).toBe(true)
    })

    it('trims and rejects whitespace-only name', () => {
        const r = catalogueItemSchema.safeParse({ ...baseValid, name: '   ' })
        expect(r.success).toBe(false)
        if (!r.success) {
            expect(r.error.issues.some(i => i.message === 'Name is required')).toBe(true)
        }
    })

    it('rejects empty catalogueNumber', () => {
        const r = catalogueItemSchema.safeParse({ ...baseValid, catalogueNumber: '' })
        expect(r.success).toBe(false)
        if (!r.success) {
            expect(r.error.issues.some(i => i.message === 'Part Number is required')).toBe(true)
        }
    })

    it('rejects null category with message', () => {
        const r = catalogueItemSchema.safeParse({ ...baseValid, category: null })
        expect(r.success).toBe(false)
        if (!r.success) {
            expect(r.error.issues.some(i => i.message === 'Category is required')).toBe(true)
        }
    })

    it('accepts nullable supplier', () => {
        expect(
            catalogueItemSchema.safeParse({ ...baseValid, supplier: null }).success,
        ).toBe(true)
    })

    it('accepts optional details record indexed by property uid', () => {
        const detail = {
            property: { uid: 'p', name: 'Prop', type: { uid: 't', name: 'String' } },
            propertyGroup: 'main',
            value: 'foo',
        }
        const r = catalogueItemSchema.safeParse({
            ...baseValid,
            details: { p: detail },
        })
        expect(r.success).toBe(true)
    })

    it('rejects malformed detail (missing propertyGroup)', () => {
        const detail = {
            property: { uid: 'p', name: 'Prop', type: { uid: 't', name: 'String' } },
            value: 'foo',
        }
        const r = catalogueItemSchema.safeParse({
            ...baseValid,
            details: { p: detail as any },
        })
        expect(r.success).toBe(false)
    })
})

describe('isCodebookType', () => {
    it('accepts objects with uid + name', () => {
        expect(isCodebookType({ uid: 'a', name: 'b' })).toBe(true)
    })

    it('rejects null/undefined/primitives', () => {
        expect(isCodebookType(null)).toBe(false)
        expect(isCodebookType(undefined)).toBe(false)
        expect(isCodebookType('string')).toBe(false)
        expect(isCodebookType(42)).toBe(false)
    })

    it('rejects partial objects', () => {
        expect(isCodebookType({ uid: 'a' })).toBe(false)
        expect(isCodebookType({ name: 'b' })).toBe(false)
        expect(isCodebookType({})).toBe(false)
    })
})
