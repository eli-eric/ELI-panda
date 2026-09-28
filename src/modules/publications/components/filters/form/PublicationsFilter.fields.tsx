import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

const { filters } = message.publication

/**
 * Filter field definitions for the publications filter sheet.
 * Every `name` is the canonical API filter id (ELIPANDA-503). Columns whose
 * table id differs from the API id use the API id
 * (mediaTypeCb, userExperimentCb, experimentalSystemCb, grants, eliResearchers).
 */
export const usePublicationsFilterFields = () => {
    const disabled = false
    return useMakeFormFields({
        // identification
        title: { name: 'title', label: filters.fields.title.label, disabled },
        code: { name: 'code', label: filters.fields.code.label, disabled },
        doi: { name: 'doi', label: filters.fields.doi.label, disabled },
        eliPublication: {
            name: 'eliPublication',
            label: filters.fields.eliPublication.label,
            disabled,
        },
        mediaTypeCb: {
            name: 'mediaTypeCb',
            label: filters.fields.mediaTypeCb.label,
            codebook: CODEBOOK.MEDIA_TYPE,
            disabled,
        },
        openAccessType: {
            name: 'openAccessType',
            label: filters.fields.openAccessType.label,
            codebook: CODEBOOK.OPEN_ACCESS_TYPE,
            disabled,
        },
        webLink: { name: 'webLink', label: filters.fields.webLink.label, disabled },
        // journal
        longJournalTitle: {
            name: 'longJournalTitle',
            label: filters.fields.longJournalTitle.label,
            disabled,
        },
        shortJournalTitle: {
            name: 'shortJournalTitle',
            label: filters.fields.shortJournalTitle.label,
            disabled,
        },
        issn: { name: 'issn', label: filters.fields.issn.label, disabled },
        eissn: { name: 'eissn', label: filters.fields.eissn.label, disabled },
        citeAs: { name: 'citeAs', label: filters.fields.citeAs.label, disabled },
        pages: { name: 'pages', label: filters.fields.pages.label, disabled },
        language: { name: 'language', label: filters.fields.language.label, disabled },
        publishingCountry: {
            name: 'publishingCountry',
            label: filters.fields.publishingCountry.label,
            codebook: CODEBOOK.COUNTRY,
            disabled,
        },
        wosNumber: { name: 'wosNumber', label: filters.fields.wosNumber.label, disabled },
        eidScopus: { name: 'eidScopus', label: filters.fields.eidScopus.label, disabled },
        // authors & departments
        allAuthors: { name: 'allAuthors', label: filters.fields.allAuthors.label, disabled },
        allAuthorsCount: {
            name: 'allAuthorsCount',
            label: filters.fields.allAuthorsCount.label,
            disabled,
        },
        eliAuthors: { name: 'eliAuthors', label: filters.fields.eliAuthors.label, disabled },
        eliAuthorsCount: {
            name: 'eliAuthorsCount',
            label: filters.fields.eliAuthorsCount.label,
            disabled,
        },
        eliResearchers: {
            name: 'eliResearchers',
            label: filters.fields.eliResearchers.label,
            disabled,
        },
        department: {
            name: 'department',
            label: filters.fields.department.label,
            codebook: CODEBOOK.DEPARTMENT,
            disabled,
        },
        // metrics
        yearOfPublication: {
            name: 'yearOfPublication',
            label: filters.fields.yearOfPublication.label,
            disabled,
        },
        dateOfPublication: {
            name: 'dateOfPublication',
            label: filters.fields.dateOfPublication.label,
            disabled,
        },
        impactFactor: {
            name: 'impactFactor',
            label: filters.fields.impactFactor.label,
            disabled,
        },
        quartil: { name: 'quartil', label: filters.fields.quartil.label, disabled },
        quartilBasis: {
            name: 'quartilBasis',
            label: filters.fields.quartilBasis.label,
            disabled,
        },
        pagesCount: { name: 'pagesCount', label: filters.fields.pagesCount.label, disabled },
        volume: { name: 'volume', label: filters.fields.volume.label, disabled },
        issue: { name: 'issue', label: filters.fields.issue.label, disabled },
        // conference & book
        isbn: { name: 'isbn', label: filters.fields.isbn.label, disabled },
        bookTitle: { name: 'bookTitle', label: filters.fields.bookTitle.label, disabled },
        bookPagesCount: {
            name: 'bookPagesCount',
            label: filters.fields.bookPagesCount.label,
            disabled,
        },
        editionVolume: {
            name: 'editionVolume',
            label: filters.fields.editionVolume.label,
            disabled,
        },
        publisher: { name: 'publisher', label: filters.fields.publisher.label, disabled },
        publishPlace: { name: 'publishPlace', label: filters.fields.publishPlace.label, disabled },
        publishFormatCb: {
            name: 'publishFormatCb',
            label: filters.fields.publishFormatCb.label,
            codebook: CODEBOOK.PUBLISH_FORMAT,
            disabled,
        },
        proceedingsIsbn: {
            name: 'proceedingsIsbn',
            label: filters.fields.proceedingsIsbn.label,
            disabled,
        },
        conferenceDate: {
            name: 'conferenceDate',
            label: filters.fields.conferenceDate.label,
            disabled,
        },
        conferencePlace: {
            name: 'conferencePlace',
            label: filters.fields.conferencePlace.label,
            disabled,
        },
        conferenceScopeCb: {
            name: 'conferenceScopeCb',
            label: filters.fields.conferenceScopeCb.label,
            codebook: CODEBOOK.CONFERENCE_SCOPE,
            disabled,
        },
        // other
        abstract: { name: 'abstract', label: filters.fields.abstract.label, disabled },
        keywords: { name: 'keywords', label: filters.fields.keywords.label, disabled },
        oecdFord: { name: 'oecdFord', label: filters.fields.oecdFord.label, disabled },
        grants: { name: 'grants', label: filters.fields.grants.label, disabled },
        otherGrants: { name: 'otherGrants', label: filters.fields.otherGrants.label, disabled },
        experimentalSystemCb: {
            name: 'experimentalSystemCb',
            label: filters.fields.experimentalSystemCb.label,
            codebook: CODEBOOK.EXPERIMENTAL_SYSTEM,
            disabled,
        },
        userExperimentCb: {
            name: 'userExperimentCb',
            label: filters.fields.userExperimentCb.label,
            codebook: CODEBOOK.USER_EXPERIMENT,
            disabled,
        },
        userCall: {
            name: 'userCall',
            label: filters.fields.userCall.label,
            codebook: CODEBOOK.USER_CALL,
            disabled,
        },
        note: { name: 'note', label: filters.fields.note.label, disabled },
    })
}
