import { message } from '@/i18n/src/messages'

import type {
    PublicationWosAuthor,
    PublicationWosImportField,
    PublicationWosImportValues,
} from './wos-import'

const ENRICHMENT_MESSAGES = message.publication.enrichment

/** Providers the preview consults, in the order the backend reports them. */
export const ENRICHMENT_PROVIDERS = ['crossref', 'wos-starter', 'unpaywall'] as const
export type EnrichmentProvider = (typeof ENRICHMENT_PROVIDERS)[number]

/**
 * Per-provider outcome. `not-configured` is deliberately distinct from `error`:
 * a provider nobody has credentials for is a deployment fact, not an outage, and
 * the editor should not be told to retry it.
 */
export type EnrichmentSourceState =
    | 'ok'
    | 'error'
    | 'not-found'
    | 'not-configured'
    | 'ambiguous'
    | 'skipped'

export interface EnrichmentSourceStatus {
    provider: EnrichmentProvider | string
    status: EnrichmentSourceState
    code?: string
    message?: string
    retryable: boolean
    retryAfter?: string
    retrievedAt?: string
}

export interface EnrichmentOrigin {
    provider: string
    retrievedAt: string
}

/** A field two providers disagreed on. The editor picks; nothing is auto-resolved. */
export interface EnrichmentConflict {
    field: string
    selectedProvider: string
    selectedValue: unknown
    alternativeProvider: string
    alternativeValue: unknown
}

/** Informational until an editor picks the matching Open Access codebook entry. */
export interface EnrichmentOpenAccess {
    status: string
    url?: string
    pdfUrl?: string
}

export interface EnrichmentPreviewResponse {
    status: 'found' | 'not-found' | 'already-exists' | 'unavailable'
    doi: string
    existingPublication?: { uid: string; code: string; title: string; doi: string }
    values?: PublicationWosImportValues
    authors: PublicationWosAuthor[]
    missingImportableFields: PublicationWosImportField[]
    unavailableFields: string[]
    sources: EnrichmentSourceStatus[]
    provenance: Record<string, EnrichmentOrigin>
    conflicts: EnrichmentConflict[]
    publicationDatePrecision?: 'year' | 'month' | 'day'
    openAccess?: EnrichmentOpenAccess
    authorRolesStatus: string
    affiliationStatus: string
}

export interface EnrichmentPreviewRequest {
    doi: string
    currentPublicationUid?: string
}

/** Backend budget is 10 s per provider; allow for the fan-out plus transport. */
export const ENRICHMENT_PREVIEW_TIMEOUT_MS = 30_000

// The wire uses kebab-case provider and status values; message ids stay
// camelCase per the dictionary convention enforced by
// i18n/src/__tests__/messages.spec.ts.
export const ENRICHMENT_PROVIDER_LABEL_IDS: Record<string, string> = {
    crossref: ENRICHMENT_MESSAGES.provider.crossref,
    'wos-starter': ENRICHMENT_MESSAGES.provider.wosStarter,
    unpaywall: ENRICHMENT_MESSAGES.provider.unpaywall,
}

export const ENRICHMENT_STATE_LABEL_IDS: Record<EnrichmentSourceState, string> = {
    ok: ENRICHMENT_MESSAGES.state.ok,
    error: ENRICHMENT_MESSAGES.state.error,
    'not-found': ENRICHMENT_MESSAGES.state.notFound,
    'not-configured': ENRICHMENT_MESSAGES.state.notConfigured,
    ambiguous: ENRICHMENT_MESSAGES.state.ambiguous,
    skipped: ENRICHMENT_MESSAGES.state.skipped,
}
