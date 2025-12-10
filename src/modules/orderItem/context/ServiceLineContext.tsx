import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type ReactNode
} from 'react'
import {
  useFieldArray,
  useFormContext,
  type FieldArrayWithId
} from 'react-hook-form'

import type { OrderDetailFormType, ServiceLine } from '../types/form'

interface ServiceLineContextValue {
  setServiceLine: (serviceLine: ServiceLine & { id?: string }) => void
  deleteServiceLine: (serviceLineId: string) => void
  fields: FieldArrayWithId<OrderDetailFormType, 'serviceLines'>[]
}

const ServiceLineContext = createContext<ServiceLineContextValue | null>(null)

export const ServiceLineProvider = ({ children }: { children: ReactNode }) => {
  const { control } = useFormContext<OrderDetailFormType>()
  const { insert, update, fields, remove } = useFieldArray({
    control,
    name: 'serviceLines'
  })

  // Use ref to avoid stale closure - callback always sees current fields
  const fieldsRef = useRef(fields)
  fieldsRef.current = fields

  const setServiceLine = useCallback(
    (serviceLine: ServiceLine & { id?: string }) => {
      const currentFields = fieldsRef.current
      const dataToSave = { ...serviceLine }

      if (serviceLine.id) {
        // UPDATE: hledáme podle id z RHF
        const index = currentFields.findIndex(
          item => item.id === serviceLine.id
        )
        if (index !== -1) {
          update(index, dataToSave)
        }
      } else {
        // INSERT: nový záznam
        if (!dataToSave.uuid) {
          dataToSave.uuid = crypto.randomUUID()
        }
        insert(0, dataToSave)
      }
    },
    [update, insert]
  )

  const deleteServiceLine = useCallback(
    (serviceLineId: string) => {
      const currentFields = fieldsRef.current
      const index = currentFields.findIndex(item => item.id === serviceLineId)
      if (index !== -1) {
        remove(index)
      }
    },
    [remove]
  )

  return (
    <ServiceLineContext.Provider
      value={{ setServiceLine, deleteServiceLine, fields }}
    >
      {children}
    </ServiceLineContext.Provider>
  )
}

export const useServiceLineContext = () => {
  const context = useContext(ServiceLineContext)
  if (!context) {
    throw new Error(
      'useServiceLineContext must be used within ServiceLineProvider'
    )
  }
  return context
}
