import { Fragment, useState } from 'react'
import { number, object, string } from 'yup'

import { Heading } from '@/components/card/card.comp'
import useFormModal from '@/hooks/form/useFormModal'
import type { OrderLineFormType } from '@/modules/orderItem/types'
import CatalogueSearchTable from '@/modules/systems/components/sections/catalogueItemSection/components/CatalogueSearchTable'
import type { CatalogueItem } from '@/types/responses'

import OrderLineFormComponent from './OrderLineForm.comp'
interface Props {
  setOrderLine: (orderLines: OrderLineFormType) => void
  orderLine?: OrderLineFormType
  index?: number
}

const orderLineFormSchema = object({
  name: string().required(),
  catalogueNumber: string().required(),
  price: number()
    .transform(value => (Number.isNaN(value) ? null : value))
    .nullable(),
  quantity: number().min(1).max(100)
})

const useOrderLineForm = ({ setOrderLine, orderLine }: Props) => {
  const [catalogueItem, setCatalogueItem] = useState<CatalogueItem | undefined>(undefined)

  const modalSubmit = (data: OrderLineFormType) => {
    const dataToSend = { ...data }
    if (!dataToSend.price) {
      delete dataToSend.currency
      delete dataToSend.price
    }
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
    renderOutsideForm: orderLine => (
      <Fragment>
        {!orderLine.uid ? (
          <CatalogueSearchTable setItem={setCatalogueItem} itemName={catalogueItem?.name} />
        ) : (
          <Heading text={orderLine.name + ' - ' + orderLine.catalogueNumber} />
        )}
      </Fragment>
    ),
    onSubmit: modalSubmit,
    schema: orderLineFormSchema,
    defaultValues: orderLine || { itemUsage: { uid: 'a2aae89a-5cbe-4042-a726-44012b158226', name: 'In System Part' } }
  })

  return { setOpen, getFormModal }
}

export default useOrderLineForm
