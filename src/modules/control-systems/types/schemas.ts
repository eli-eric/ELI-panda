import { z } from 'zod'

import { BATCH_LIMIT } from './constants'

// Reusable codebook schema for zone, systemType, location
export const codebookTypeSchema = z.object({
  uid: z.string(),
  name: z.string(),
  code: z.string().optional().nullable()
})

// Parent path item schema
export const parentPathItemSchema = z.object({
  name: z.string(),
  uid: z.string()
})

// SystemCodeResult schema - fields returned by API
// Preview endpoint returns subset (no uid, createdBy, updatedBy, location)
export const systemCodeResultSchema = z.object({
  uid: z.string().optional(),
  name: z.string(),
  code: z.string(),
  location: codebookTypeSchema.optional().nullable(),
  zone: codebookTypeSchema,
  parentPath: z.array(parentPathItemSchema).optional().nullable(),
  createdBy: z.string().optional().nullable(),
  updatedBy: z.string().optional().nullable()
})

// Request schema for creating system codes
export const systemCodeRequestSchema = z.object({
  zone: codebookTypeSchema,
  systemType: codebookTypeSchema,
  batch: z
    .number()
    .min(1, 'Batch must be at least 1')
    .max(BATCH_LIMIT, `Batch cannot exceed ${BATCH_LIMIT}`)
})

// Overview page response schema
export const systemCodesOverviewResponseSchema = z.object({
  data: z.array(systemCodeResultSchema),
  totalCount: z.number()
})

// Preview request params (query params for GET preview)
export const systemCodesPreviewParamsSchema = z.object({
  zoneUid: z.string(),
  systemTypeUid: z.string(),
  batch: z
    .number()
    .min(1)
    .max(BATCH_LIMIT, `Batch cannot exceed ${BATCH_LIMIT}`)
})
