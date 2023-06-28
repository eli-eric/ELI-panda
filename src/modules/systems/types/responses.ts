import type { CodebookType } from '@/hooks/fetch/useCodebook'
import type { CatalogueItem } from '@/modules/catalogueItem/types/responses'

export type SystemsResponse = {
  data: SystemDetail[]
  totalCount: number
}

export type SystemDetail = {
  uid: string // from router
  name: string // input
  description?: string // textarea
  parentPath?: CodebookType[]
  location?: CodebookType // combobox - CODEBOOK.LOCATION
  zone?: CodebookType // combobox
  systemType?: CodebookType // ListBox
  systemCode?: string // automaticky generovaný viz system edit - api dodá J.Š.
  systemAlias?: string // input
  owner?: CodebookType // combobox - CODEBOOK.EMPLOYEE
  responsible?: CodebookType // combobox - CODEBOOK.EMPLOYEE
  importance?: CodebookType // listbox - CODEBOOK.SYSTEM_IMPORTANCE
  hasSubsystems: boolean
  subSystems?: SystemDetail[]
  physicalItem?: PhysicalItem
}

export type SystemListResponse = {
  data: SystemDetail[]
  totalCount: number
}

export type PhysicalItem = {
  uid: string
  itemUsage?: CodebookType // combobox - CODEBOOK.ITEM_USAGE
  price?: number // input
  currency?: string
  eun?: string // input
  serialNumber?: string // input
  catalogueItem: CatalogueItem
}
