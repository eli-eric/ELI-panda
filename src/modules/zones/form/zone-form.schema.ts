import { z } from 'zod'

export const zoneSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    code: z.string().min(1, 'Code is required'),
    parentUid: z.string().nullable().optional(),
})

export type ZoneFormData = z.infer<typeof zoneSchema>
