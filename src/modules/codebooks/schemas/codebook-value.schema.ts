import { z } from 'zod'

export const codebookValueSchema = z.object({
    name: z.string().min(1, 'Name is required').max(255, 'Name must be at most 255 characters'),
})

export type CodebookValueSchema = z.infer<typeof codebookValueSchema>
