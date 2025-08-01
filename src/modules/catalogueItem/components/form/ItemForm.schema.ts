import { mixed, object, string } from 'yup'

import type { CodebookType } from '@/types/responses/codebook'

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
  details: mixed()
    .nullable()
    .transform(value => {
      // If it's an object with UID keys, convert to array
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return Object.values(value)
      }
      return value
    })
    .test('is-array-or-object-or-null', 'details must be valid', value => {
      // Allow null, undefined, array, or object with UID keys
      return (
        value === null ||
        value === undefined ||
        Array.isArray(value) ||
        (value && typeof value === 'object')
      )
    })
})
