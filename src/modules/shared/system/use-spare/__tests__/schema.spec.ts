import { spareAssignmentSchema } from '../schema'

const validBase = {
    oldItemCondition: { uid: 'c1', name: 'OK' },
    newItemLocation: { uid: 'l1', name: 'L' },
    autoAssignParent: true,
}

describe('spareAssignmentSchema', () => {
    it('valid: autoAssignParent=true → newParentSystemUid optional', () => {
        const out = spareAssignmentSchema.safeParse(validBase)
        expect(out.success).toBe(true)
    })

    it('valid: autoAssignParent=false with newParentSystemUid provided', () => {
        const out = spareAssignmentSchema.safeParse({
            ...validBase,
            autoAssignParent: false,
            newParentSystemUid: 'p-1',
        })
        expect(out.success).toBe(true)
    })

    it('invalid: autoAssignParent=false without newParentSystemUid', () => {
        const out = spareAssignmentSchema.safeParse({
            ...validBase,
            autoAssignParent: false,
        })
        expect(out.success).toBe(false)
        if (!out.success) {
            expect(out.error.issues[0].path).toEqual(['newParentSystemUid'])
        }
    })

    it('invalid: missing oldItemCondition', () => {
        const { oldItemCondition: _, ...rest } = validBase
        const out = spareAssignmentSchema.safeParse(rest)
        expect(out.success).toBe(false)
    })

    it('invalid: oldItemCondition missing uid', () => {
        const out = spareAssignmentSchema.safeParse({
            ...validBase,
            oldItemCondition: { name: 'X' },
        })
        expect(out.success).toBe(false)
    })

    it('codebook accepts optional code + description', () => {
        const out = spareAssignmentSchema.safeParse({
            ...validBase,
            oldItemCondition: { uid: 'c', name: 'OK', code: 'CC', description: 'D' },
        })
        expect(out.success).toBe(true)
    })
})
