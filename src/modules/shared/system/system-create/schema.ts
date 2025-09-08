import { z } from 'zod'

import { SystemLevel } from '@/types/gql/graphql'

const systemLevels = Object.values(SystemLevel) as [string, ...string[]]

const codebookSchema = z.object({
  uid: z.string(),
  name: z.string(),
  description: z.string().optional(),
  code: z.string().optional()
})

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

export type SystemCreateFormData = z.infer<typeof systemCreateSchema>
