import { z } from 'zod'

import { SYSTEM_LEVELS, type SystemLevel } from '@/types/constants/systemLevel'

const systemLevels = SYSTEM_LEVELS as unknown as [SystemLevel, ...SystemLevel[]]

const codebookSchema = z.object({
    uid: z.string(),
    name: z.string(),
    description: z.string().optional(),
    code: z.string().optional().nullable(),
})

export const systemCreateSchema = z.object({
    name: z.string().trim().min(1, 'Name is required'),
    systemType: codebookSchema.optional().nullable(),
    systemLevel: z.enum(systemLevels, {
        message: 'System level is required',
    }),
    location: codebookSchema.optional().nullable(),
    zone: codebookSchema.optional().nullable(),
    systemCode: z.string().optional().nullable(),
    attribute: codebookSchema.optional().nullable(),
    responsible: codebookSchema.optional().nullable(),
    description: z.string().optional().nullable(),
})

export type SystemCreateFormData = z.infer<typeof systemCreateSchema>
