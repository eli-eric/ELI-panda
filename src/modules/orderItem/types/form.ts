import type { FieldValues } from 'react-hook-form'

import type { CodebookType } from '@/hooks/useCodebook'

export interface OrderDetailFormType extends FieldValues {
  uid: string
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

export type OrderLineFormType = {
  id?: string
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
  isDelivered?: boolean
}
