import { SystemForRel } from '.'

export type SystemCodebok = { uid: string; name: string }

export type SystemDetailResponse = {
  uid: string
  name: string
  parentPath?: ParentPath
  description?: string
  location?: SystemCodebok
  zone?: SystemCodebok
  systemType?: SystemCodebok
  systemCode?: string
  systemAlias?: string
  owner?: SystemCodebok
  importance?: SystemCodebok
  itemUID?: string
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
