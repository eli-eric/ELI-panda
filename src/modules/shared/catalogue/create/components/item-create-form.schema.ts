import { z } from 'zod'

import { message } from '@/i18n/src/messages'
import type { CodebookType } from '@/types/responses/codebook'

const { validation } = message.cataloguePage.itemDetail

/**
 * Zod schema for catalogue item creation form
 *
 * @param fm - Intl format message function for i18n validation messages
 * @returns Zod schema with localized error messages
 */
export const createItemSchema = (fm: (descriptor: { id: string }) => string) =>
  z.object({
    name: z
      .string()
      .min(1, fm({ id: validation.nameRequired }))
      .max(255, fm({ id: validation.nameTooLong })),
    catalogueNumber: z
      .string()
      .min(1, fm({ id: validation.catalogueNumberRequired }))
      .max(100, fm({ id: validation.catalogueNumberTooLong })),
    category: z
      .custom<CodebookType>(
        val =>
          val &&
          typeof val === 'object' &&
          'uid' in val &&
          'name' in val &&
          typeof val.uid === 'string',
        {
          message: fm({ id: validation.categoryRequired })
        }
      )
      .refine(val => val !== null && val !== undefined, {
        message: fm({ id: validation.categoryRequired })
      }),
  })

/**
 * TypeScript type inferred from the Zod schema
 */
export type ItemCreateFormData = z.infer<ReturnType<typeof createItemSchema>>
