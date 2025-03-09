import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { number, object, string } from 'yup'

import { FormModal } from '@/hooks/form/useFormModal'
import { useOrderLine } from '@/modules/orderItem/hooks/useOrderLine'
import type { OrderLineFormType } from '@/modules/orderItem/types/form'
import CatalogueTableSelect from '@/modules/shared/catalogue/table/CatalogueTableSelect'
import type { CatalogueItem } from '@/types/responses/catalogue'

import OrderLineFormComponent from './OrderLineForm.comp'

interface OrderLienFormProps {
  orderLine?: OrderLineFormType
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const orderLineFormSchema = object({
  name: string().required(),
  catalogueNumber: string().required(),
  price: number()
    .transform(value => (Number.isNaN(value) ? null : value))
    .nullable(),
  quantity: number()
    .nullable()
    .max(100)
    .notRequired()
    .transform(value => (Number.isNaN(value) ? null : value)),
  system: object().nullable().required('Parent system is required field.'),
  serialNumbers: string().nullable()
  // atLeastOneFilled: string().test(
  //   'at-least-one-filled',
  //   'At least one of Quantity or Serial Numbers must be filled',
  //   function () {
  //     const { serialNumbers, quantity } = this.parent
  //     return Boolean(serialNumbers || quantity)
  //   }
  // )
})

export const OrderLineForm = ({
  orderLine,
  open,
  setOpen
}: OrderLienFormProps) => {
  const [catalogueItem, setCatalogueItem] = useState<CatalogueItem | undefined>(
    undefined
  )
  const { setOrderLine } = useOrderLine()

  const defaultValues = useMemo(
    () =>
      orderLine
        ? { ...orderLine, currency: orderLine.currency || 'EUR' }
        : {
            itemUsage: {
              uid: 'a2aae89a-5cbe-4042-a726-44012b158226',
              name: 'In System Part'
            }
          },
    [orderLine]
  )

  //TODO: type check for resolver
  const formMethods = useForm<OrderLineFormType>({
    defaultValues: defaultValues,
    resolver: yupResolver(orderLineFormSchema) as any
  })
  const modalSubmit = (data: OrderLineFormType) => {
    const dataToSend = { ...data }
    if (!dataToSend.price) {
      delete dataToSend.currency
      delete dataToSend.price
    }
    delete dataToSend.quantity
    delete dataToSend.serialNumbers
    if (data.quantity) {
      for (let i = 0; i < data.quantity; i++) {
        setOrderLine(dataToSend)
      }
    } else if (data.serialNumbers) {
      const serialNumbers = data.serialNumbers.split(',')
      serialNumbers.forEach(serialNumber => {
        setOrderLine({ ...dataToSend, serialNumber })
      })
    } else setOrderLine(dataToSend)
    formMethods.reset(defaultValues)
  }

  return (
    <FormModal
      formMethods={formMethods}
      onSubmit={modalSubmit}
      setOpen={setOpen}
      open={open}
      renderOutsideForm={
        <div>
          <CatalogueTableSelect
            setItem={setCatalogueItem}
            selectedItem={catalogueItem}
          />
        </div>
      }
    >
      <OrderLineFormComponent
        catalogueItem={catalogueItem}
        orderLine={orderLine}
      />
    </FormModal>
  )
}
