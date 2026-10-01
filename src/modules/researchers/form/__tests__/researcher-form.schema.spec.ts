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

    it('accepts a researcher who has no identifiers at all', () => {
        // Plenty of real people hold none of the three, and RIV keys authors on
        // the name plus identificationNumber, not on these.
        expect(researcherSchema.safeParse({ firstName: 'Jan', lastName: 'Smith' }).success).toBe(
            true,
        )
    })

    it('accepts a researcher whose identifiers are blank or whitespace', () => {
        expect(
            researcherSchema.safeParse({
                ...baseValid,
                orcid: '   ',
                scopusId: '',
                researcherId: '',
            }).success,
        ).toBe(true)
    })

    it('rejects empty firstName / lastName', () => {
        expect(researcherSchema.safeParse({ ...baseValid, firstName: '' }).success).toBe(false)
        expect(researcherSchema.safeParse({ ...baseValid, lastName: '' }).success).toBe(false)
    })

    it('accepts nullable citizenship', () => {
        expect(researcherSchema.safeParse({ ...baseValid, citizenship: null }).success).toBe(true)
    })

    it('rejects citizenship missing uid', () => {
        const r = researcherSchema.safeParse({
            ...baseValid,
            citizenship: { name: 'CZ' } as any,
        })
        expect(r.success).toBe(false)
    })
})
