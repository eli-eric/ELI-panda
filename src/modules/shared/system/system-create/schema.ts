import { z } from 'zod'

import { SystemLevel } from '@/types/gql/graphql'

const codebookSchema = z.object({
  uid: z.string(),
  name: z.string(),
  description: z.string().optional(),
  code: z.string().optional()
})

export const systemCreateSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  systemType: codebookSchema.optional().nullable(),
  systemLevel: z.nativeEnum(SystemLevel, {
    error: 'System level is required'
  }),
  location: codebookSchema.optional().nullable(),
  zone: codebookSchema.optional().nullable(),
  systemCode: z.string().optional().nullable(),
  attribute: codebookSchema.optional().nullable(),
  description: z.string().optional().nullable()
})

export type SystemCreateFormData = z.infer<typeof systemCreateSchema>
