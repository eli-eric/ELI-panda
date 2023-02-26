import { FieldValues } from 'react-hook-form'

export interface SystemItemFormType extends FieldValues {
  catalogueItemUID?: string
  itemUsageUID: string
  eun: string
  name: string
  serialNumber: string
  batchNumber: string
  obsolete: string
  estimatedLifeTimeMonths: string
}
