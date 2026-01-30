import type { CodebookType } from '@/types/responses/codebook'

export type SystemTypesResponse = {
    name: string
    uid: string
    code: string
    mask: string
    systemAttribute?: CodebookType
}
