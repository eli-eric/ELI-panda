import { message } from '@/i18n/src/messages'

const FORM_MESSAGES = message.publication.form

export type PublicationWosAuthorMatchKind = 'researcher-id' | 'name' | 'none' | 'ambiguous'

export interface ExistingPublicationSummary {
    uid: string
    code: string
    title: string
    doi: string
}

export const WOS_PREVIEW_STATUS = {
    FOUND: 'found',
    ALREADY_EXISTS: 'already-exists',
} as const

export const WOS_ERROR_CODES = {
    DOI_INVALID: 'DOI_INVALID',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
    WOS_NOT_FOUND: 'WOS_NOT_FOUND',
    WOS_RECORD_AMBIGUOUS: 'WOS_RECORD_AMBIGUOUS',
    WOS_NOT_CONFIGURED: 'WOS_NOT_CONFIGURED',
    WOS_AUTHENTICATION_FAILED: 'WOS_AUTHENTICATION_FAILED',
    WOS_RATE_LIMITED: 'WOS_RATE_LIMITED',
    WOS_UPSTREAM_TIMEOUT: 'WOS_UPSTREAM_TIMEOUT',
    WOS_UPSTREAM_ERROR: 'WOS_UPSTREAM_ERROR',
} as const
export type WosErrorCode = (typeof WOS_ERROR_CODES)[keyof typeof WOS_ERROR_CODES]

/** Backend upstream budget is 10 s; allow additional time for matching and transport. */
export const WOS_PREVIEW_TIMEOUT_MS = 30_000

export const WOS_FIELD_LABEL_IDS: Record<string, string> = {
    abstract: FORM_MESSAGES.abstract.label,
    allAuthors: FORM_MESSAGES.allAuthors.label,
    allAuthorsCount: FORM_MESSAGES.allAuthorsCount.label,
    authorsDepartments: FORM_MESSAGES.department.label,
    citeAs: FORM_MESSAGES.citeAs.label,
    code: FORM_MESSAGES.code.label,
    dateOfPublication: FORM_MESSAGES.dateOfPublication.label,
    doi: FORM_MESSAGES.doi.label,
    eissn: FORM_MESSAGES.eissn.label,
    eliPublication: FORM_MESSAGES.eliPublication.label,
    eliResearchers: FORM_MESSAGES.eliAuthorsList.label,
    experimentalSystemCb: FORM_MESSAGES.experimentalSystemCb.label,
    grants: FORM_MESSAGES.grants.label,
    impactFactor: FORM_MESSAGES.impactFactor.label,
    isbn: FORM_MESSAGES.isbn.label,
    issn: FORM_MESSAGES.issn.label,
    issue: FORM_MESSAGES.issue.label,
    keywords: FORM_MESSAGES.keywords.label,
    longJournalTitle: FORM_MESSAGES.longJournalTitle.label,
    mediaTypeCb: FORM_MESSAGES.mediaTypeCb.label,
    note: FORM_MESSAGES.note.label,
    oecdFord: FORM_MESSAGES.oecdFord.label,
    openAccessType: FORM_MESSAGES.openAccessType.label,
    pages: FORM_MESSAGES.pages.label,
    pagesCount: FORM_MESSAGES.pagesCount.label,
    proceedingsIsbn: FORM_MESSAGES.proceedingsIsbn.label,
    publishingCountry: FORM_MESSAGES.publishingCountry.label,
    quartil: FORM_MESSAGES.quartil.label,
    quartilBasis: FORM_MESSAGES.quartilBasis.label,
    title: FORM_MESSAGES.title.label,
    userCall: FORM_MESSAGES.userCall.label,
    userExperimentCb: FORM_MESSAGES.userExperimentCb.label,
    volume: FORM_MESSAGES.volume.label,
    webLink: FORM_MESSAGES.webLink.label,
    wosNumber: FORM_MESSAGES.wosNumber.label,
    yearOfPublication: FORM_MESSAGES.yearOfPublication.label,
}

export const WOS_ABORT_ERROR_NAME = 'AbortError'
/** Bound large collaborations without introducing another scroll container. */
export const WOS_AUTHORS_PAGE_SIZE = 20
