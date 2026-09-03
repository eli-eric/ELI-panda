import { zoneSchema } from '../form/zone-form.schema'

describe('zoneSchema', () => {
    const validData = { name: 'Zone A', code: 'Z-001', parentUid: null, notes: 'Some notes' }

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

    it('accepts null notes', () => {
        const result = zoneSchema.safeParse({ ...validData, notes: null })
        expect(result.success).toBe(true)
    })

    it('accepts undefined notes', () => {
        const result = zoneSchema.safeParse({ ...validData, notes: undefined })
        expect(result.success).toBe(true)
    })

    it('accepts empty string notes', () => {
        const result = zoneSchema.safeParse({ ...validData, notes: '' })
        expect(result.success).toBe(true)
    })

    describe('defaultParentSystem', () => {
        it('accepts a full codebook object', () => {
            const result = zoneSchema.safeParse({
                ...validData,
                defaultParentSystem: { uid: 'sys-1', name: '01 - L1 laser system', code: 'PLC01-001' },
            })
            expect(result.success).toBe(true)
            if (result.success) {
                expect(result.data.defaultParentSystem?.uid).toBe('sys-1')
            }
        })

        it('accepts an object without a code — migrated systems have none', () => {
            const result = zoneSchema.safeParse({
                ...validData,
                defaultParentSystem: { uid: 'sys-2', name: 'Legacy system' },
            })
            expect(result.success).toBe(true)
        })

        it('accepts an explicit null code', () => {
            const result = zoneSchema.safeParse({
                ...validData,
                defaultParentSystem: { uid: 'sys-3', name: 'Legacy system', code: null },
            })
            expect(result.success).toBe(true)
        })

        it('accepts null', () => {
            const result = zoneSchema.safeParse({ ...validData, defaultParentSystem: null })
            expect(result.success).toBe(true)
            if (result.success) {
                expect(result.data.defaultParentSystem).toBeNull()
            }
        })

        it('accepts undefined', () => {
            const result = zoneSchema.safeParse({ ...validData, defaultParentSystem: undefined })
            expect(result.success).toBe(true)
        })

        it('rejects an object missing uid', () => {
            const result = zoneSchema.safeParse({
                ...validData,
                defaultParentSystem: { name: 'No uid' },
            })
            expect(result.success).toBe(false)
        })

        it('rejects a bare uid string', () => {
            const result = zoneSchema.safeParse({ ...validData, defaultParentSystem: 'sys-1' })
            expect(result.success).toBe(false)
        })
    })
})
