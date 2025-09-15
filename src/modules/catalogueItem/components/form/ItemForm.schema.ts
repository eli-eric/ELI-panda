import z from 'zod'

const codebookSchema = z.object({
  uid: z.string(),
  name: z.string(),
  description: z.string().optional(),
  code: z.string().optional()
})

export const catalogoueSchema = z.object({
  uid: z.string().optional(),
  name: z.string().trim().min(1, 'Name is required'),
  catalogueNumber: z.string().trim().min(1, 'Part Number is required'),
  category: codebookSchema
    .nullable()
    .refine(val => val !== null, { message: 'Category is required' }),
  description: z.string().optional(),
  categoryPath: z.string().optional(),
  categoryName: z.string().optional(),
  supplier: codebookSchema.nullable().optional(),
  manufacturerUrl: z.string().optional(),
  details: z.record(z.string(), z.any()).nullable().optional(),
  lastUpdateTime: z.string().optional()
})

export type CatalogueFormData = z.infer<typeof catalogoueSchema>
