import { SystemForRel } from '.'

export type SystemDetailResponse = {
  uid: string
  name: string
  parentPath: { name; uid }[]
  description?: string
  systemType?: string
  systemCode?: string
  systemAlias?: string
  location?: string
  itemUID?: string
  owner?: string
  importance?: string
  zone?: string
  subZoneCode?: string
  criticalityClass?: string
}

export type ParentPath = { name: string; uid: string }[]

export type SystemListResponse = {
  totalCount: number
  data: SystemDetailResponse[]
}

export type SubsystemsResponse = {
  name: string
  uid: string
}[]

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
