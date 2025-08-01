import { array, mixed, object, string } from 'yup'

import type { CodebookType } from '@/types/responses/codebook'

import type { CatalogueCategoryProperty } from '../../types/responses'

export const schema = object({
  uid: string(),
  name: string().required('Name is required'),
  catalogueNumber: string().required('Part Number is required'),
  category: mixed<CodebookType>().nullable().required('Category is required'),
  description: string(),
  categoryPath: string(),
  categoryName: string(),
  supplier: mixed<CodebookType>().nullable(),
  manufacturerUrl: string(),
  details: mixed().transform((value) => {
    // If it's an object with UID keys, convert to array
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return Object.values(value)
    }
    return value
  }).test('is-array-or-object', 'details must be valid', (value) => {
    // Allow either array or object with UID keys
    return Array.isArray(value) || (value && typeof value === 'object')
  })
})
