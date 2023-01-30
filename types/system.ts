export type System = {
  uid: string
  name: string
  children: SystemUidName[]
  path: SystemUidName[]
  description: string
  image?: string
  importanceCode?: string
  zoneCode?: string
  subZoneCode?: string
  systemCode: string
  systemAlias: string
  locationCode: string
  ownerUID?: string
  catalogueUID: string
  eun: string
  serialNumber?: string
  batchNumber?: string
  itemUsageCategoryCode: string
  estimatedLifeTime: number
}

export type SystemUidName = [System['uid'], System['name']]

export type SystemProps = { data: System }
export type SystemEditModeProps = { data: System; editMode: any }
