import { useCallback, useMemo } from 'react'

import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import { useServiceLine } from '@/modules/orderItem/hooks/useServiceLine'
import type { ServiceLineFormType } from '@/modules/orderItem/types/form'
import { FormWizard } from '@/modules/shared/form/wizardV2/wizard-form.cont'
import useTableStateStore from '@/store/useTableStateStore'

import { useServiceLineSelectionStore } from './details/store/useServiceLineSelectionStore'
import { useServiceLineSteps } from './hooks/useServiceLineSteps'

type Props = {
  setOpen: (open: boolean) => void
}
export const ServiceLineWizard = ({ setOpen }: Props) => {
  const serviceLineSteps = useServiceLineSteps()

  const steps = useMemo(() => serviceLineSteps, [serviceLineSteps])
  const { clearSelections } = useServiceLineSelectionStore()

  const { setServiceLine } = useServiceLine()
  const tableId = 'items-select-table'
  const { reset: resetTable } = useTableStateStore()

  const handleSubmit = useCallback(
    (data: ServiceLineFormType, reset: () => void) => {
      const { items, details, selectedProperties, ...rest } = data

      // Convert details object with UID keys back to array (similar to catalogueItem)  
      const detailsArray = details && typeof details === 'object' && !Array.isArray(details)
        ? Object.values(details) as CatalogueItemDetail[]
        : Array.isArray(details) 
          ? details 
          : []

      // Filter details based on selected properties
      const filteredDetails =
        Array.isArray(detailsArray) && Array.isArray(selectedProperties)
          ? detailsArray.filter(detail =>
              selectedProperties.includes(detail.property.uid)
            )
          : []

      if (items && items.length > 0) {
        items.forEach(item => {
          console.log('Selected item:', item, filteredDetails)
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
      clearSelections()
      setOpen(false)
    },
    [setServiceLine, resetTable, tableId, setOpen, clearSelections]
  )

  return (
    <div className="">
      <FormWizard<ServiceLineFormType> steps={steps} onSubmit={handleSubmit} />
    </div>
  )
}
