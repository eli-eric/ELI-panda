import { MEDIA_TYPE_CODE } from '../../types/constants'
import { publicationResolver } from '../resolver'
import { publicationOtherSchema, publicationPeerReviewedSchema } from '../scheme'

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
        '10.1234/trailing-space ',
    ])('keeps legacy peer-reviewed DOI %s editable', doi => {
        const result = publicationPeerReviewedSchema.safeParse({
            ...peerReviewedData,
            doi,
            abstract: 'Updated abstract',
        })
        expect(result.success).toBe(true)
        if (result.success) expect(result.data.doi).toBe(doi)
    })

    it('requires a publication year', () => {
        const result = publicationPeerReviewedSchema.safeParse({
            ...peerReviewedData,
            yearOfPublication: '',
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
            expect(publicationOtherSchema.safeParse({ ...baseValidData, doi }).success).toBe(true)
        },
    )

    it('requires a publication year', () => {
        const result = publicationOtherSchema.safeParse({
            ...baseValidData,
            yearOfPublication: '',
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

describe('legacy publication values', () => {
    it.each(['1998', '26', '0000', '2024 ', 'unknown'])(
        'preserves publication year %s in both schemas',
        yearOfPublication => {
            for (const schema of [publicationPeerReviewedSchema, publicationOtherSchema]) {
                const result = schema.safeParse({ ...peerReviewedData, yearOfPublication })
                expect(result.success).toBe(true)
                if (result.success) expect(result.data.yearOfPublication).toBe(yearOfPublication)
            }
        },
    )

    it.each(['Legacy DOI', 'legacy DOI ', '10.1234/with space'])(
        'allows DOI corrections without a persisted-original exemption: %s',
        doi => {
            for (const schema of [publicationPeerReviewedSchema, publicationOtherSchema]) {
                const result = schema.safeParse({ ...peerReviewedData, doi, title: 'Edited title' })
                expect(result.success).toBe(true)
                if (result.success) expect(result.data.doi).toBe(doi)
            }
        },
    )
})

describe('publication resolver', () => {
    const options = { fields: {}, shouldUseNativeValidation: false }
    const journal = { uid: 'journal', code: 'J', name: 'Journal article' }

    it.each([journal, validCodebook])(
        'preserves legacy DOI values without edit context',
        async mediaTypeCb => {
            const values = {
                ...peerReviewedData,
                mediaTypeCb,
                doi: 'legacy DOI ',
                title: 'Unrelated edit',
            }
            const result = await publicationResolver(values, undefined, options)
            expect(result.errors).toEqual({})
            expect(result.values).toMatchObject({ doi: 'legacy DOI ', title: 'Unrelated edit' })
        },
    )

    it('requires DOI only for the peer-reviewed media schema', async () => {
        const values = { ...peerReviewedData, doi: '' }
        const peerReviewed = await publicationResolver(
            { ...values, mediaTypeCb: journal },
            undefined,
            options,
        )
        expect(peerReviewed.errors).toHaveProperty('doi.message', 'DOI is required')
        const other = await publicationResolver(values, undefined, options)
        expect(other.errors).toEqual({})
    })

    it.each([
        [MEDIA_TYPE_CODE.PeerReviewedArticle, true],
        [MEDIA_TYPE_CODE.OtherArticle, false],
    ])('uses the legacy radio selection %s without a codebook', async (mediaType, requiresDoi) => {
        const values = { ...peerReviewedData, doi: '', mediaType, mediaTypeCb: undefined }
        const result = await publicationResolver(values, undefined, options)
        expect('doi' in result.errors).toBe(requiresDoi)
        expect(result.errors).toHaveProperty('mediaTypeCb')
    })

    it.each([
        [journal, MEDIA_TYPE_CODE.OtherArticle, true],
        [validCodebook, MEDIA_TYPE_CODE.PeerReviewedArticle, false],
    ])(
        'prefers the codebook over an obsolete radio selection',
        async (mediaTypeCb, mediaType, requiresDoi) => {
            const values = { ...peerReviewedData, doi: '', mediaTypeCb, mediaType }
            const result = await publicationResolver(values, undefined, options)
            expect('doi' in result.errors).toBe(requiresDoi)
        },
    )
})
