import { SystemLevel } from '@/types/gql/graphql'

import { systemCreateSchema, systemUpdateSchema } from '../schema'

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

describe('systemUpdateSchema', () => {
    it('accepts update with arrays + physicalItem', () => {
        const r = systemUpdateSchema.safeParse({
            ...baseValid,
            operators: [{ uid: 'o', name: 'Op' }],
            maintainedBy: [{ uid: 'm', name: 'M' }],
            minimalSpareParstCount: 3,
            physicalItem: {
                uid: 'pi',
                serialNumber: 'SN1',
                conditionStatus: { uid: 'c', name: 'OK' },
            },
        })
        expect(r.success).toBe(true)
    })

    it('accepts physicalItem omitted/null', () => {
        expect(
            systemUpdateSchema.safeParse({ ...baseValid, physicalItem: null }).success,
        ).toBe(true)
        expect(systemUpdateSchema.safeParse(baseValid).success).toBe(true)
    })

    it('rejects malformed operators array entry', () => {
        const r = systemUpdateSchema.safeParse({
            ...baseValid,
            operators: [{ name: 'no-uid' } as any],
        })
        expect(r.success).toBe(false)
    })
})
