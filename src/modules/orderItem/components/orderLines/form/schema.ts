import { z } from 'zod'

// Codebook schema for reusable codebook objects
const codebookSchema = z.object({
  uid: z.string(),
  name: z.string(),
  description: z.string().optional(),
  code: z.string().optional()
})

// System configuration schema for Step 3
const systemConfigSchema = z.object({
  index: z.number(),
  itemName: z.string(),
  parentSystem: codebookSchema.nullable(),
  systemType: z.enum(['new', 'existing']),
  systemName: z.string(),
  selectedSystem: codebookSchema.optional().nullable()
})

// Order Line Wizard form validation schema (includes wizard-specific fields)
export const orderLineWizardSchema = z
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
    itemUsage: codebookSchema.optional().nullable(),

    // Wizard-specific fields (Step 3 system configuration)
    globalParentSystem: codebookSchema.optional().nullable(),
    systemConfigs: z.array(systemConfigSchema).optional()
  })
  .passthrough()

// Alias for compatibility
export const orderLineSchema = orderLineWizardSchema

export type OrderLineFormData = z.infer<typeof orderLineWizardSchema>
