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
