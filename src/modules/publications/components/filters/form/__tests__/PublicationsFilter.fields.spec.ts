import { renderHookWithProviders } from '@/testutils/wrappers/renderWithProviders'

import {
    PUBLICATION_ELI_FLAGS,
    PUBLICATION_QUARTILES,
    publicationFilterYears,
    usePublicationsFilterFields,
} from '../PublicationsFilter.fields'

describe('usePublicationsFilterFields', () => {
    it('names every field after the filter id the API expects', () => {
        const { result } = renderHookWithProviders(() => usePublicationsFilterFields())

        Object.entries(result.current).forEach(([key, field]) => {
            expect(field.name).toBe(key)
        })
    })

    it('covers every filter the API supports', () => {
        const { result } = renderHookWithProviders(() => usePublicationsFilterFields())
        const names = Object.keys(result.current)

        // Ids the table also exposes as columns.
        expect(names).toEqual(
            expect.arrayContaining([
                'title',
                'code',
                'doi',
                'mediaType',
                'eliPublication',
                'experimentalSystem',
                'userCall',
                'userExperiment',
                'openAccessType',
                'publishingCountry',
                'eliResearchers',
                'grant',
            ]),
        )

        // Ids with no column, filterable all the same.
        expect(names).toEqual(
            expect.arrayContaining([
                'shortJournalTitle',
                'publisher',
                'publishPlace',
                'isbn',
                'bookTitle',
                'bookPagesCount',
                'editionVolume',
                'proceedingsIsbn',
                'conferenceDate',
                'conferencePlace',
                'publishFormat',
                'conferenceScope',
                'department',
            ]),
        )
    })

    it('gives every codebook field a codebook to read from', () => {
        const { result } = renderHookWithProviders(() => usePublicationsFilterFields())

        const codebookFields = [
            'mediaType',
            'openAccessType',
            'publishingCountry',
            'userCall',
            'userExperiment',
            'experimentalSystem',
            'publishFormat',
            'conferenceScope',
            'language',
            'department',
        ] as const

        codebookFields.forEach(name => {
            expect(result.current[name].codebook).toBeDefined()
        })
    })

    it('labels every field', () => {
        const { result } = renderHookWithProviders(() => usePublicationsFilterFields())

        Object.values(result.current).forEach(field => {
            expect(typeof field.label).toBe('string')
            expect(field.label).not.toBe('')
        })
    })
})

describe('publicationFilterYears', () => {
    it('offers whole years, newest first, down to 2000', () => {
        const years = publicationFilterYears()
        const currentYear = String(new Date().getFullYear())

        expect(years[0]).toBe(currentYear)
        expect(years[years.length - 1]).toBe('2000')
        expect(years).toEqual([...years].sort().reverse())
        // A year filter is a list of values, never a range.
        years.forEach(year => expect(year).toMatch(/^\d{4}$/u))
    })
})

describe('filter option constants', () => {
    it('offers the four quartiles and both ELI flags', () => {
        expect(PUBLICATION_QUARTILES).toEqual(['Q1', 'Q2', 'Q3', 'Q4'])
        expect(PUBLICATION_ELI_FLAGS).toEqual(['YES', 'NO'])
    })
})
