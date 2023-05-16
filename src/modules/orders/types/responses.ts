import type { DELIVERY_STATUS, ORDER_STATUS } from './types'

export type Order = {
  uid: string
  name: string
  orderNumber: number
  requestNumber: number
  contractNumber: number
  supplier: string
  requestor: string
  procurementResponsible: string
  orderStatus: ORDER_STATUS
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
