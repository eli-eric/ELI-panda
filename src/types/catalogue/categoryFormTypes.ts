import type { CodebookType } from '@/hooks/fetch/useCodebook'

export type Value = {
  value: string
}

export type Property = {
  uid?: string
  name: string
  type?: CodebookType | null
  unit?: CodebookType | null
  defaultValue?: string | null
  listOfValues?: Value[] | string[]
}
export type Group = {
  uid?: string
  name: string
  properties: Property[]
}

export type CategoryFormType = {
  parentUID?: string
  uid?: string
  name: string
  code: string
  image?: string
  groups?: Group[]
}
