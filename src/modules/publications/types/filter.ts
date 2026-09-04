import type { CodebookType } from '@/types/responses/codebook'

/** What RangeInput reads and writes; either bound may be left blank. */
type NumberRange = { min?: number | string; max?: number | string }

/** Dates are bounded as text so a partial YYYY or YYYY-MM still works. */
type DateRange = { min?: string; max?: string }

/**
 * Shape of the publications filter form.
 *
 * Every key is a filter id the API understands, which is also the table column
 * id where a column exists — see `docs/publications-filtering.md` in the API
 * repository for the full contract.
 */
export type PublicationFilterType = {
    // Identification
    title: string
    code: string
    doi: string
    webLink: string
    wosNumber: string
    issn: string
    eissn: string
    eidScopus: string
    mediaType: string[]
    eliPublication: string[]
    openAccessType: string[]

    // Journal
    longJournalTitle: string
    shortJournalTitle: string
    volume: NumberRange
    issue: NumberRange
    pages: string
    pagesCount: NumberRange

    // Authors & departments
    allAuthors: string
    allAuthorsCount: NumberRange
    eliAuthors: string
    eliAuthorsCount: NumberRange
    eliResearchers: CodebookType | null
    department: CodebookType | null

    // Metrics & classification
    impactFactor: NumberRange
    quartil: string[]
    quartilBasis: string[]
    yearOfPublication: string[]
    dateOfPublication: DateRange
    language: string[]
    oecdFord: string
    experimentalSystem: CodebookType | null
    userCall: CodebookType | null
    userExperiment: CodebookType | null
    publishingCountry: CodebookType | null

    // Conference & book
    publishFormat: string[]
    conferenceScope: string[]
    publisher: string
    publishPlace: string
    isbn: string
    bookTitle: string
    bookPagesCount: NumberRange
    editionVolume: string
    proceedingsIsbn: string
    conferenceDate: DateRange
    conferencePlace: string

    // Other
    abstract: string
    keywords: string
    citeAs: string
    grant: CodebookType | null
    otherGrants: string
    note: string
}
