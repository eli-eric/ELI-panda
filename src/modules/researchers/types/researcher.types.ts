import type { CodebookType } from '@/types/responses/codebook'

export interface Researcher {
    uid: string
    firstName: string
    lastName: string
    identificationNumber?: string
    orcid?: string
    scopusId?: string
    researcherId?: string
    citizenship?: CodebookType
    updatedAt: string
}

export interface ResearchersResponse {
    data: Researcher[]
    totalCount: number
}
