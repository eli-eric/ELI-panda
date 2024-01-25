import type { CodebookType } from '@/hooks/fetch/useCodebook'

export interface CatalogueItem {
  uid?: string
  catalogueNumber: string
  name: string
  description?: string
  categoryPath?: string
  categoryName?: string
  category: CodebookType
  supplier?: CodebookType | null
  manufacturerUrl?: string
  details?: CatalogueItemDetail[]
}

export interface CatalogueItemDetail {
  propertyGroup: string
  value?: string
  property: CatalogueCategoryProperty
}

export type CatalogueCategoryProperty = {
  uid: string
  name: string
  listOfValues?: string[]
  defaultValue?: string
  type: CodebookType
  unit?: CodebookType
}
