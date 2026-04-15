import type { SystemLevel } from '@/types/gql/graphql'

interface SparePartNode {
    uid: string
    name: string
    systemLevel?: SystemLevel | null
    parentPath?: Array<{ uid?: string | null; name?: string | null } | null> | null
    location?: { name?: string | null; code?: string | null } | null
    physicalItem?: {
        uid: string
        eun?: string | null
        itemUsage?: { uid?: string | null; name?: string | null } | null
        catalogueItem?: { catalogueNumber?: string | null } | null
    } | null
}

export interface SparePartEdge {
    coverage?: number | null
    node: SparePartNode
}
