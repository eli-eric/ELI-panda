import { renderHook } from '@testing-library/react'

import type { Publication } from '@/modules/publication/types/responses'
import { AllProvidersWrapper } from '@/testutils/wrappers/AllProvidersWrapper'

import type { PublicationFilterType } from '../../types/filter'
import { usePublicationsFilterFields } from '../PublicationsFilter.fields'

// Filter ids the API recognizes (eli-panda-api ApplyPublicationFilters, ELIPANDA-503).
const API_FILTER_IDS = {
    text: [
        'title', 'code', 'doi', 'allAuthors', 'eliAuthors', 'keywords', 'longJournalTitle',
        'shortJournalTitle', 'abstract', 'citeAs', 'wosNumber', 'issn', 'eissn', 'eidScopus',
        'oecdFord', 'note', 'otherGrants', 'webLink', 'publisher', 'publishPlace', 'isbn',
        'bookTitle', 'editionVolume', 'proceedingsIsbn', 'conferencePlace', 'pages',
    ],
    list: ['yearOfPublication', 'eliPublication', 'quartil', 'quartilBasis', 'language'],
    numericRange: [
        'impactFactor', 'allAuthorsCount', 'eliAuthorsCount', 'pagesCount', 'bookPagesCount',
        'volume', 'issue',
    ],
    dateRange: ['dateOfPublication', 'conferenceDate'],
    codebook: [
        'mediaTypeCb', 'openAccessType', 'publishingCountry', 'userCall', 'userExperimentCb',
        'experimentalSystemCb', 'publishFormatCb', 'conferenceScopeCb', 'grants',
        'eliResearchers', 'department',
    ],
}

// Filter ids that are not a property of the Publication response. The Record
// type fails to compile if a new sheet field is neither a Publication key nor
// listed here, so every unmapped id stays an explicit decision.
const UNMAPPED_IDS: Record<Exclude<keyof PublicationFilterType, keyof Publication>, string> = {
    department: 'derived from authorsDepartmentsArray, matched by department uid',
}

const renderFields = () =>
    renderHook(() => usePublicationsFilterFields(), { wrapper: AllProvidersWrapper }).result
        .current

describe('usePublicationsFilterFields', () => {
    it('uses exactly the API filter ids, once each', () => {
        const names = Object.values(renderFields()).map(field => field.name)

        expect(new Set(names).size).toBe(names.length)
        expect([...names].sort()).toEqual(Object.values(API_FILTER_IDS).flat().sort())
    })

    it('keeps ids that are not Publication properties recognized by the API', () => {
        const names = Object.values(renderFields()).map(field => field.name)

        Object.keys(UNMAPPED_IDS).forEach(id => {
            expect(names).toContain(id)
            expect(API_FILTER_IDS.codebook).toContain(id)
        })
    })

    it('resolves every label through the en locale', () => {
        Object.values(renderFields()).forEach(field => {
            expect(field.label).toBeTruthy()
            expect(field.label).not.toContain('publication.filters')
        })
    })
})
