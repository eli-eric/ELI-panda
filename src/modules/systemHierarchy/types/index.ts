import type { z } from 'zod'

import type {
    codebookRefSchema,
    leavesCountResponseSchema,
    leavesResponseSchema,
    systemLeafSchema,
} from './schemas'

// HierarchyNode is defined as an interface in schemas.ts (recursive type)
export type { HierarchyNode } from './schemas'
export type CodebookRef = z.infer<typeof codebookRefSchema>
export type SystemLeaf = z.infer<typeof systemLeafSchema>
export type LeavesResponse = z.infer<typeof leavesResponseSchema>
export type LeavesCountResponse = z.infer<typeof leavesCountResponseSchema>

export interface CopySystemBody {
    copyOnlySourceSystemChildren: boolean
    copyRecursive: boolean
    destinationSystemUid: string
    sourceSystemUid: string
}

export type {
    CreateRelationshipPayload,
    GraphLayoutMode,
    RelationshipGraphEdge,
    RelationshipGraphNode,
    RelationshipGraphResponse,
    RelationshipType,
} from './graph'
export {
    ASSIGNABLE_RELATIONSHIP_TYPES,
    createRelationshipPayloadSchema,
    EXCLUDED_RELATIONSHIP_TYPES,
    getRelationshipDirectionLabel,
    GRAPH_LAYOUT_MODES,
    RELATIONSHIP_COLORS,
    RELATIONSHIP_DEFINITIONS,
    RELATIONSHIP_TYPE_LABELS,
    RELATIONSHIP_TYPES,
    relationshipGraphResponseSchema,
} from './graph'
export { hierarchyResponseSchema, leavesCountResponseSchema, leavesResponseSchema } from './schemas'
