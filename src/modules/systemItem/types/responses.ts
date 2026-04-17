import type { SystemDetail } from '@/types/responses/systems'

import type { HISTORY_TYPE } from './constants'

export type SystemsForRelResponse = {
    data: SystemDetail[]
    totalCount: number
}

export type SystemRelationshipResponse = {
    direction: string
    relationTypeCode: string
    foreignSystemName: string
    relationUid: string
}

export type FieldChangeType = 'string' | 'number' | 'boolean' | 'date' | 'codebook'

export type CodebookSnapshot = {
    uid: string
    name: string
    code?: string
}

export type ChangeValue = string | number | boolean | CodebookSnapshot

export type FieldChangeEntry = {
    field: string
    type: FieldChangeType
    oldValue: ChangeValue | null
    newValue: ChangeValue | null
}

export type HistoryResponse = {
    uid: string
    changedAt: string
    changedBy: string
    historyType: HISTORY_TYPE
    action: string
    detail: {
        systemUid: string
        systemName: string
        direction: 'IN' | 'OUT'
    }
    changes?: FieldChangeEntry[]
}
