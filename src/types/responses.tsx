import type { CodebookType } from '@/hooks/fetch/useCodebook'

export interface CatalogueCategoryResponse {
  uid: string
  name: string
  code: string
  parentPath: string
}

export interface CatalogueItemDetail {
  propertyName: string
  propertyGroup: string
  value: string | null
  propertyUnit: string | null
}

export interface CatalogueItem {
  uid: string
  name: string
  description: string
  categoryPath: string
  categoryName: string
  supplier?: CodebookType
  manufacturerUrl: string
  catalogueNumber: string
  details?: CatalogueItemDetail[]
}

export interface CatalogueItemsResponse {
  totalCount: number
  data: CatalogueItem[]
}
