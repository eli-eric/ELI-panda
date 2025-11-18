import { z } from 'zod'

// Codebook schema for reusable codebook objects
const codebookSchema = z.object({
  uid: z.string(),
  name: z.string(),
  description: z.string().optional(),
  code: z.string().optional()
})

// Order Line form validation schema
export const orderLineSchema = z
  .object({
    // Metadata fields (prefixed with _ to indicate they're not submitted to backend)
    // Used for UI state management and persistence during wizard navigation
    _selectedCatalogueItem: z.any().optional(),

    // Required fields
    name: z.string().trim().min(1, 'Name is required'),
    catalogueNumber: z.string().trim().min(1, 'Catalogue number is required'),

    // Optional fields with coercion
    catalogueUid: z.string().optional(),
    price: z.coerce.number().positive().optional().nullable(),
    currency: z.string().default('EUR'),
    quantity: z.coerce.number().int().positive().max(100).optional().nullable(),
    serialNumbers: z.string().optional().nullable(),

    // Codebook fields
    system: codebookSchema.optional().nullable(),
    itemUsage: codebookSchema.optional().nullable()
  })
  .passthrough()

export type OrderLineFormData = z.infer<typeof orderLineSchema>
