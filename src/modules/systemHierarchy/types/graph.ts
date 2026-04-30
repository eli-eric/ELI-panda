import { z } from 'zod'

// --- Single source of truth: relationship registry ---
interface RelationshipDef {
    label: string
    color: string
    rank: number
    assignable: boolean
    direction?: { inbound: string; outbound: string }
}

const messageBase = 'message.systemHierarchy.relationships'

export const RELATIONSHIP_DEFINITIONS = {
    HAS_SUBSYSTEM: {
        label: 'Has Subsystem',
        color: '#8b5cf6',
        rank: 0,
        assignable: false,
    },
    IS_SPARE_FOR: {
        label: 'Is Spare For',
        color: '#10b981',
        rank: 1,
        assignable: true,
        direction: { inbound: `${messageBase}.hasSpare`, outbound: `${messageBase}.spareFor` },
    },
    IS_COOLED_FROM: {
        label: 'Is Cooled From',
        color: '#3b82f6',
        rank: 2,
        assignable: true,
        direction: { inbound: `${messageBase}.cools`, outbound: `${messageBase}.cooledFrom` },
    },
    IS_POWERED_FROM: {
        label: 'Is Powered From',
        color: '#f59e0b',
        rank: 3,
        assignable: true,
        direction: { inbound: `${messageBase}.powers`, outbound: `${messageBase}.poweredFrom` },
    },
    IS_CONTROLLED_BY: {
        label: 'Is Controlled By',
        color: '#ef4444',
        rank: 4,
        assignable: true,
        direction: { inbound: `${messageBase}.controls`, outbound: `${messageBase}.controlledBy` },
    },
    IS_INTERLOCKED_BY: {
        label: 'Is Interlocked By',
        color: '#14b8a6',
        rank: 5,
        assignable: true,
        direction: {
            inbound: `${messageBase}.interlocks`,
            outbound: `${messageBase}.interlockedBy`,
        },
    },
    PROVIDES_DATA_TO: {
        label: 'Provides Data To',
        color: '#6366f1',
        rank: 6,
        assignable: true,
        direction: {
            inbound: `${messageBase}.receivesDataFrom`,
            outbound: `${messageBase}.providesDataTo`,
        },
    },
    DIRECTS_BEAM_TO: {
        label: 'Directs Beam To',
        color: '#f43f5e',
        rank: 7,
        assignable: true,
        direction: {
            inbound: `${messageBase}.receivesBeamFrom`,
            outbound: `${messageBase}.directsBeamTo`,
        },
    },
    PROVIDES_VACUUM_FOR: {
        label: 'Provides Vacuum For',
        color: '#84cc16',
        rank: 8,
        assignable: true,
        direction: {
            inbound: `${messageBase}.receivesVacuumFrom`,
            outbound: `${messageBase}.providesVacuumFor`,
        },
    },
} as const satisfies Record<string, RelationshipDef>

export type RelationshipType = keyof typeof RELATIONSHIP_DEFINITIONS

const RELATIONSHIP_CODES = Object.keys(RELATIONSHIP_DEFINITIONS) as RelationshipType[]

// --- Derived maps (kept for existing call sites) ---
export const RELATIONSHIP_TYPES = Object.fromEntries(
    RELATIONSHIP_CODES.map(code => [code, code]),
) as { [K in RelationshipType]: K }

export const RELATIONSHIP_TYPE_LABELS = Object.fromEntries(
    RELATIONSHIP_CODES.map(code => [code, RELATIONSHIP_DEFINITIONS[code].label]),
) as Record<RelationshipType, string>

export const RELATIONSHIP_COLORS = Object.fromEntries(
    RELATIONSHIP_CODES.map(code => [code, RELATIONSHIP_DEFINITIONS[code].color]),
) as Record<RelationshipType, string>

export const RELATIONSHIP_TYPE_RANK: Record<string, number> = Object.fromEntries(
    RELATIONSHIP_CODES.map(code => [code, RELATIONSHIP_DEFINITIONS[code].rank]),
)

export const ASSIGNABLE_RELATIONSHIP_TYPES: RelationshipType[] = RELATIONSHIP_CODES.filter(
    code => RELATIONSHIP_DEFINITIONS[code].assignable,
)

export const EXCLUDED_RELATIONSHIP_TYPES: Set<string> = new Set(
    RELATIONSHIP_CODES.filter(code => !RELATIONSHIP_DEFINITIONS[code].assignable),
)

export const getRelationshipDirectionLabel = (
    code: string,
    direction: 'inbound' | 'outbound',
): string | undefined => {
    const def = RELATIONSHIP_DEFINITIONS[code as RelationshipType] as
        | RelationshipDef
        | undefined
    return def?.direction?.[direction]
}

export const DEFAULT_RELATIONSHIP_RANK = 99

export interface RelationshipLoadMoreRow {
    type: string
    shown: number
    total: number
    isLoading: boolean
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

export const relationshipGraphStatSchema = z.object({
    total: z.number(),
    returned: z.number(),
    hasMore: z.boolean(),
})

export const relationshipGraphMetaSchema = z.object({
    relationshipStats: z.record(z.string(), relationshipGraphStatSchema).optional(),
    hiddenLinksTotal: z.number().optional(),
})

export const relationshipGraphPageSchema = z.object({
    type: z.string(),
    offset: z.number(),
    limit: z.number(),
    returned: z.number(),
    total: z.number(),
    hasMore: z.boolean(),
})

export const relationshipGraphResponseSchema = z.object({
    nodes: z.array(relationshipGraphNodeSchema),
    links: z.array(relationshipGraphEdgeSchema),
    meta: relationshipGraphMetaSchema.optional(),
    page: relationshipGraphPageSchema.optional(),
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
export type RelationshipGraphStat = z.infer<typeof relationshipGraphStatSchema>
export type RelationshipGraphMeta = z.infer<typeof relationshipGraphMetaSchema>
export type RelationshipGraphPage = z.infer<typeof relationshipGraphPageSchema>
export type RelationshipGraphResponse = z.infer<typeof relationshipGraphResponseSchema>
export type CreateRelationshipPayload = z.infer<typeof createRelationshipPayloadSchema>

// --- Graph view modes ---
export const GRAPH_LAYOUT_MODES = {
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal',
} as const

export type GraphLayoutMode = (typeof GRAPH_LAYOUT_MODES)[keyof typeof GRAPH_LAYOUT_MODES]
