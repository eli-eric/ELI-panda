import { researcherSchema } from '../researcher-form.schema'

const baseValid = {
    firstName: 'Jan',
    lastName: 'Smith',
    orcid: '0000-0000-0000-0000',
}

describe('researcherSchema', () => {
    it('accepts payload with ORCID identifier', () => {
        expect(researcherSchema.safeParse(baseValid).success).toBe(true)
    })

    it('accepts payload with Scopus identifier', () => {
        expect(
            researcherSchema.safeParse({
                firstName: 'Jan',
                lastName: 'Smith',
                scopusId: 'S-1',
            }).success,
        ).toBe(true)
    })

    it('accepts payload with researcherId', () => {
        expect(
            researcherSchema.safeParse({
                firstName: 'Jan',
                lastName: 'Smith',
                researcherId: 'R-1',
            }).success,
        ).toBe(true)
    })

    it('rejects when all identifiers missing', () => {
        const r = researcherSchema.safeParse({ firstName: 'Jan', lastName: 'Smith' })
        expect(r.success).toBe(false)
        if (!r.success) {
            expect(
                r.error.issues.some(i =>
                    i.message?.toString().includes('At least one identifier is required'),
                ),
            ).toBe(true)
        }
    })

    it('rejects when all identifiers whitespace-only', () => {
        expect(
            researcherSchema.safeParse({
                ...baseValid,
                orcid: '   ',
                scopusId: '',
                researcherId: '',
            }).success,
        ).toBe(false)
    })

    it('rejects empty firstName / lastName', () => {
        expect(researcherSchema.safeParse({ ...baseValid, firstName: '' }).success).toBe(false)
        expect(researcherSchema.safeParse({ ...baseValid, lastName: '' }).success).toBe(false)
    })

    it('accepts nullable citizenship', () => {
        expect(
            researcherSchema.safeParse({ ...baseValid, citizenship: null }).success,
        ).toBe(true)
    })

    it('rejects citizenship missing uid', () => {
        const r = researcherSchema.safeParse({
            ...baseValid,
            citizenship: { name: 'CZ' } as any,
        })
        expect(r.success).toBe(false)
    })
})
