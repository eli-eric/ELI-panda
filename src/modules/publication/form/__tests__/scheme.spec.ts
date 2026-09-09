import { publicationResolver } from '../resolver'
import {
    createPublicationOtherSchema,
    createPublicationPeerReviewedSchema,
    publicationOtherSchema,
    publicationPeerReviewedSchema,
} from '../scheme'

const validCodebook = { uid: 'test-uid', name: 'Test Name', code: 'T' }

const validResearcher = { uid: 'r-1', firstName: 'John', lastName: 'Doe' }

const baseValidData = {
    eliPublication: 'YES',
    code: 'PUB-001',
    title: 'Test Publication',
    allAuthors: 'Author A, Author B',
    allAuthorsCount: 2,
    eliAuthors: 'Author A',
    eliResearchers: [validResearcher],
    eliAuthorsCount: 1,
    longJournalTitle: 'Journal of Testing',
    pages: '1-10',
    pagesCount: 10,
    citeAs: 'Author A et al. (2024)',
    yearOfPublication: '2024',
    dateOfPublication: '2024-01-01',
    abstract: 'Test abstract',
    keywords: 'test, publication',
    openAccessType: validCodebook,
    publishingCountry: validCodebook,
    mediaTypeCb: validCodebook,
}

const peerReviewedData = {
    ...baseValidData,
    doi: '10.1234/test',
    volume: 1,
    oecdFord: '1.1',
}

describe('publicationPeerReviewedSchema', () => {
    it('validates correct peer-reviewed data', () => {
        const result = publicationPeerReviewedSchema.safeParse(peerReviewedData)
        expect(result.success).toBe(true)
    })

    it('returns user-friendly error when openAccessType is null', () => {
        const result = publicationPeerReviewedSchema.safeParse({
            ...peerReviewedData,
            openAccessType: null,
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            const issue = result.error.issues.find(i => i.path.includes('openAccessType'))
            expect(issue?.message).toBe('Open Access Type is required')
        }
    })

    it('returns user-friendly error when publishingCountry is null', () => {
        const result = publicationPeerReviewedSchema.safeParse({
            ...peerReviewedData,
            publishingCountry: null,
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            const issue = result.error.issues.find(i => i.path.includes('publishingCountry'))
            expect(issue?.message).toBe('Publishing Country is required')
        }
    })

    it('returns user-friendly error when mediaTypeCb is null', () => {
        const result = publicationPeerReviewedSchema.safeParse({
            ...peerReviewedData,
            mediaTypeCb: null,
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            const issue = result.error.issues.find(i => i.path.includes('mediaTypeCb'))
            expect(issue?.message).toBe('Media Type is required')
        }
    })

    it('does not include deprecated mediaType field', () => {
        const shape = publicationPeerReviewedSchema.shape
        expect(shape).not.toHaveProperty('mediaType')
    })

    it('does not include deprecated experimentalSystem field', () => {
        const shape = publicationPeerReviewedSchema.shape
        expect(shape).not.toHaveProperty('experimentalSystem')
    })

    it('does not include deprecated userExperiment field', () => {
        const shape = publicationPeerReviewedSchema.shape
        expect(shape).not.toHaveProperty('userExperiment')
    })

    it('does not include deprecated grant field', () => {
        const shape = publicationPeerReviewedSchema.shape
        expect(shape).not.toHaveProperty('grant')
    })

    it('requires DOI for peer-reviewed articles', () => {
        const result = publicationPeerReviewedSchema.safeParse({
            ...peerReviewedData,
            doi: '',
        })
        expect(result.success).toBe(false)
    })

    it.each([
        'https://doi.org/10.1234/Test',
        'not-a-doi',
        '10.123/test',
        '10.1234/with space',
        '10.1234/literal%20',
    ])('keeps legacy peer-reviewed DOI %s editable', doi => {
        const result = createPublicationPeerReviewedSchema(doi).safeParse({
            ...peerReviewedData,
            doi,
            abstract: 'Updated abstract',
        })
        expect(result.success).toBe(true)
        if (result.success) expect(result.data.doi).toBe(doi)
    })

    it('requires a four-digit publication year', () => {
        const result = publicationPeerReviewedSchema.safeParse({
            ...peerReviewedData,
            yearOfPublication: '26',
        })
        expect(result.success).toBe(false)
    })

    it('requires volume for peer-reviewed articles', () => {
        const result = publicationPeerReviewedSchema.safeParse({
            ...peerReviewedData,
            volume: '',
        })
        expect(result.success).toBe(false)
    })
})

describe('publicationOtherSchema', () => {
    it('validates correct other article data', () => {
        const result = publicationOtherSchema.safeParse(baseValidData)
        expect(result.success).toBe(true)
    })

    it('allows null DOI for other articles', () => {
        const result = publicationOtherSchema.safeParse({
            ...baseValidData,
            doi: null,
        })
        expect(result.success).toBe(true)
    })

    it.each(['', 'not-a-doi', '10.123/test', '10.1234/with space'])(
        'keeps legacy optional DOI %s editable',
        doi => {
            expect(
                createPublicationOtherSchema(doi).safeParse({ ...baseValidData, doi }).success,
            ).toBe(true)
        },
    )

    it('requires a four-digit publication year', () => {
        const result = publicationOtherSchema.safeParse({
            ...baseValidData,
            yearOfPublication: '20261',
        })
        expect(result.success).toBe(false)
    })

    it('allows null volume for other articles', () => {
        const result = publicationOtherSchema.safeParse({
            ...baseValidData,
            volume: null,
        })
        expect(result.success).toBe(true)
    })

    it('returns user-friendly error when openAccessType is null', () => {
        const result = publicationOtherSchema.safeParse({
            ...baseValidData,
            openAccessType: null,
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            const issue = result.error.issues.find(i => i.path.includes('openAccessType'))
            expect(issue?.message).toBe('Open Access Type is required')
        }
    })

    it('returns user-friendly error when mediaTypeCb is null', () => {
        const result = publicationOtherSchema.safeParse({
            ...baseValidData,
            mediaTypeCb: null,
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            const issue = result.error.issues.find(i => i.path.includes('mediaTypeCb'))
            expect(issue?.message).toBe('Media Type is required')
        }
    })

    it('does not include deprecated fields', () => {
        const shape = publicationOtherSchema.shape
        expect(shape).not.toHaveProperty('mediaType')
        expect(shape).not.toHaveProperty('experimentalSystem')
        expect(shape).not.toHaveProperty('userExperiment')
        expect(shape).not.toHaveProperty('grant')
    })
})

describe('DOI validation with a persisted original', () => {
    it.each(['not-a-doi', '10.123/test', '10.1234/with space'])(
        'rejects new or changed malformed DOI %s in both forms',
        doi => {
            expect(
                publicationPeerReviewedSchema.safeParse({ ...peerReviewedData, doi }).success,
            ).toBe(false)
            expect(publicationOtherSchema.safeParse({ ...baseValidData, doi }).success).toBe(false)
            expect(
                createPublicationPeerReviewedSchema('older invalid DOI').safeParse({
                    ...peerReviewedData,
                    doi,
                }).success,
            ).toBe(false)
            expect(
                createPublicationOtherSchema('older invalid DOI').safeParse({
                    ...baseValidData,
                    doi,
                }).success,
            ).toBe(false)
        },
    )
    it('requires an exact match to the persisted original', () => {
        const schema = createPublicationOtherSchema('legacy DOI')
        expect(
            schema.safeParse({ ...baseValidData, doi: 'legacy DOI', title: 'Edited title' })
                .success,
        ).toBe(true)
        expect(schema.safeParse({ ...baseValidData, doi: 'Legacy DOI' }).success).toBe(false)
        expect(schema.safeParse({ ...baseValidData, doi: 'legacy DOI ' }).success).toBe(false)
    })
    it.each(['10.1234/MixedCase', 'https://doi.org/10.1234/MixedCase', '10.1234/literal%20'])(
        'accepts a corrected DOI without rewriting %s',
        doi => {
            const result = createPublicationPeerReviewedSchema('legacy DOI').safeParse({
                ...peerReviewedData,
                doi,
            })
            expect(result.success).toBe(true)
            if (result.success) expect(result.data.doi).toBe(doi)
        },
    )
    it('uses a save-context error and keeps optional DOI empty', () => {
        const result = publicationOtherSchema.safeParse({ ...baseValidData, doi: 'invalid' })
        expect(result.success).toBe(false)
        if (!result.success) {
            const issue = result.error.issues.find(issue => issue.path[0] === 'doi')
            expect(issue?.message).toBe('Enter a DOI in the form 10.1234/suffix.')
        }
        expect(publicationOtherSchema.safeParse({ ...baseValidData, doi: '' }).success).toBe(true)
        expect(
            createPublicationPeerReviewedSchema('').safeParse({ ...peerReviewedData, doi: '' })
                .success,
        ).toBe(false)
    })
})

describe('publication resolver edit context', () => {
    const options = { fields: {}, shouldUseNativeValidation: false }
    it.each([
        {
            ...peerReviewedData,
            mediaTypeCb: { uid: 'journal', code: 'J', name: 'Journal article' },
        },
        baseValidData,
    ])('passes the persisted DOI to the selected media schema', async data => {
        const values = { ...data, doi: 'legacy DOI', title: 'Unrelated edit' }
        const edited = await publicationResolver(values, { originalDoi: 'legacy DOI' }, options)
        expect(edited.errors).toEqual({})
        expect(edited.values).toMatchObject({ doi: 'legacy DOI', title: 'Unrelated edit' })
        const created = await publicationResolver(values, undefined, options)
        expect(created.errors.doi).toBeDefined()
        const changed = await publicationResolver(
            values,
            { originalDoi: 'another legacy DOI' },
            options,
        )
        expect(changed.errors.doi).toBeDefined()
    })
})
