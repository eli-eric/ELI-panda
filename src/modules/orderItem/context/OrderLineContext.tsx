import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useRef} from 'react'
import {
  type FieldArrayWithId,
  useFieldArray,
  useFormContext} from 'react-hook-form'

import type { OrderDetailFormType, OrderLineFormType } from '../types/form'

interface OrderLineContextValue {
  setOrderLine: (orderLine: OrderLineFormType) => void
  deleteOrderLine: (orderLine: OrderLineFormType & { id: string }) => void
  fields: FieldArrayWithId<OrderDetailFormType, 'orderLines'>[]
}

const OrderLineContext = createContext<OrderLineContextValue | null>(null)

export const OrderLineProvider = ({ children }: { children: ReactNode }) => {
  const { control } = useFormContext<OrderDetailFormType>()
  const { insert, update, fields, remove } = useFieldArray({
    control,
    name: 'orderLines'
  })

  // Use ref to avoid stale closure - callback always sees current fields
  const fieldsRef = useRef(fields)
  fieldsRef.current = fields

  const setOrderLine = useCallback(
    (orderLine: OrderLineFormType) => {
      const currentFields = fieldsRef.current
      const dataToSave = { ...orderLine }

      if (orderLine.uid) {
        const index = currentFields.findIndex(item => item.uid === orderLine.uid)
        if (index !== -1) {
          update(index, dataToSave)
        }
      } else {
        insert(0, dataToSave)
      }
    },
    [update, insert]
  )

  const deleteOrderLine = useCallback(
    (orderLine: OrderLineFormType & { id: string }) => {
      const currentFields = fieldsRef.current
      const index = currentFields.findIndex(item => item.id === orderLine.id)
      if (index !== -1) {
        remove(index)
      }
    },
    [remove]
  )

  return (
    <OrderLineContext.Provider
      value={{ setOrderLine, deleteOrderLine, fields }}
    >
      {children}
    </OrderLineContext.Provider>
  )
}

export const useOrderLineContext = () => {
  const context = useContext(OrderLineContext)
  if (!context) {
    throw new Error('useOrderLineContext must be used within OrderLineProvider')
  }
  return context
}
