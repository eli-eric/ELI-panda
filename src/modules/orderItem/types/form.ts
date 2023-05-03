import { FieldValues } from 'react-hook-form'

import { CodebookType } from '@/hooks/useCodebook'

export interface OrderDetailFormType extends FieldValues {
  uid: string
  name: string
  orderNumber: number
  requestNumber: number
  contractNumber: number
  notes: string
  supplier: CodebookType
  orderStatus: CodebookType
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
  priceEur?: number
  quantity?: number
}
