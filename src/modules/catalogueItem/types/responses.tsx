import type { CodebookType } from '@/types/responses/codebook'

export interface CatalogueItemForm {
  catalogueNumber: string
  name: string
  description?: string
  categoryPath?: string
  categoryName?: string
  category: CodebookType | null
  supplier?: CodebookType | null
  manufacturerUrl?: string
  details?: CatalogueItemDetail[]
}

export interface CatalogueItem {
  uid: string
  catalogueNumber: string
  name: string
  description?: string
  categoryPath?: string
  categoryName?: string
  category: CodebookType | null
  supplier?: CodebookType | null
  manufacturerUrl?: string
  details?: CatalogueItemDetail[]
  lastUpdateTime: string
}

export interface CatalogueItemDetail {
  propertyGroup: string
  value?: any
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
