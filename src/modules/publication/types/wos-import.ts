import { message } from '@/i18n/src/messages'
import type { SelectedResearcher } from '@/modules/shared/form/researcherSelect'
import type { CodebookType } from '@/types/responses/codebook'

export const PUBLICATION_WOS_IMPORT_FIELDS = [
    'doi',
    'title',
    'wosNumber',
    'longJournalTitle',
    'volume',
    'issue',
    'pages',
    'pagesCount',
    'yearOfPublication',
    'dateOfPublication',
    'issn',
    'eissn',
    'isbn',
    'webLink',
    'keywords',
    'allAuthors',
    'allAuthorsCount',
    'mediaTypeCb',
] as const

export type PublicationWosImportField = (typeof PUBLICATION_WOS_IMPORT_FIELDS)[number]

export interface PublicationWosImportValues {
    doi?: string
    title?: string
    wosNumber?: string
    longJournalTitle?: string
    volume?: number
    issue?: number
    pages?: string
    pagesCount?: number
    yearOfPublication?: string
    /** WoS Starter exposes only year and month, represented without inventing a day. */
    dateOfPublication?: string
    issn?: string
    eissn?: string
    isbn?: string
    webLink?: string
    keywords?: string
    allAuthors?: string
    allAuthorsCount?: number
    mediaTypeCb?: CodebookType
}

export interface PublicationWosResearcherCandidate extends SelectedResearcher {}

export type PublicationWosAuthorMatchKind = 'researcher-id' | 'name' | 'none' | 'ambiguous'

export interface PublicationWosAuthor {
    sourceIndex: number
    displayName: string
    wosStandard?: string
    researcherId?: string
    match: {
        kind: PublicationWosAuthorMatchKind
        candidates: PublicationWosResearcherCandidate[]
    }
}

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

export type PublicationWosPreviewResponse =
    | {
          status: typeof WOS_PREVIEW_STATUS.ALREADY_EXISTS
          doi: string
          existingPublication: ExistingPublicationSummary
      }
    | {
          status: typeof WOS_PREVIEW_STATUS.FOUND
          doi: string
          values: PublicationWosImportValues
          authors: PublicationWosAuthor[]
          missingImportableFields: PublicationWosImportField[]
          unavailableFields: string[]
      }

export type PublicationWosFoundPreview = Extract<
    PublicationWosPreviewResponse,
    { status: typeof WOS_PREVIEW_STATUS.FOUND }
>
export type PublicationWosDuplicatePreview = Extract<
    PublicationWosPreviewResponse,
    { status: typeof WOS_PREVIEW_STATUS.ALREADY_EXISTS }
>

export interface PublicationWosFieldRow {
    field: PublicationWosImportField
    currentValue: unknown
    incomingValue: unknown
    selectedByDefault: boolean
    status: 'empty' | 'different' | 'same'
}

export interface PublicationWosAuthorSelection {
    sourceIndex: number
    researcher: PublicationWosResearcherCandidate
}

export interface PublicationWosImportSelection {
    fields: PublicationWosImportField[]
    authors: PublicationWosAuthorSelection[]
}

/** Error codes emitted by publications-wos-import.go in eli-panda-api PR #432. */
export const WOS_ERROR_CODES = {
    INVALID_DOI: 'INVALID_DOI',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
    WOS_RECORD_NOT_FOUND: 'WOS_RECORD_NOT_FOUND',
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

const WOS_MESSAGES = message.publication.wosImport
const FORM_MESSAGES = message.publication.form

// The wire uses kebab-case match kinds; message ids stay camelCase per the
// dictionary convention enforced by i18n/src/__tests__/messages.spec.ts.
export const WOS_MATCH_LABEL_IDS: Record<PublicationWosAuthorMatchKind, string> = {
    'researcher-id': WOS_MESSAGES.match.researcherId,
    name: WOS_MESSAGES.match.name,
    none: WOS_MESSAGES.match.none,
    ambiguous: WOS_MESSAGES.match.ambiguous,
}

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

/** Exhaustive mapping: each new backend code requires a corresponding UI message. */
export const WOS_ERROR_MESSAGE_IDS: Record<WosErrorCode, string> = {
    [WOS_ERROR_CODES.INVALID_DOI]: WOS_MESSAGES.errors.invalid,
    [WOS_ERROR_CODES.INTERNAL_ERROR]: WOS_MESSAGES.errors.failed,
    [WOS_ERROR_CODES.WOS_RECORD_NOT_FOUND]: WOS_MESSAGES.errors.notFound,
    [WOS_ERROR_CODES.WOS_RECORD_AMBIGUOUS]: WOS_MESSAGES.errors.ambiguous,
    [WOS_ERROR_CODES.WOS_NOT_CONFIGURED]: WOS_MESSAGES.errors.notConfigured,
    [WOS_ERROR_CODES.WOS_AUTHENTICATION_FAILED]: WOS_MESSAGES.errors.authentication,
    [WOS_ERROR_CODES.WOS_RATE_LIMITED]: WOS_MESSAGES.errors.rateLimited,
    [WOS_ERROR_CODES.WOS_UPSTREAM_TIMEOUT]: WOS_MESSAGES.errors.timeout,
    [WOS_ERROR_CODES.WOS_UPSTREAM_ERROR]: WOS_MESSAGES.errors.unavailable,
}
export const WOS_UNAVAILABLE_HTTP_STATUSES = [502, 503, 504] as const
export const WOS_ABORT_ERROR_NAME = 'AbortError'
/** Bound large collaborations without introducing another scroll container. */
export const WOS_AUTHORS_PAGE_SIZE = 20
