import type { FieldValues } from 'react-hook-form'

import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
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
  serviceLines: ServiceLine[]
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

export interface ServiceLine extends FieldValues {
  uuid?: string
  uid?: string
  name: string
  serviceType: CodebookType
  item: CodebookType
  price: number
  currency: string
  notes?: string
  eun?: string
  serialNumber?: string
  isDelivered?: boolean
  lastUpdateTime?: string
  details?: CatalogueItemDetail[]
}

export interface ServiceLineFormType extends FieldValues {
  uuid?: string
  uid: string
  name: string
  serviceType: CodebookType
  items: ServiceLinePhysicalItem[]
  price: number
  currency: string
  notes?: string
  isDelivered?: boolean
  lastUpdateTime?: string
  details?: CatalogueItemDetail[]
}

export interface ServiceLinePhysicalItem extends CodebookType {
  serialNumber: string
  eun: string
}
