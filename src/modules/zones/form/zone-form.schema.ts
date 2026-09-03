import { z } from 'zod'

const codebookSchema = z.object({
    uid: z.string(),
    name: z.string(),
    code: z.string().nullable().optional(),
})

export const zoneSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    code: z.string().min(1, 'Code is required'),
    parentUid: z.string().nullable().optional(),
    defaultParentSystem: codebookSchema.nullable().optional(),
    notes: z.string().nullable().optional(),
})

export type ZoneFormData = z.infer<typeof zoneSchema>
