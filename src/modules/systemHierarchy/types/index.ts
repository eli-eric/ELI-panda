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

export { hierarchyResponseSchema, leavesCountResponseSchema, leavesResponseSchema } from './schemas'
