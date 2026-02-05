import type { CodebookType } from '@/types/responses/codebook'

export interface Grant {
    uid: string
    code: string
    name: string
    grantGroup?: CodebookType
    updatedAt: string
}

export interface GrantsResponse {
    data: Grant[]
    totalCount: number
}
