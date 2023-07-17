import type { CodebookType } from '@/hooks/fetch/useCodebook'

export interface CatalogueItem {
  uid: string
  catalogueNumber: string
  name: string
  description: string
  categoryPath: string
  category: CodebookType
  supplier: CodebookType
  manufacturerUrl: string
  details?: CatalogueItemDetail[]
}

export interface CatalogueItemDetail {
  propertyGroup: string
  value?: string
  property: CatalogueCategoryProperty
}

export type CatalogueCategoryProperty = {
  listOfValues: string[]
  defaultValue: string
  type: CodebookType
  unit?: CodebookType
}
