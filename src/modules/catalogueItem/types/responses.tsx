import type { CodebookType } from '@/types/responses/codebook'

// API response/request type - details as array
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

// Form type - details as object with UID keys
// NOTE: Use CatalogueItemFormData from ItemForm.schema.ts for form handling
// This interface is kept for backwards compatibility with API responses
export interface CatalogueItemForm {
  catalogueNumber: string
  name: string
  description?: string
  categoryPath?: string
  categoryName?: string
  category: CodebookType | null
  supplier?: CodebookType | null
  manufacturerUrl?: string
  details?: CatalogueItemDetail[] | Record<string, CatalogueItemDetail>
  hasImageGalleryChanges?: boolean
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
