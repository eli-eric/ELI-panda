import { SystemLevel } from '@/types/constants/systemLevel'

import { systemCreateSchema } from '../schema'

const baseValid = {
    name: 'Sys',
    systemLevel: SystemLevel.SubsystemsAndParts,
}

describe('systemCreateSchema', () => {
    it('accepts minimal valid payload', () => {
        expect(systemCreateSchema.safeParse(baseValid).success).toBe(true)
    })

    it('rejects empty name', () => {
        const r = systemCreateSchema.safeParse({ ...baseValid, name: '  ' })
        expect(r.success).toBe(false)
        if (!r.success) {
            expect(r.error.issues.some(i => i.message === 'Name is required')).toBe(true)
        }
    })

    it('rejects unknown systemLevel', () => {
        const r = systemCreateSchema.safeParse({ ...baseValid, systemLevel: 'NotALevel' as any })
        expect(r.success).toBe(false)
    })

    it('accepts nullable codebook fields', () => {
        expect(
            systemCreateSchema.safeParse({
                ...baseValid,
                systemType: null,
                zone: null,
                location: null,
                attribute: null,
                responsible: null,
            }).success,
        ).toBe(true)
    })
})
