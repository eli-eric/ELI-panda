import type { CatalogueItem } from '@/modules/catalogueItem/types/responses'
import type { TableResponse } from '@/modules/shared/table/pandaTable/types/responses'

export interface CatalogueCategoryResponse {
  uid: string
  name: string
  code: string
  parentPath: string
}

export type CatalogueItemsResponse = TableResponse<CatalogueItem> | undefined
