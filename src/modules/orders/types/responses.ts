export type Order = {
  uid: string
  name: string
  orderNumber: number
  requestNumber: number
  contractNumber: number
  supplier: string
  requestor: string
  procurementResponsible: string
  orderStatus: string
  notes: string
  orderDate: string
  lastUpdateTime: string
  lastUpdateBy: string
}

export type OrderListResponse = {
  data: Order[]
  totalCount: number
}
