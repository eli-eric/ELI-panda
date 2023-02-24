export type System = {
  uid: string
  name: string
  children: string[]
  path: string[]
  description: string
  systemCode: string
  systemAlias: string
  locationCode: string
  catalogueUID?: string
  ownerUID?: string
  image?: string
  importanceCode?: string
  zoneCode?: string
  subZoneCode?: string
  systemTypeUID?: string
}

export type SystemProps = { data: System }

export type SystemForRel = {
  name: string
  systemType: string
  systemCodePath: string
  uid: string
}
