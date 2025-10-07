import { z } from 'zod'

import { SystemLevel } from '@/types/gql/graphql'

const systemLevels = Object.values(SystemLevel) as [string, ...string[]]

const codebookSchema = z.object({
  uid: z.string(),
  name: z.string(),
  description: z.string().optional(),
  code: z.string().optional()
})

const physicalItemSchema = z
  .object({
    uid: z.string().optional(),
    notes: z.string().optional().nullable(),
    serialNumber: z.string().optional().nullable(),
    conditionStatus: codebookSchema.optional().nullable(),
    itemUsage: codebookSchema.optional().nullable()
  })
  .optional()
  .nullable()

export const systemCreateSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  systemType: codebookSchema.optional().nullable(),
  systemLevel: z.enum(systemLevels, {
    message: 'System level is required'
  }),
  location: codebookSchema.optional().nullable(),
  zone: codebookSchema.optional().nullable(),
  systemCode: z.string().optional().nullable(),
  attribute: codebookSchema.optional().nullable(),
  responsible: codebookSchema.optional().nullable(),
  description: z.string().optional().nullable()
})

// Schema for system updates - includes all fields that can be updated
export const systemUpdateSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  systemType: codebookSchema.optional().nullable(),
  systemLevel: z.enum(systemLevels, {
    message: 'System level is required'
  }),
  location: codebookSchema.optional().nullable(),
  zone: codebookSchema.optional().nullable(),
  systemCode: z.string().optional().nullable(),
  attribute: codebookSchema.optional().nullable(),
  responsible: codebookSchema.optional().nullable(),
  description: z.string().optional().nullable(),
  responsibleTeam: codebookSchema.optional().nullable(),
  minimalSpareParstCount: z.number().optional().nullable(),
  operators: z.array(codebookSchema).optional().nullable(),
  maintainedBy: z.array(codebookSchema).optional().nullable(),
  physicalItem: physicalItemSchema
})

export type SystemCreateFormData = z.infer<typeof systemCreateSchema>
export type SystemUpdateFormData = z.infer<typeof systemUpdateSchema>
