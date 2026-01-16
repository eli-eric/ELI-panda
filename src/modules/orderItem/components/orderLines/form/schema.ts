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
  selectedSystem: codebookSchema.optional().nullable(),
  serialNumber: z.string().optional()
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
    price: z.preprocess(
      val => (val === '' || val === null || val === undefined ? undefined : val),
      z.coerce.number().positive().optional().nullable()
    ),
    currency: z.string().default('EUR'),
    // Use preprocess to convert empty string to undefined BEFORE coercion
    // This prevents "" -> 0 -> fails .positive() issue
    quantity: z.preprocess(
      val => (val === '' || val === null || val === undefined ? undefined : val),
      z.coerce.number().int().positive().max(100).optional().nullable()
    ),
    serialNumbers: z.string().optional().nullable(),

    // Codebook fields
    system: codebookSchema.optional().nullable(),
    itemUsage: codebookSchema.optional().nullable(),

    // Wizard-specific fields (Step 3 system configuration)
    globalParentSystem: codebookSchema.optional().nullable(),
    systemConfigs: z.array(systemConfigSchema).optional()
  })
  .passthrough()
  .superRefine((data, ctx) => {
    const hasQuantity =
      data.quantity !== null && data.quantity !== undefined && data.quantity > 0
    const hasSerialNumbers =
      data.serialNumbers && data.serialNumbers.trim().length > 0

    // Mutual exclusivity: either quantity OR serialNumbers, not both
    if (hasQuantity && hasSerialNumbers) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please fill either Quantity or Serial Numbers, not both',
        path: ['serialNumbers']
      })
      return
    }

    // At least one must be provided
    if (!hasQuantity && !hasSerialNumbers) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Either Quantity or Serial Numbers is required',
        path: ['quantity']
      })
      return
    }

    // Validate serial numbers if provided
    if (hasSerialNumbers) {
      const serialNumbersStr = data.serialNumbers!
      const parsed = serialNumbersStr
        .split(',')
        .map(sn => sn.trim())
        .filter(sn => sn.length > 0)

      // Check for duplicates
      if (parsed.length !== new Set(parsed).size) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Serial numbers must be unique (no duplicates)',
          path: ['serialNumbers']
        })
      }

      // Check max count (same as quantity max)
      if (parsed.length > 100) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Maximum 100 serial numbers allowed',
          path: ['serialNumbers']
        })
      }
    }
  })

// Alias for compatibility
export const orderLineSchema = orderLineWizardSchema

export type OrderLineFormData = z.infer<typeof orderLineWizardSchema>
