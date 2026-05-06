import type { ITEM_USAGE } from '@/modules/systems/types/constants'

export interface RelationshipTableRow {
    edgeUid: string
    direction: 'inbound' | 'outbound'
    relationship: string
    directionLabel: string
    color: string
    nodeUid: string
    nodeName: string
    nodeSystemCode?: string | null
    nodeSystemTypeName?: string | null
    itemUsage?: ITEM_USAGE
}
