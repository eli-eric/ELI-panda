import { zoneSchema } from '../form/zone-form.schema'

describe('zoneSchema', () => {
    const validData = { name: 'Zone A', code: 'Z-001', parentUid: null }

    it('validates correct data', () => {
        const result = zoneSchema.safeParse(validData)
        expect(result.success).toBe(true)
    })

    it('validates data with parentUid', () => {
        const result = zoneSchema.safeParse({
            ...validData,
            parentUid: 'some-uid-123',
        })
        expect(result.success).toBe(true)
    })

    it('validates data without parentUid', () => {
        const result = zoneSchema.safeParse({ name: 'Zone', code: 'Z1' })
        expect(result.success).toBe(true)
    })

    it('rejects empty name', () => {
        const result = zoneSchema.safeParse({ ...validData, name: '' })
        expect(result.success).toBe(false)
        if (!result.success) {
            const issue = result.error.issues.find(i => i.path.includes('name'))
            expect(issue).toBeDefined()
        }
    })

    it('rejects missing name', () => {
        const result = zoneSchema.safeParse({ code: 'Z-001', parentUid: null })
        expect(result.success).toBe(false)
    })

    it('rejects empty code', () => {
        const result = zoneSchema.safeParse({ ...validData, code: '' })
        expect(result.success).toBe(false)
        if (!result.success) {
            const issue = result.error.issues.find(i => i.path.includes('code'))
            expect(issue).toBeDefined()
        }
    })

    it('rejects missing code', () => {
        const result = zoneSchema.safeParse({ name: 'Zone A', parentUid: null })
        expect(result.success).toBe(false)
    })

    it('accepts null parentUid', () => {
        const result = zoneSchema.safeParse({ ...validData, parentUid: null })
        expect(result.success).toBe(true)
        if (result.success) {
            expect(result.data.parentUid).toBeNull()
        }
    })

    it('accepts undefined parentUid', () => {
        const result = zoneSchema.safeParse({ ...validData, parentUid: undefined })
        expect(result.success).toBe(true)
    })
})
