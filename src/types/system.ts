export type System = {
  uid: string
  name: string
  children: SystemUidName[]
  path: SystemUidName[]
  description: string
  systemCode: string
  systemAlias: string
  locationCode: string
  catalogueUID: string
  eun: string
  itemUsageCategoryCode: string
  estimatedLifeTime: number
  ownerUID?: string
  image?: string
  importanceCode?: string
  zoneCode?: string
  subZoneCode?: string
  serialNumber?: string
  batchNumber?: string
}

export type SystemUidName = [System['uid'], System['name']]

export type SystemProps = { data: System }
export type SystemEditModeProps = { data: System; editMode: any }

export type SystemList = Array<{ name: string; systemType: string; systemCodePath: string; uid: string }>

export type SystemRelationship = {
  direction: string
  relationTypeCode: string
  foreignSystemName: string
  relationUid: string
}
