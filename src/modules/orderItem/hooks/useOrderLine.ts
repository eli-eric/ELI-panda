import { useFieldArray, useFormContext } from 'react-hook-form'
import { v4 as uuid } from 'uuid'

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
    if (orderLine.uuid) {
      const index = fields.findIndex(item => item.uuid === orderLine.uuid)
      update(index, dataToSave)
    } else {
      dataToSave.uuid = uuid()
      insert(fields.length, dataToSave)
    }
  }
  //  delete the order line from the form
  const deleteOrderLine = (orderLine: OrderLineFormType) => {
    const index = fields.findIndex(item => item.uuid === orderLine.uuid)
    remove(index)
  }

  return { setOrderLine, deleteOrderLine }
}
