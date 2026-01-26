import { z } from 'zod'

const codebookSchema = z.object({
  uid: z.string().min(1, 'UID is required'),
  name: z.string().min(1, 'Name is required')
})

export const grantSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  name: z.string().min(1, 'Name is required'),
  grantGroup: codebookSchema.nullable().optional()
})

export type GrantFormData = z.infer<typeof grantSchema>
