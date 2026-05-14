import { createItemSchema } from '../item-create-form.schema'

const fm = ({ id }: { id: string }) => id

const validBase = {
    name: 'Widget',
    catalogueNumber: 'PN-1',
    category: { uid: 'c', name: 'Cat' },
}

describe('createItemSchema (shared/catalogue create)', () => {
    const schema = createItemSchema(fm)

    it('accepts minimal valid payload', () => {
        expect(schema.safeParse(validBase).success).toBe(true)
    })

    it('rejects empty name', () => {
        expect(schema.safeParse({ ...validBase, name: '' }).success).toBe(false)
    })

    it('rejects name longer than 255 chars', () => {
        expect(schema.safeParse({ ...validBase, name: 'a'.repeat(256) }).success).toBe(false)
    })

    it('rejects empty catalogueNumber', () => {
        expect(schema.safeParse({ ...validBase, catalogueNumber: '' }).success).toBe(false)
    })

    it('rejects catalogueNumber longer than 100 chars', () => {
        expect(
            schema.safeParse({ ...validBase, catalogueNumber: 'a'.repeat(101) }).success,
        ).toBe(false)
    })

    it('rejects null category', () => {
        const r = schema.safeParse({ ...validBase, category: null })
        expect(r.success).toBe(false)
    })

    it('rejects category without uid', () => {
        const r = schema.safeParse({ ...validBase, category: { name: 'C' } as any })
        expect(r.success).toBe(false)
    })

    it('accepts boundary lengths', () => {
        expect(
            schema.safeParse({
                ...validBase,
                name: 'a'.repeat(255),
                catalogueNumber: 'a'.repeat(100),
            }).success,
        ).toBe(true)
    })
})
