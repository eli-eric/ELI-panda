import { z } from 'zod'

export const teamSchema = z.object({
    team: z
        .object({
            uid: z.string(),
            name: z.string(),
        })
        .nullable()
        .refine(val => val !== null, {
            message: 'Team is required',
        }),
})

export type TeamFormData = z.infer<typeof teamSchema>
