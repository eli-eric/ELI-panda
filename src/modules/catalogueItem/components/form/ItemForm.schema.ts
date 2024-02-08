import { array, mixed, object, string } from 'yup'

import type { CodebookType } from '@/hooks/fetch/useCodebook'

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
  details: array().of(
    object({
      propertyGroup: string().required(),
      value: mixed<any>().nullable(),
      property: mixed<CatalogueCategoryProperty>().nullable().required()
    })
  )
})
