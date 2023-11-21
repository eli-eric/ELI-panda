import type { TableResponse } from '@/modules/shared/table/pandaTable/types/responses'
import type { CatalogueItem } from '@/types/responses'

export interface CatalogueCategoryResponse {
  uid: string
  name: string
  code: string
  parentPath: string
}

export type CatalogueItemsResponse = TableResponse<CatalogueItem> | undefined
