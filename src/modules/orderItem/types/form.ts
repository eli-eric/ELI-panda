import { FieldValues } from 'react-hook-form'

export interface OrderFormType extends FieldValues {
  uid: string
  name: string
  orderNumber: number
  requestNumber: number
  contractNumber: number
  supplier: string
  orderStatus: string
  orderDate: string
  notes: string
  orderLines: OrderLine[]
}

export type OrderLine = {
  id: string
  uid: string
  name: string
  catalogueNumber: number
  system: {
    uid: string
    name: string
  }
  price: number
  quantity: number
}
