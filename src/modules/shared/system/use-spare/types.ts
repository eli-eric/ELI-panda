import type { CodebookType } from '@/types/responses/codebook'

export interface SpareAssignmentFormType {
    oldItemCondition: CodebookType
    newItemLocation: CodebookType
    autoAssignParent: boolean
    newParentSystemUid?: string
}

export interface SpareAssignmentPayload {
    spareItemUid: string
    systemUid: string
    oldItemCondition: CodebookType
    newParentSystemUid?: string
    newItemLocation: CodebookType
}
