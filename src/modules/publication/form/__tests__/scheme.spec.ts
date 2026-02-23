import {
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
            const issue = result.error.issues.find(i =>
                i.path.includes('openAccessType'),
            )
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
            const issue = result.error.issues.find(i =>
                i.path.includes('publishingCountry'),
            )
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
            const issue = result.error.issues.find(i =>
                i.path.includes('mediaTypeCb'),
            )
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
            const issue = result.error.issues.find(i =>
                i.path.includes('openAccessType'),
            )
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
            const issue = result.error.issues.find(i =>
                i.path.includes('mediaTypeCb'),
            )
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
