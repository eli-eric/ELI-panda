import type { CodebookType } from '@/hooks/fetch/useCodebook'
import type { CatalogueItem } from '@/modules/catalogueItem/types/responses'
import type { SystemLevel } from '@/types/gql/graphql'

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
  systemLevel?: SystemLevel
  systemCode?: string // automaticky generovaný viz system edit - api dodá J.Š.
  systemAlias?: string // input
  systemType?: CodebookType // ListBox
  zone?: CodebookType // combobox
  location?: CodebookType // combobox - CODEBOOK.LOCATION
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
  uid?: string
  conditionStatus?: CodebookType
  itemUsage?: CodebookType // combobox - CODEBOOK.ITEM_USAGE
  price?: number // input
  currency?: string
  notes?: string
  eun?: string // input
  serialNumber?: string // input
  catalogueItem?: CatalogueItem
}
