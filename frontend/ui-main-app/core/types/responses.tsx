export interface CatalogueCategoryResponse {
  uid: string
  name: string
  code: string
  parentPath: string
}

export interface CatalogueItemDetail {
  propertyName: string
  propertyGroup: string
  value: string
  propertyUnit: string
}

export interface CatalogueItem {
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

export interface CatalogueItemsResponse {
  totalCount: number
  data: CatalogueItem[]
}
