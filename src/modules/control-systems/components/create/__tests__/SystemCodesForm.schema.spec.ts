import { systemCodesFormSchema } from '../SystemCodesForm.schema'

describe('systemCodesFormSchema', () => {
    const validData = {
        zone: { uid: 'zone-1', name: 'Zone A' },
        systemType: { uid: 'type-1', name: 'Type A' },
        batch: 5,
    }

    it('validates correct data', () => {
        const result = systemCodesFormSchema.safeParse(validData)
        expect(result.success).toBe(true)
    })

    it('requires zone to be provided', () => {
        const result = systemCodesFormSchema.safeParse({
            ...validData,
            zone: null,
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Zone is required')
        }
    })

    it('requires systemType to be provided', () => {
        const result = systemCodesFormSchema.safeParse({
            ...validData,
            systemType: null,
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('System type is required')
        }
    })

    it('requires batch to be at least 1', () => {
        const result = systemCodesFormSchema.safeParse({
            ...validData,
            batch: 0,
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Batch must be at least 1')
        }
    })

    it('requires batch to not exceed 100', () => {
        const result = systemCodesFormSchema.safeParse({
            ...validData,
            batch: 101,
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Batch cannot exceed 100')
        }
    })

    it('coerces string batch to number', () => {
        const result = systemCodesFormSchema.safeParse({
            ...validData,
            batch: '10',
        })
        expect(result.success).toBe(true)
        if (result.success) {
            expect(result.data.batch).toBe(10)
        }
    })
})
