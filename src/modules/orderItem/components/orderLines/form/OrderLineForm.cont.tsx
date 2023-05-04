import { useState } from 'react'
import { number, object, string } from 'yup'

import useFormModal from '@/hooks/useFormModal'
import { OrderLineFormType } from '@/modules/orderItem/types'
import CatalogueSearchTable from '@/modules/systems/components/sections/catalogueItemSection/components/CatalogueSearchTable'
import { CatalogueItem } from '@/types/responses'

import OrderLineFormComponent from './OrderLineForm.comp'
interface Props {
  setOrderLine: (orderLines: OrderLineFormType) => void
  orderLine?: OrderLineFormType
  index?: number
}

const orderLineFormSchema = object({
  name: string().required(),
  catalogueNumber: string().required(),
  system: object().shape({
    name: string().required(),
    uid: string().required()
  }),
  price: number(),
  quantity: number().min(1).max(100)
})

const useOrderLineForm = ({ setOrderLine, orderLine }: Props) => {
  const [catalogueItem, setCatalogueItem] = useState<CatalogueItem | undefined>(undefined)

  const modalSubmit = (data: OrderLineFormType) => {
    const dataToSend = { ...data }
    delete dataToSend.quantity
    if (data.quantity) {
      delete dataToSend.id
      for (let i = 0; i < data.quantity; i++) {
        setOrderLine(dataToSend)
      }
    } else setOrderLine(dataToSend)
  }

  const { setOpen, getFormModal } = useFormModal<OrderLineFormType>({
    renderForm: orderLine => <OrderLineFormComponent catalogueItem={catalogueItem} orderLine={orderLine} />,
    renderOutsideForm: () => <CatalogueSearchTable setItem={setCatalogueItem} itemName={catalogueItem?.name} />,
    onSubmit: modalSubmit,
    schema: orderLineFormSchema,
    defaultValues: orderLine
  })

  return { setOpen, getFormModal }
}

export default useOrderLineForm
