export type Order = {
  uid: string
  name: string
  orderNumber: number
  requestNumber: number
  contractNumber: number
  supplier: string
  orderStatus: string
  notes: string
}

export type OrderListResponse = {
  data: Order[]
  totalCount: number
}
