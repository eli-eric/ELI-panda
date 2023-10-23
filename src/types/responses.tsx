import type { CodebookType } from '@/hooks/fetch/useCodebook'
import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'

export interface CatalogueCategoryResponse {
  uid: string
  image?: string
  name: string
  code: string
  parentPath: string
}

export interface CatalogueItem {
  uid: string
  name: string
  description: string
  categoryUID: string
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
