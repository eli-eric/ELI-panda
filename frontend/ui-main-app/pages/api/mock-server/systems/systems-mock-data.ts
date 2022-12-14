import { CatalogueItemsResponse } from '../catalogue/catalogue-mock-data'
import systemTree from './data/systems-tree.json'

export interface SystemTreeItem {
  name: string
  uid: string
  children?: SystemTreeItem[]
}

export const SystemsTree: Array<SystemTreeItem> = systemTree

export interface SystemInfo {
  name: string
  description: string
  importance: string // List: (0)Low, (1)Standard, (2)High, (3)V.High
  facilityZone: string
  type: string
  code: string
  alias: string
  location: string
  owner: string
}

export interface ItemInfo {
  eun: string
  serialNumber: string
  batchNumber: string // List: (0)Low, (1)Standard, (2)High, (3)V.High
  assetNumber: string
  itemUsageCategory: string // “Spare Part”, “In system Part”, “Experimental loan pool part” ,“Test and measurement equipment”, “Stock item”, “Other”
  activated: boolean
  conditionStatus: string
  estimatedLifetime: string
  obsolete: boolean
  createdBy: string
  note: string
}

export interface SystemDetailInfo {
  systemInfo: SystemInfo
  itemInfo?: ItemInfo
  catalogueInfo?: CatalogueItemsResponse
}
