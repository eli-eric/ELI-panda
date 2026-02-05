import type { z } from 'zod'

import type {
    codebookTypeSchema,
    systemCodeRequestSchema,
    systemCodeResultSchema,
    systemCodesOverviewResponseSchema,
    systemCodesPreviewParamsSchema,
} from './schemas'

// Inferred types from Zod schemas
export type CodebookType = z.infer<typeof codebookTypeSchema>
export type SystemCodeResult = z.infer<typeof systemCodeResultSchema>
export type SystemCodeRequest = z.infer<typeof systemCodeRequestSchema>
export type SystemCodesOverviewResponse = z.infer<typeof systemCodesOverviewResponseSchema>
export type SystemCodesPreviewParams = z.infer<typeof systemCodesPreviewParamsSchema>

// Re-export schemas for validation
export {
    codebookTypeSchema,
    systemCodeRequestSchema,
    systemCodeResultSchema,
    systemCodesOverviewResponseSchema,
    systemCodesPreviewParamsSchema,
} from './schemas'
