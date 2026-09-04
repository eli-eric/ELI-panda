import type { CodebookType } from '@/types/responses/codebook'

export interface Researcher {
    uid: string
    firstName: string
    lastName: string
    identificationNumber?: string
    orcid?: string
    scopusId?: string
    /** The current ResearcherID — the one RIV export sends. */
    researcherId?: string
    /** Every ResearcherID this researcher has held, newest not implied by order. */
    researcherIds?: string[]
    citizenship?: CodebookType
    updatedAt: string
}

export interface ResearchersResponse {
    data: Researcher[]
    totalCount: number
}
