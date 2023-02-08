export type Value = {
  value: string
}

export type Prop = {
  name: string
  typeUID: string
  unitUID: string
  default: string
  listOfValues?: Value[]
}
export type Group = {
  name: string
  props?: Prop[]
}

export type CatalogueFormType = {
  name: string
  code: string
  image: string
  groups?: Group[]
}
