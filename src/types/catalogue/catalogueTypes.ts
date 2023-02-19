export type Value = {
  value: string
}

export type Property = {
  uid?: string
  name: string
  typeUID: string
  unitUID: string
  default: string
  listOfValues?: Value[] | string[]
}
export type Group = {
  uid?: string
  name: string
  properties: Property[]
}

export type CatalogueFormType = {
  parentUid?: string
  uid?: string
  name: string
  code: string
  image?: string
  groups: Group[]
}

export type CatalogueCategoryResponse = {
  parentUid?: string
  name: string
  code: string
  image: string
  groups: Group[]
}
