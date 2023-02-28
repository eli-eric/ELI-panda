import { SystemForRel } from '../modules/systems/types'

export interface CatalogueCategoryResponse {
  uid: string
  name: string
  code: string
  parentPath: string
}

export interface CatalogueItemDetail {
  propertyName: string
  propertyGroup: string
  value: string | null
  propertyUnit: string | null
}

export interface CatalogueItem {
  uid: string
  name: string
  description: string
  categoryPath: string
  categoryName: string
  manufacturer: string
  manufacturerUrl: string
  manufacturerNumber: string
  details?: CatalogueItemDetail[]
}

export interface CatalogueItemsResponse {
  totalCount: number
  data: CatalogueItem[]
}

export interface SystemTreeItem {
  name: string
  uid: string
  open?: boolean
  systemCode: string
  children?: SystemTreeItem[]
  path: SystemUidName[]
}

type SystemUidName = [SystemTreeItem['uid'], SystemTreeItem['name']]

export interface SystemInfo {
  uid: string
  //system info part
  name: string
  description?: string
  //importances: [{code: "low", value: "Low"},{code: "standard", value: "Standard"},{code: "high", value: "High"},{code: "vhigh", value: "V.High"}]
  importanceCode?: string
  //zones: [{code: "l1", value: "L1"},{code: "other", value: "Other"}]
  zoneCode?: string
  //SubZones: [{code: "l1a", value: "L1a", zoneCode: "l1"},{code: "l1b", value: "L1b", zoneCode: "l1"}]
  subZoneCode?: string
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
  catalogueInfo?: CatalogueItem
}

export type SystemsForRelResponse = {
  data: SystemForRel[]
  totalCount: number
}

export type SystemRelationshipResponse = {
  direction: string
  relationTypeCode: string
  foreignSystemName: string
  relationUid: string
}
