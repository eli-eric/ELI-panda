import { CatalogueItemsResponse } from './../catalogue/catalogue-mock-data'
import systemInfo from './data/systems.json'
import systemTree from './data/systems-tree.json'

export interface SystemTreeItem {
  name: string
  uid: string
  systemCode: string
  children?: SystemTreeItem[]
}

export const SystemsTree: Array<SystemTreeItem> = systemTree
export const SystemDetail: Array<SystemInfo> = systemInfo

export interface SystemInfo {
  uid: string
  //system info part
  name: string
  description?: string
  //importances: [{code: "low", value: "Low"},{code: "standard", value: "Standard"},{code: "high", value: "High"},{code: "vhigh", value: "V.High"}]
  importanceCode?: string
  //zones: [{code: "l1", value: "L1"},{code: "other", value: "Other"}]
  zoneCode?: string
  //systemTypes: [{uid: "vacuum-technology/vacuum-pumps/turbomolecular-pumps", value: "Vacuum technology -> Vacuum pumps -> Turbomolecular Pumps", code: "TMP"}, {uid: "motion/actuators/motorized-actuators", value: "Motion -> Actuators -> Motorized actuators", code: "MOTA"},{uid: "other", value: "Other", code: "OTHR"}]
  systemTypeUID?: string
  systemCode: string // READONLY!  ( in next version it will be automaticaly calculated from systemType mask - for now copy there systemType.code)
  systemAlias: string //max 12chars
  //locations: [{code : "l1", value: "L1"},{code : "l2", value: "L2"},{code : "l3", value: "L3"}]
  locationCode: string
  //list of users {uid, fullName}
  ownerUID?: string
  //selection of catalogue item
  catalogueUID: string
  //item info part
  eun: string
  serialNumber?: string
  batchNumber?: string
  //itemUsageCategories: [{code: "insystem", value: "In-System"},{code: "sparepart", value: "Spare Part"},{code: "stockitem", value: "Stock Item"},{code: "testmeasure", value: "Test and measurement equipment"}, {code: "exploan", value: "Experimental loan pool part"},{code :"other", value : "Other"}]
  itemUsageCategoryCode: string
  estimatedLifeTime: number
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
