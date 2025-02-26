import { useFieldArray, useFormContext } from 'react-hook-form'

import type { OrderDetailFormType, ServiceLine } from '../types/form'

export const useServiceLine = () => {
  const { control } = useFormContext<OrderDetailFormType>()
  const { insert, update, fields, remove } = useFieldArray({
    control,
    name: 'serviceLines'
  })

  //  set the order lines to the form
  const setServiceLine = (serviceLine: ServiceLine) => {
    const dataToSave = { ...serviceLine }
    if (serviceLine.uuid) {
      const index = fields.findIndex(item => item.uuid === serviceLine.uuid)
      update(index, dataToSave)
    } else {
      dataToSave.uuid = crypto.randomUUID()
      insert(fields.length, dataToSave)
    }
  }
  //  delete the order line from the form
  const deleteServiceLine = (serviceLineUuid?: string) => {
    const index = fields.findIndex(item => item.uuid === serviceLineUuid)
    remove(index)
  }

  return { setServiceLine, deleteServiceLine }
}
