import type { CodebookType } from '@/types/responses/codebook'

export interface Zone {
    uid: string
    name: string
    code: string
    notes?: string | null
    parentZone?: CodebookType | null
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
