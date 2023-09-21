interface CategoryParentPath {
  uid: string
  name: string
}

export interface CatalogueCategory {
  uid: string
  name: string
  code: string
  image?: string
  subCategories?: CatalogueCategoryResponse[]
  parentPath: CategoryParentPath[]
}

export interface CatalogueCategoryResponse {
  catalogueCategories: CatalogueCategory[]
}
