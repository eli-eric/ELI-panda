import { useFieldArray, useFormContext } from 'react-hook-form'

import type { OrderDetailFormType, OrderLineFormType } from '../types/form'

export const useOrderLine = () => {
  const { control } = useFormContext<OrderDetailFormType>()
  const { insert, update, fields, remove } = useFieldArray({
    control,
    name: 'orderLines'
  })

  //  set the order lines to the form
  const setOrderLine = (orderLine: OrderLineFormType) => {
    const dataToSave = { ...orderLine }

    // If order line has uid (from DB), it's an UPDATE
    if (orderLine.uid) {
      const index = fields.findIndex(item => item.uid === orderLine.uid)
      if (index !== -1) {
        update(index, dataToSave)
      }
    } else {
      // New order line - INSERT at position 0
      // React Hook Form will automatically add 'id' field
      insert(0, dataToSave)
    }
  }
  //  delete the order line from the form
  const deleteOrderLine = (orderLine: OrderLineFormType & { id: string }) => {
    const index = fields.findIndex(item => item.id === orderLine.id)
    if (index !== -1) {
      remove(index)
    }
  }

  return { setOrderLine, deleteOrderLine, fields }
}
