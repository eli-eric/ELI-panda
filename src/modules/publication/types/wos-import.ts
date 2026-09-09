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

export type PublicationWosPreviewResponse =
    | {
          status: 'already-exists'
          doi: string
          existingPublication: ExistingPublicationSummary
      }
    | {
          status: 'found'
          doi: string
          values: PublicationWosImportValues
          authors: PublicationWosAuthor[]
          missingImportableFields: PublicationWosImportField[]
          unavailableFields: string[]
      }

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
