import type { WosLookupResponse } from '../../src/modules/publication/wos-import/types/wos-preview.types'

export const PUBLICATION_DOI = '10.1234/example.article'
export const PUBLICATION_DOI_URL_INPUT = 'https://doi.org/10.1234/EXAMPLE.Article'

/** `GET /v1/publications/wos/lookup` answer — same shape as the #438 shared fixture. */
export const PUBLICATION_WOS_LOOKUP: WosLookupResponse = {
    status: 'found',
    doi: PUBLICATION_DOI,
    wosUid: 'WOS:000012345678900',
    recordUrl: 'https://www.webofscience.com/wos/woscc/full-record/WOS:000012345678900',
    values: {
        doi: PUBLICATION_DOI,
        title: 'Metadata title returned by Web of Science',
        allAuthors: 'Ada Lovelace; Hopper, Grace; Duplicate Person',
        allAuthorsCount: 3,
        longJournalTitle: 'Journal of Deterministic Tests',
        volume: 42,
        issue: 7,
        pages: '101-110',
        pagesCount: 10,
        yearOfPublication: '2022',
        dateOfPublication: '2022-05',
        keywords: 'laser acceleration; plasma physics',
        wosNumber: 'WOS:000012345678900',
        issn: '1234-5678',
        webLink: 'https://www.webofscience.com/wos/woscc/full-record/WOS:000012345678900',
    },
    authors: [
        {
            sourceIndex: 0,
            displayName: 'Ada Lovelace',
            researcherId: 'A-0001-2020',
            match: {
                kind: 'researcher-id',
                confidence: 'EXACT_ID',
                knownResearcherId: true,
                candidates: [
                    { uid: 'researcher-ada-lovelace', firstName: 'Ada', lastName: 'Lovelace' },
                ],
            },
        },
        {
            sourceIndex: 1,
            displayName: 'Hopper, Grace',
            researcherId: 'A-0002-2020',
            match: {
                kind: 'name',
                confidence: 'NAME',
                knownResearcherId: false,
                candidates: [
                    { uid: 'researcher-grace-hopper', firstName: 'Grace', lastName: 'Hopper' },
                ],
            },
        },
        {
            sourceIndex: 2,
            displayName: 'Duplicate Person',
            researcherId: 'A-0003-2020',
            match: {
                kind: 'ambiguous',
                confidence: 'AMBIGUOUS',
                knownResearcherId: false,
                candidates: [
                    {
                        uid: 'researcher-duplicate-person-1',
                        firstName: 'Duplicate',
                        lastName: 'Person',
                    },
                    {
                        uid: 'researcher-duplicate-person-2',
                        firstName: 'Duplicate',
                        lastName: 'Person',
                    },
                ],
            },
        },
    ],
    missingImportableFields: ['eissn', 'isbn', 'mediaTypeCb'],
    unavailableFields: [
        'abstract',
        'openAccessType',
        'publishingCountry',
        'oecdFord',
        'impactFactor',
        'quartil',
        'authorsDepartments',
        'grants',
        'code',
    ],
    warnings: [],
}
