import items_with_details from './data/items-all-props.json'
import categories from './data/categories.json'

export interface CategoryResponse {
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
export interface CatalogueItemsResponse {
  uid: string
  name: string
  description: string
  categoryPath: string
  categoryName: string
  manufacturer: string
  manufacturerUrl: string
  manufacturerNumber: string
  details?: CatalogueItemDetail[]
}

export interface CatalogueItemPagingResponse {
  totalCount: number
  data: CatalogueItemsResponse[]
}

export const CatalogueItems: Array<CatalogueItemsResponse> = items_with_details

export const CatalogueCategories: Array<CategoryResponse> = categories
