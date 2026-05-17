import { grantSchema } from '../grant-form.schema'

describe('grantSchema', () => {
    const valid = { code: 'G-1', name: 'Grant One' }

    it('accepts a minimal valid grant', () => {
        expect(grantSchema.safeParse(valid).success).toBe(true)
    })

    it('rejects empty code', () => {
        const r = grantSchema.safeParse({ ...valid, code: '' })
        expect(r.success).toBe(false)
        if (!r.success) {
            expect(r.error.issues.some(i => i.message === 'Code is required')).toBe(true)
        }
    })

    it('rejects empty name', () => {
        expect(grantSchema.safeParse({ ...valid, name: '' }).success).toBe(false)
    })

    it('accepts nullable grantGroup', () => {
        expect(grantSchema.safeParse({ ...valid, grantGroup: null }).success).toBe(true)
    })

    it('accepts a valid grantGroup codebook', () => {
        expect(
            grantSchema.safeParse({ ...valid, grantGroup: { uid: 'g', name: 'Group' } }).success,
        ).toBe(true)
    })

    it('rejects grantGroup missing uid', () => {
        const r = grantSchema.safeParse({ ...valid, grantGroup: { name: 'Group' } as any })
        expect(r.success).toBe(false)
    })
})
