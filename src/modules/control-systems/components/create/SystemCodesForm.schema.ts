import { z } from 'zod'

import { BATCH_LIMIT } from '../../types/constants'
import { codebookTypeSchema } from '../../types/schemas'

export const systemCodesFormSchema = z.object({
    zone: codebookTypeSchema.nullable().refine(val => val !== null, {
        message: 'Zone is required',
    }),
    systemType: codebookTypeSchema.nullable().refine(val => val !== null, {
        message: 'System type is required',
    }),
    // Anything above BATCH_LIMIT is silently truncated by preview and create alike, so
    // the schema has to reject it rather than let the form report a batch it never got.
    batch: z.coerce
        .number()
        .min(1, 'Batch must be at least 1')
        .max(BATCH_LIMIT, `Batch cannot exceed ${BATCH_LIMIT}`),
})

// Input type - form state during editing (nullable fields)
export type SystemCodesFormInput = z.input<typeof systemCodesFormSchema>

// Output type - validated values after submit (non-null fields)
export type SystemCodesFormValues = z.output<typeof systemCodesFormSchema>
