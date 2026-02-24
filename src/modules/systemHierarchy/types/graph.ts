import { z } from 'zod'

// --- Relationship types ---
export const RELATIONSHIP_TYPES = {
    POWERED_BY: 'POWERED_BY',
    CONTROLLED_BY: 'CONTROLLED_BY',
    DEPENDS_ON: 'DEPENDS_ON',
    IS_SPARE_FOR: 'IS_SPARE_FOR',
} as const

export type RelationshipType = (typeof RELATIONSHIP_TYPES)[keyof typeof RELATIONSHIP_TYPES]

export const RELATIONSHIP_TYPE_LABELS: Record<RelationshipType, string> = {
    POWERED_BY: 'Powered By',
    CONTROLLED_BY: 'Controlled By',
    DEPENDS_ON: 'Depends On',
    IS_SPARE_FOR: 'Is Spare For',
}

// --- Zod schemas ---
const systemTypeRefSchema = z.object({
    uid: z.string(),
    name: z.string(),
})

export const relationshipGraphNodeSchema = z.object({
    uid: z.string(),
    name: z.string(),
    systemCode: z.string().optional().nullable(),
    systemLevel: z.string(),
    systemType: systemTypeRefSchema.optional().nullable(),
})

export const relationshipGraphEdgeSchema = z.object({
    uid: z.string(),
    source: z.string(),
    target: z.string(),
    relationship: z.string(),
    description: z.string().optional().nullable(),
})

export const relationshipGraphResponseSchema = z.object({
    nodes: z.array(relationshipGraphNodeSchema),
    links: z.array(relationshipGraphEdgeSchema),
})

export const createRelationshipPayloadSchema = z.object({
    sourceUid: z.string().min(1),
    targetUid: z.string().min(1),
    relationshipType: z.string().min(1),
    description: z.string().optional(),
})

// --- Inferred types ---
export type RelationshipGraphNode = z.infer<typeof relationshipGraphNodeSchema>
export type RelationshipGraphEdge = z.infer<typeof relationshipGraphEdgeSchema>
export type RelationshipGraphResponse = z.infer<typeof relationshipGraphResponseSchema>
export type CreateRelationshipPayload = z.infer<typeof createRelationshipPayloadSchema>

// --- Graph view modes ---
export const GRAPH_LAYOUT_MODES = {
    HIERARCHY: 'hierarchy',
    FORCE: 'force',
} as const

export type GraphLayoutMode = (typeof GRAPH_LAYOUT_MODES)[keyof typeof GRAPH_LAYOUT_MODES]
