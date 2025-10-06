import { z } from 'zod'

import type { CodebookType } from '@/types/responses/codebook'

// Reusable codebook schema
const codebookSchema = z
  .object({
    uid: z.string(),
    name: z.string(),
    additionalData: z.string().optional(),
    code: z.string().optional()
  })
  .nullable()

// Schema for catalogue category property
const catalogueCategoryPropertySchema = z.object({
  uid: z.string(),
  name: z.string(),
  listOfValues: z.array(z.string()).optional(),
  defaultValue: z.string().optional(),
  type: z.object({
    uid: z.string(),
    name: z.string(),
    code: z.string().optional()
  }),
  unit: z
    .object({
      uid: z.string(),
      name: z.string()
    })
    .optional()
})

// Schema for a single catalogue item detail
const catalogueItemDetailSchema = z.object({
  property: catalogueCategoryPropertySchema,
  propertyGroup: z.string(),
  value: z.any().optional()
})

// Main catalogue item form schema
export const catalogueItemSchema = z.object({
  uid: z.string().optional(),
  name: z.string().trim().min(1, 'Name is required'),
  catalogueNumber: z.string().trim().min(1, 'Part Number is required'),
  category: codebookSchema.refine(val => val !== null, {
    message: 'Category is required'
  }),
  description: z.string().optional(),
  categoryPath: z.string().optional(),
  categoryName: z.string().optional(),
  supplier: codebookSchema.optional(),
  manufacturerUrl: z.string().optional(),
  lastUpdateTime: z.string().optional(),
  hasImageGalleryChanges: z.boolean().optional(),
  // Details as a record/object with UID keys instead of array
  // This matches the form structure where details are stored as { [propertyUid]: detail }
  details: z.record(z.string(), catalogueItemDetailSchema).optional()
})

// Export TypeScript type inferred from schema
export type CatalogueItemFormData = z.infer<typeof catalogueItemSchema>

// Type guard to check if a value is a CodebookType
export const isCodebookType = (value: unknown): value is CodebookType => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'uid' in value &&
    'name' in value
  )
}
