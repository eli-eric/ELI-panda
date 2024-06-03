import type { DELIVERY_STATUS } from '@/modules/orders/types'
import type { CodebookType } from '@/types/responses/codebook'

export type Order = {
  uid: string
  name: string
  orderNumber: number
  requestNumber: number
  contractNumber: number
  supplier: string
  requestor: string
  procurementResponsible: string
  orderStatus: CodebookType
  notes: string
  orderDate: string
  lastUpdateTime: string
  lastUpdateBy: string
  deliveryStatus: DELIVERY_STATUS
}

export type OrderListResponse = {
  data: Order[]
  totalCount: number
}
