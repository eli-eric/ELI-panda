import { z } from 'zod'

export const buildTeamCreateSchema = (nameRequired: string) =>
    z.object({
        name: z.string().trim().min(1, nameRequired),
        code: z.string().optional(),
        description: z.string().optional(),
    })

// Default instance (used for the inferred type and unit tests); the dialog
// rebuilds it with a translated `nameRequired` message.
export const teamCreateSchema = buildTeamCreateSchema('Name is required')

export type TeamCreateData = z.infer<typeof teamCreateSchema>
