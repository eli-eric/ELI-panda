import { useCallback, useMemo } from 'react'

import { useServiceLine } from '@/modules/orderItem/hooks/useServiceLine'
import type { ServiceLineFormType } from '@/modules/orderItem/types/form'
import { FormWizard } from '@/modules/shared/form/wizardV2/wizard-form.cont'
import useTableStateStore from '@/store/useTableStateStore'

import { useServiceLineSteps } from './hooks/useServiceLineSteps'

type Props = {
  setOpen: (open: boolean) => void
}
export const ServiceLineWizard = ({ setOpen }: Props) => {
  const serviceLineSteps = useServiceLineSteps()

  const steps = useMemo(() => serviceLineSteps, [serviceLineSteps])

  const { setServiceLine } = useServiceLine()
  const tableId = 'items-select-table'
  const { reset: resetTable } = useTableStateStore()

  const handleSubmit = useCallback(
    (data: ServiceLineFormType, reset: () => void) => {
      const { items, details, selectedProperties, ...rest } = data

      // Filter details based on selected properties
      const filteredDetails =
        Array.isArray(details) && Array.isArray(selectedProperties)
          ? details.filter(detail =>
              selectedProperties.includes(detail.property.uid)
            )
          : []

      if (items && items.length > 0) {
        items.forEach(item => {
          setServiceLine({
            ...rest,
            price: Number(rest.price),
            item: { uid: item.uid, name: item.name },
            eun: item.eun,
            serialNumber: item.serialNumber,
            details: filteredDetails
          })
        })
      }

      reset()
      resetTable(tableId)
      setOpen(false)
    },
    [setServiceLine, resetTable, tableId, setOpen]
  )

  return (
    <div className="">
      <FormWizard<ServiceLineFormType> steps={steps} onSubmit={handleSubmit} />
    </div>
  )
}
