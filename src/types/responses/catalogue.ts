import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import type { CodebookType } from '@/types/responses/codebook'

export interface CatalogueItem {
  uid: string
  name: string
  description: string
  category: CodebookType
  supplier?: CodebookType
  manufacturerUrl: string
  catalogueNumber: string
  miniImageUrl?: string[]
  lastUpdateTime: string
  lastUpdateBy: string
  details?: CatalogueItemDetail[]
}

export interface CatalogueItemsResponse {
  totalCount: number
  data: CatalogueItem[]
}
