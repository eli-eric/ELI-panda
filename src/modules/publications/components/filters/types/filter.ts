import type { CodebookType } from '@/types/responses/codebook'

/**
 * Form shape of the publications filter sheet.
 * Every field name is the canonical API filter id (ELIPANDA-503):
 * text ids are `string`, list ids are `string[]`, codebook ids hold either a
 * single `{uid, name}` object or `null`, range ids are `{min, max}` bags.
 * Columns whose table id differs from the API filter id use the API id here
 * (mediaTypeCb, userExperimentCb, experimentalSystemCb, grants, eliResearchers).
 */

export type FilterNumericRange = {
    min?: number | null
    max?: number | null
}

export type FilterDateRange = {
    min?: string | null
    max?: string | null
}

export type PublicationFilterType = {
    // text contains
    title: string
    code: string
    doi: string
    allAuthors: string
    eliAuthors: string
    keywords: string
    longJournalTitle: string
    shortJournalTitle: string
    abstract: string
    citeAs: string
    wosNumber: string
    issn: string
    eissn: string
    eidScopus: string
    oecdFord: string
    note: string
    otherGrants: string
    webLink: string
    publisher: string
    publishPlace: string
    isbn: string
    bookTitle: string
    editionVolume: string
    proceedingsIsbn: string
    conferencePlace: string
    pages: string
    // list membership (string values from the filter-options endpoint)
    yearOfPublication: string[]
    quartil: string[]
    quartilBasis: string[]
    language: string[]
    eliPublication: string[]
    // codebook relationships (values are uid arrays or single codebook objects)
    mediaTypeCb: string[]
    openAccessType: string[]
    publishFormatCb: string[]
    conferenceScopeCb: string[]
    experimentalSystemCb: CodebookType | null
    userExperimentCb: CodebookType | null
    userCall: CodebookType | null
    publishingCountry: CodebookType | null
    department: CodebookType | null
    grants: CodebookType | null
    eliResearchers: CodebookType | null
    // numeric ranges (default undefined on purpose: RangeInput fires its
    // onChange on mount for any seeded object value, which would push empty
    // filters and reset pagination/search — see useFormFilterState.setFilter)
    impactFactor?: FilterNumericRange
    allAuthorsCount?: FilterNumericRange
    eliAuthorsCount?: FilterNumericRange
    pagesCount?: FilterNumericRange
    bookPagesCount?: FilterNumericRange
    volume?: FilterNumericRange
    issue?: FilterNumericRange
    // free-form ISO date string ranges
    dateOfPublication?: FilterDateRange
    conferenceDate?: FilterDateRange
}

/** `GET /v1/publications/filter-options` response (models.PublicationFilterOptions). */
export type PublicationsFilterOptionsResponse = {
    years: string[]
    quartils: string[]
    quartilBases: string[]
    languages: string[]
    eliPublications: string[]
    ranges: Record<string, { min: number | null; max: number | null }>
    dateBounds: Record<string, { min: string | null; max: string | null }>
}
