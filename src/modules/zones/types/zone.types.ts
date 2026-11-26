import type { CodebookType } from '@/types/responses/codebook'

export interface Zone {
    uid: string
    name: string
    code: string
    notes?: string | null
    parentZone?: CodebookType | null
    /** `code` is optional here — systems created by migration do not have a system code. */
    defaultParentSystem?: CodebookType | null
}

/**
 * Write model for POST/PUT /v1/zones.
 *
 * Relationship fields are tri-state on the API: omitted/null leaves the link untouched,
 * `''` disconnects it, a uid sets it. A form that always submits the whole object must
 * therefore send `''` for "nothing selected", never null.
 */
export interface ZoneRequest {
    name: string
    code: string
    notes: string
    parentUid: string
    defaultParentSystemUid: string
}

export interface ZonesResponse {
    data: Zone[]
    totalCount: number
}

export interface ZoneImportResult {
    created: number
    skipped: number
    errors: string[]
}
