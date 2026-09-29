import type { SelectedResearcher } from '@/modules/shared/form/researcherSelect'
import type { CodebookType } from '@/types/responses/codebook'

import type {
    ExistingPublicationSummary,
    PublicationWosAuthorMatchKind,
    WOS_PREVIEW_STATUS,
} from '../../types/wos-import'

/**
 * Form fields a Web of Science lookup may fill, mirroring the backend's
 * WosImportableFields. Every entry is a key of the publication form schema.
 */
export const WOS_IMPORTABLE_FIELDS = [
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
    'proceedingsIsbn',
    'webLink',
    'keywords',
    'allAuthors',
    'allAuthorsCount',
    'citeAs',
    'mediaTypeCb',
    'eliResearchers',
] as const

export type WosImportableField = (typeof WOS_IMPORTABLE_FIELDS)[number]

/** Value kind per field, already in the shape the form stores it. */
interface WosImportValueKinds {
    doi: string
    title: string
    wosNumber: string
    longJournalTitle: string
    volume: number
    issue: number
    pages: string
    pagesCount: number
    yearOfPublication: string
    dateOfPublication: string
    issn: string
    eissn: string
    isbn: string
    proceedingsIsbn: string
    webLink: string
    keywords: string
    allAuthors: string
    allAuthorsCount: number
    citeAs: string
    mediaTypeCb: CodebookType
    eliResearchers: SelectedResearcher[]
}

/** Picking by the frozen list makes a missing value kind a compile error. */
export type WosImportValues = Partial<Pick<WosImportValueKinds, WosImportableField>>

export const WOS_MATCH_CONFIDENCE = {
    EXACT_ID: 'EXACT_ID',
    NAME: 'NAME',
    AMBIGUOUS: 'AMBIGUOUS',
    NONE: 'NONE',
} as const

export type WosMatchConfidence = (typeof WOS_MATCH_CONFIDENCE)[keyof typeof WOS_MATCH_CONFIDENCE]

export interface WosAuthorMatch {
    /** Internal provenance; the dialog reads `confidence`. */
    kind: PublicationWosAuthorMatchKind
    confidence: WosMatchConfidence
    /** False when the author's ResearcherID is not yet stored on the matched researcher. */
    knownResearcherId: boolean
    candidates: SelectedResearcher[]
}

export interface WosLookupAuthor {
    sourceIndex: number
    displayName: string
    wosStandard?: string
    researcherId?: string
    orcid?: string
    match: WosAuthorMatch
}

export interface WosImportWarning {
    code: string
    field: string
    raw?: string
    message: string
}

/** GET /v1/publications/wos/lookup — models.WosPreviewResponse in eli-panda-api. */
export interface WosLookupResponse {
    status: (typeof WOS_PREVIEW_STATUS)[keyof typeof WOS_PREVIEW_STATUS]
    doi: string
    wosUid?: string
    recordUrl?: string
    existingPublication?: ExistingPublicationSummary
    values?: WosImportValues
    authors: WosLookupAuthor[]
    missingImportableFields: string[]
    unavailableFields: string[]
    warnings: WosImportWarning[]
}

/** PATCH /v1/researcher/{uid}/researcher-ids body. */
export interface WosResearcherIdsRequest {
    researcherIds: string[]
}
