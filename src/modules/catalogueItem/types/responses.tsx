import type { CodebookType } from '@/hooks/fetch/useCodebook'

export interface CatalogueItem {
  uid: string
  name: string
  description: string
  categoryPath: string
  categoryName: string
  manufacturer: string
  manufacturerUrl: string
  manufacturerNumber: string
  catalogueNumber: string
  details?: CatalogueItemDetail[]
}

export interface CatalogueItemDetail {
  propertyGroup: string
  value: string | null
  property: CatalogueCategoryProperty
}

export type CatalogueCategoryProperty = {
  uid: string
  name: string
  listOfValues: string[]
  defaultValue: string
  type: CodebookType
  unit: CodebookType
}
