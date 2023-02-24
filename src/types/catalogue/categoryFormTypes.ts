export type Value = {
  value: string
}

export type Property = {
  uid?: string
  name: string
  typeUID: string
  unitUID: string
  defaultValue: string
  listOfValues?: Value[] | string[]
}
export type Group = {
  uid?: string
  name: string
  properties: Property[]
}

export type CategoryFormType = {
  parentPath?: string
  uid?: string
  name: string
  code: string
  image?: string
  groups: Group[]
}
