import { z } from 'zod'

// --- Relationship types ---
export const RELATIONSHIP_TYPES = {
    IS_SPARE_FOR: 'IS_SPARE_FOR',
    IS_COOLED_BY: 'IS_COOLED_BY',
    IS_POWERED_BY: 'IS_POWERED_BY',
    IS_CONTROLED_BY: 'IS_CONTROLED_BY',
    HAS_SUBSYSTEM: 'HAS_SUBSYSTEM',
} as const

export type RelationshipType = (typeof RELATIONSHIP_TYPES)[keyof typeof RELATIONSHIP_TYPES]

export const RELATIONSHIP_TYPE_LABELS: Record<RelationshipType, string> = {
    IS_SPARE_FOR: 'Is Spare For',
    IS_COOLED_BY: 'Is Cooled By',
    IS_POWERED_BY: 'Is Powered By',
    IS_CONTROLED_BY: 'Is Controlled By',
    HAS_SUBSYSTEM: 'Has Subsystem',
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
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal',
} as const

export type GraphLayoutMode = (typeof GRAPH_LAYOUT_MODES)[keyof typeof GRAPH_LAYOUT_MODES]
