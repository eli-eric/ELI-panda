import { useRouter } from 'next/router'
import { object, string } from 'yup'

import { OrderFormType } from '../../types'
import OrderFormComponent from './OrderForm.comp'

// změnit schema na order
const schema = object({
  name: string().required(),
  supplier: string(),
  orderStatus: string(),
  orderNumber: string(),
  requestNumber: string(),
  contractNumber: string(),
  notes: string(),
  orderDate: string()
})

interface Props {
  data?: OrderFormType
  uid?: string
}

const OrderFormContainer = ({ data }: Props) => {
  const router = useRouter()
  // změni type na order

  return <OrderFormComponent />
}

export default OrderFormContainer
