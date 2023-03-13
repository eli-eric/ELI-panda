import { FieldValues } from 'react-hook-form'

export interface SystemEditFormType extends FieldValues {
  name: string
  parentUID?: string // parent system uid
  description?: string
  systemTypeUID?: string // system types codebook - SYSTEM_TYPE
  systemCode?: string
  systemAlias?: string
  locationUID?: string // locations codebook - LOCATION
  itemUID?: string // connected item -> then connected catalogueUID -> catalogue item
  ownerUID?: string // codebook of users{uid, name}  - USER
  importanceUID?: string // codebook of importance - SYSTEM_IMPORTANCE
  zoneUID?: string // codebook of zones - ZONE
}

export interface SystemItemFormType extends FieldValues {
  catalogueItemUID?: string
  itemUsageUID: string
  eun: string
  name: string
  serialNumber: string
  batchNumber: string
  obsolete: string
  estimatedLifeTimeMonths: string
  desctription: string
  conditionStatusUID: string
}

export interface RelationFormType extends FieldValues {
  systemFromUid: string
  relationTypeCode: string
  systemToUid: string
}
