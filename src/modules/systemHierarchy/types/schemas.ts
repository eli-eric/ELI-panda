import { z } from 'zod'

import { SystemLevel } from '@/types/gql/graphql'

// --- Reusable atoms ---
export const codebookRefSchema = z.object({
    uid: z.string(),
    name: z.string(),
    code: z.string().optional().nullable(),
    additionalData: z.string().optional().nullable(),
})

const parentPathItemSchema = z.object({
    uid: z.string(),
    name: z.string(),
})

const historyEntrySchema = z.object({
    uid: z.string(),
    changedAt: z.string(),
    changedBy: z.string(),
    historyType: z.string(),
    action: z.string(),
    detail: z.object({
        systemUid: z.string(),
        systemName: z.string(),
        direction: z.string(),
    }),
})

const statisticsSchema = z.object({
    subsystemsCount: z.number().optional(),
    sparePartsCount: z.number().optional(),
    minimalSpareParstCount: z.number().optional(),
    sp_coverage: z.number().optional(),
    sparePartsCoverageSum: z.number().optional(),
})

// --- Hierarchy endpoint (recursive tree) ---
export interface HierarchyNode {
    uid: string
    name: string
    systemCode?: string | null
    systemLevel: SystemLevel
    hasLeafChildren: boolean
    children: HierarchyNode[]
}

export const hierarchyNodeSchema: z.ZodType<HierarchyNode> = z.lazy(() =>
    z.object({
        uid: z.string(),
        name: z.string(),
        systemCode: z.string().optional().nullable(),
        systemLevel: z.nativeEnum(SystemLevel),
        hasLeafChildren: z.boolean(),
        children: z.array(hierarchyNodeSchema),
    }),
)

export const hierarchyResponseSchema = z.array(hierarchyNodeSchema)

// --- Leaves endpoint ---
export const systemLeafSchema = z.object({
    uid: z.string(),
    name: z.string(),
    systemCode: z.string().optional().nullable(),
    systemLevel: z.string().optional().nullable(),
    systemAlias: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    parentUid: z.string().optional().nullable(),
    hasSubsystems: z.boolean().optional(),
    sparesIn: z.number().optional(),
    sparesOut: z.number().optional(),
    systemType: codebookRefSchema.optional().nullable(),
    zone: codebookRefSchema.optional().nullable(),
    location: codebookRefSchema.optional().nullable(),
    responsible: codebookRefSchema.optional().nullable(),
    responsibleTeam: codebookRefSchema.optional().nullable(),
    importance: codebookRefSchema.optional().nullable(),
    owner: codebookRefSchema.optional().nullable(),
    parentPath: z.array(parentPathItemSchema).optional().nullable(),
    history: z.array(historyEntrySchema).optional().nullable(),
    statistics: statisticsSchema.optional().nullable(),
    miniImageUrl: z.array(z.string()).optional().nullable(),
    subSystems: z.array(z.string()).optional().nullable(),
    physicalItem: z.any().optional().nullable(),
})

export const leavesResponseSchema = z.object({
    data: z.array(systemLeafSchema),
    totalCount: z.number(),
})
