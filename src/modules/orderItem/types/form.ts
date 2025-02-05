import type { FieldValues } from 'react-hook-form'

import type { CodebookType } from '@/types/responses/codebook'

export interface OrderDetailFormType extends FieldValues {
  uid: string
  lastUpdateTime?: string
  name: string
  orderNumber: number
  requestNumber: number
  contractNumber: number
  notes: string
  supplier: CodebookType
  orderStatus: CodebookType

  procurementResponsible: CodebookType
  requestor: CodebookType

  orderDate: string
  orderLines: OrderLineFormType[]
}

export interface OrderLineFormType extends FieldValues {
  uuid?: string
  uid: string
  name: string
  catalogueUid?: string
  catalogueNumber: string
  system?: CodebookType
  location?: CodebookType
  itemUsage?: CodebookType
  price?: number
  currency?: string
  quantity?: number
  eun?: string
  notes?: string
  isDelivered?: boolean
  serialNumber?: string
  lastUpdateTime?: string
  serialNumbers?: string
}
