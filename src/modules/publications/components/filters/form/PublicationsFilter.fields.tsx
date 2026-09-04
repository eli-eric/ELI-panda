import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

const columns = message.publicationsPage.columns
const filters = message.publicationsPage.filters

/**
 * Field metadata for the publications filter sheet.
 *
 * Names are the filter ids the API understands, which match the table column
 * ids wherever a column exists. Labels reuse the column and publication-form
 * messages so the sheet and the table say the same thing about a field.
 */
export const usePublicationsFilterFields = () =>
    useMakeFormFields({
        // Identification
        title: { name: 'title', label: columns.title, rounded: 'rounded-md' },
        code: { name: 'code', label: columns.code, rounded: 'rounded-md' },
        doi: { name: 'doi', label: columns.doi, rounded: 'rounded-md' },
        webLink: { name: 'webLink', label: columns.webLink, rounded: 'rounded-md' },
        wosNumber: { name: 'wosNumber', label: columns.wosNumber, rounded: 'rounded-md' },
        issn: { name: 'issn', label: columns.issn, rounded: 'rounded-md' },
        eissn: { name: 'eissn', label: columns.eissn, rounded: 'rounded-md' },
        eidScopus: { name: 'eidScopus', label: columns.eidScopus, rounded: 'rounded-md' },
        mediaType: { name: 'mediaType', label: columns.mediaType, codebook: CODEBOOK.MEDIA_TYPE },
        eliPublication: { name: 'eliPublication', label: columns.eliPublication },
        openAccessType: {
            name: 'openAccessType',
            label: columns.openAccessType,
            codebook: CODEBOOK.OPEN_ACCESS_TYPE,
        },

        // Journal
        longJournalTitle: {
            name: 'longJournalTitle',
            label: columns.journalTitle,
            rounded: 'rounded-md',
        },
        shortJournalTitle: {
            name: 'shortJournalTitle',
            label: filters.shortJournalTitle,
            rounded: 'rounded-md',
        },
        volume: { name: 'volume', label: columns.volume, rounded: 'rounded-md' },
        issue: { name: 'issue', label: columns.issue, rounded: 'rounded-md' },
        pages: { name: 'pages', label: columns.pages, rounded: 'rounded-md' },
        pagesCount: { name: 'pagesCount', label: columns.pagesCount, rounded: 'rounded-md' },

        // Authors & departments
        allAuthors: { name: 'allAuthors', label: columns.authors, rounded: 'rounded-md' },
        allAuthorsCount: {
            name: 'allAuthorsCount',
            label: columns.authorsCount,
            rounded: 'rounded-md',
        },
        eliAuthors: { name: 'eliAuthors', label: columns.eliAuthors, rounded: 'rounded-md' },
        eliAuthorsCount: {
            name: 'eliAuthorsCount',
            label: columns.eliAuthorsCount,
            rounded: 'rounded-md',
        },
        eliResearchers: { name: 'eliResearchers', label: filters.eliResearcher },
        department: {
            name: 'department',
            label: filters.department,
            codebook: CODEBOOK.DEPARTMENT,
        },

        // Metrics & classification
        impactFactor: { name: 'impactFactor', label: columns.impactFactor, rounded: 'rounded-md' },
        quartil: { name: 'quartil', label: columns.quartil },
        quartilBasis: { name: 'quartilBasis', label: columns.quartilBasis },
        yearOfPublication: { name: 'yearOfPublication', label: columns.yearOfPublication },
        dateOfPublication: {
            name: 'dateOfPublication',
            label: columns.dateOfPublication,
            rounded: 'rounded-md',
        },
        language: { name: 'language', label: columns.language, codebook: CODEBOOK.LANGUAGE },
        oecdFord: { name: 'oecdFord', label: columns.oecdFord, rounded: 'rounded-md' },
        experimentalSystem: {
            name: 'experimentalSystem',
            label: columns.experimentalSystem,
            codebook: CODEBOOK.EXPERIMENTAL_SYSTEM,
        },
        userCall: { name: 'userCall', label: columns.userCall, codebook: CODEBOOK.USER_CALL },
        userExperiment: {
            name: 'userExperiment',
            label: columns.userExperiment,
            codebook: CODEBOOK.USER_EXPERIMENT,
        },
        publishingCountry: {
            name: 'publishingCountry',
            label: columns.publishingCountry,
            codebook: CODEBOOK.COUNTRY,
        },

        // Conference & book
        publishFormat: {
            name: 'publishFormat',
            label: filters.publishFormat,
            codebook: CODEBOOK.PUBLISH_FORMAT,
        },
        conferenceScope: {
            name: 'conferenceScope',
            label: filters.conferenceScope,
            codebook: CODEBOOK.CONFERENCE_SCOPE,
        },
        publisher: { name: 'publisher', label: filters.publisher, rounded: 'rounded-md' },
        publishPlace: { name: 'publishPlace', label: filters.publishPlace, rounded: 'rounded-md' },
        isbn: { name: 'isbn', label: filters.isbn, rounded: 'rounded-md' },
        bookTitle: { name: 'bookTitle', label: filters.bookTitle, rounded: 'rounded-md' },
        bookPagesCount: {
            name: 'bookPagesCount',
            label: filters.bookPagesCount,
            rounded: 'rounded-md',
        },
        editionVolume: {
            name: 'editionVolume',
            label: filters.editionVolume,
            rounded: 'rounded-md',
        },
        proceedingsIsbn: {
            name: 'proceedingsIsbn',
            label: filters.proceedingsIsbn,
            rounded: 'rounded-md',
        },
        conferenceDate: {
            name: 'conferenceDate',
            label: filters.conferenceDate,
            rounded: 'rounded-md',
        },
        conferencePlace: {
            name: 'conferencePlace',
            label: filters.conferencePlace,
            rounded: 'rounded-md',
        },

        // Other
        abstract: { name: 'abstract', label: columns.abstract, rounded: 'rounded-md' },
        keywords: { name: 'keywords', label: columns.keywords, rounded: 'rounded-md' },
        citeAs: { name: 'citeAs', label: columns.citeAs, rounded: 'rounded-md' },
        grant: { name: 'grant', label: columns.grant },
        otherGrants: { name: 'otherGrants', label: filters.otherGrants, rounded: 'rounded-md' },
        note: { name: 'note', label: columns.note, rounded: 'rounded-md' },
    })

/** Publication years offered by the year filter, newest first. */
export const publicationFilterYears = (): string[] => {
    const currentYear = new Date().getFullYear()
    const earliestYear = 2000
    return Array.from({ length: currentYear - earliestYear + 1 }, (_, index) =>
        String(currentYear - index),
    )
}

export const PUBLICATION_QUARTILES = ['Q1', 'Q2', 'Q3', 'Q4']
export const PUBLICATION_ELI_FLAGS = ['YES', 'NO']
