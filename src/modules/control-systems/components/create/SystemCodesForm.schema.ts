import { z } from 'zod'

import { codebookTypeSchema } from '../../types/schemas'

export const systemCodesFormSchema = z.object({
  zone: codebookTypeSchema.nullable().refine(val => val !== null, {
    message: 'Zone is required'
  }),
  systemType: codebookTypeSchema.nullable().refine(val => val !== null, {
    message: 'System type is required'
  }),
  batch: z.coerce
    .number()
    .min(1, 'Batch must be at least 1')
    .max(100, 'Batch cannot exceed 100')
})

// Input type - form state during editing (nullable fields)
export type SystemCodesFormInput = z.input<typeof systemCodesFormSchema>

// Output type - validated values after submit (non-null fields)
export type SystemCodesFormValues = z.output<typeof systemCodesFormSchema>
