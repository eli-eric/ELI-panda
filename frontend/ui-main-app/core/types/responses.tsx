export interface CatalogueCategoryResponse {
  uid: string
  name: string
  code: string
  parentPath: string
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
}

export interface CatalogueItemResponse {
  totalCount: number
  data: CatalogueItem[]
}
