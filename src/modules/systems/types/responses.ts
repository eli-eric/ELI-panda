import type { CodebookType } from '@/hooks/fetch/useCodebook'
import type { CatalogueItem } from '@/modules/catalogueItem/types/responses'

export type SystemsResponse = {
  data: SystemDetail[]
  totalCount: number
}

type SystemStatistics = {
  subsystemsCount?: number
  sparePartsCount?: number
}

export type SystemDetail = {
  uid: string // from router
  name: string // input
  parentUid?: string
  systemCode?: string // automaticky generovaný viz system edit - api dodá J.Š.
  systemAlias?: string // input
  systemType?: CodebookType // ListBox
  zone?: CodebookType // combobox
  location?: CodebookType // combobox - CODEBOOK.LOCATION
  owner?: CodebookType // combobox - CODEBOOK.EMPLOYEE
  description?: string // textarea
  responsible?: CodebookType // combobox - CODEBOOK.EMPLOYEE
  importance?: CodebookType // listbox - CODEBOOK.SYSTEM_IMPORTANCE
  physicalItem?: PhysicalItem
  parentPath?: CodebookType[]
  hasSubsystems?: boolean
  subSystems?: SystemDetail[]
  statistics?: SystemStatistics
}

export type SystemListResponse = {
  data: SystemDetail[]
  totalCount: number
}

export type PhysicalItem = {
  uid?: string | null
  itemUsage?: CodebookType | null // combobox - CODEBOOK.ITEM_USAGE
  price?: number | null // input
  currency?: string
  eun?: string // input
  serialNumber?: string // input
  catalogueItem?: CatalogueItem
}
