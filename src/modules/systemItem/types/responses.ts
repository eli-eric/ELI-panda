import type { SystemDetail } from '@/types/responses/systems'

// History/field-change types moved to the systemHierarchy module (the active
// system detail UI); re-exported here for back-compat with systemItem internals.
export type {
    ChangeValue,
    CodebookSnapshot,
    FieldChangeEntry,
    FieldChangeType,
    HistoryResponse,
} from '@/modules/systemHierarchy/types/history'

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
