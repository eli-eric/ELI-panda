import { useFieldArray, useFormContext } from 'react-hook-form'
import uuid from 'react-uuid'

import type { OrderLineFormType } from '../types'

export const useOrderLine = () => {
  const { control } = useFormContext()
  const { insert, update, fields, remove } = useFieldArray({ control, name: 'orderLines' })

  //  set the order lines to the form
  const setOrderLine = (orderLine: OrderLineFormType) => {
    const dataToSave = { ...orderLine }
    if (orderLine.id) {
      const index = fields.findIndex(item => item.id === orderLine.id)
      update(index, dataToSave)
    } else {
      dataToSave.id = uuid()
      insert(fields.length, dataToSave)
    }
  }
  //  delete the order line from the form
  const deleteOrderLine = (orderLine: OrderLineFormType) => {
    const index = fields.findIndex(item => item.id === orderLine.id)
    remove(index)
  }

  return { setOrderLine, deleteOrderLine }
}
