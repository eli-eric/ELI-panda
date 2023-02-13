export type Value = {
  value: string
}

export type Property = {
  name: string
  typeUID: string
  unitUID: string
  default: string
  listOfValues?: Value[]
}
export type Group = {
  name: string
  properties: Property[]
}

export type CatalogueFormType = {
  name: string
  code: string
  image: string
  groups: Group[]
}
