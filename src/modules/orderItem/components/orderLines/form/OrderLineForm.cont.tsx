import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { number, object, string } from 'yup'

import { Heading } from '@/components/card/card.comp'
import { FormModal } from '@/hooks/form/useFormModal'
import type { CatalogueItem } from '@/modules/catalogueItem/types/responses'
import { useOrderLine } from '@/modules/orderItem/hooks/useOrderLine'
import type { OrderLineFormType } from '@/modules/orderItem/types/form'
import CatalogueTableSelect from '@/modules/shared/catalogue/table/CatalogueTableSelect'

import OrderLineFormComponent from './OrderLineForm.comp'

const orderLineFormSchema = object({
  name: string().required(),
  catalogueNumber: string().required(),
  price: number()
    .transform(value => (Number.isNaN(value) ? null : value))
    .nullable(),
  quantity: number().min(1).max(100)
})

interface OrderLienFormProps {
  orderLine?: OrderLineFormType
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const OrderLineForm = ({ orderLine, open, setOpen }: OrderLienFormProps) => {
  const [catalogueItem, setCatalogueItem] = useState<CatalogueItem | undefined>(undefined)
  const { setOrderLine } = useOrderLine()
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

  const formMethods = useForm<OrderLineFormType>({
    defaultValues: orderLine
      ? { ...orderLine, currency: orderLine.currency || 'EUR' }
      : { itemUsage: { uid: 'a2aae89a-5cbe-4042-a726-44012b158226', name: 'In System Part' }, quantity: 1 },
    resolver: yupResolver(orderLineFormSchema)
  })

  return (
    <FormModal
      formMethods={formMethods}
      onSubmit={modalSubmit}
      setOpen={setOpen}
      open={open}
      renderOutsideForm={
        <div>
          {orderLine?.uuid ? (
            <Heading text={orderLine.name + ' - ' + orderLine.catalogueNumber} />
          ) : (
            <CatalogueTableSelect setItem={setCatalogueItem} selectedItem={catalogueItem} />
          )}
        </div>
      }
    >
      <OrderLineFormComponent catalogueItem={catalogueItem} orderLine={orderLine} />
    </FormModal>
  )
}
