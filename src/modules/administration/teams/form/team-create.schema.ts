import { z } from 'zod'

export const teamCreateSchema = z.object({
    name: z.string().trim().min(1, 'Name is required'),
    code: z.string().optional(),
    description: z.string().optional(),
})

export type TeamCreateData = z.infer<typeof teamCreateSchema>
