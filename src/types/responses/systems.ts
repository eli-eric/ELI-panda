import type { CatalogueItem } from '@/modules/catalogueItem/types/responses'
import type { SystemLevel } from '@/types/gql/graphql'
import type { CodebookType } from '@/types/responses/codebook'

export type SystemsResponse = {
  data: SystemDetail[]
  totalCount: number
}

type SystemStatistics = {
  subsystemsCount?: number
  sparePartsCount?: number
  minimalSpareParstCount?: number
  sp_coverage?: number
}

export type SystemDetail = {
  uid: string
  name: string
  sparesIn?: number
  sparesOut?: number
  parentUid?: string
  systemLevel?: SystemLevel
  systemCode?: string
  systemType?: CodebookType
  attribute?: CodebookType
  zone?: CodebookType
  location?: CodebookType
  description?: string
  responsible?: CodebookType
  importance?: CodebookType
  physicalItem?: PhysicalItem
  parentPath?: CodebookType[]
  hasSubsystems?: boolean
  subSystems?: SystemDetail[]
  statistics?: SystemStatistics
  miniImageUrl?: string[]
}

export type PhysicalItem = {
  uid?: string
  conditionStatus?: CodebookType
  itemUsage?: CodebookType
  price?: number
  currency?: string
  notes?: string
  eun?: string
  serialNumber?: string
  catalogueItem?: CatalogueItem
  properties?: PhysicalItemProperty[]
  orderNumber?: string
  orderUid?: string
}
export type ItemProperty = {
  uid: string
  name: string
  listOfValues?: string[]
  defaultValue?: string
  type: CodebookType
  unit?: CodebookType
}

export interface PhysicalItemProperty {
  value?: any
  property: ItemProperty
}
