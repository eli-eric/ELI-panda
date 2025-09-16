import type { CodebookType } from '@/types/responses/codebook'

export type Property = {
  uid?: string
  name: string
  type?: CodebookType | null
  unit?: CodebookType | null
  defaultValue?: string | null
  listOfValues?: string[]
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
  systemType?: CodebookType | null
  code: string
  image?: string
  groups?: Group[] | null
  physicalItemProperties?: Property[]
}
