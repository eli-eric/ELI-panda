import { useCallback } from 'react'

import { PlusButton } from '@/components/Buttons'
import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import useTableStateStore from '@/store/useTableStateStore'

import { useServiceLine } from '../../hooks/useServiceLine'
import type { ServiceLineFormType } from '../../types/form'
import { useServiceLineSelectionStore } from './form/details/store/useServiceLineSelectionStore'
import { ServiceLineWizard } from './form/service-line.wizz'

export const ServiceLinesAddButton = () => {
  const { openModal, closeModal } = useModalGlobalStore()
  const { setServiceLine } = useServiceLine()
  const { clearSelections } = useServiceLineSelectionStore()

  const tableId = 'items-select-table'
  const { reset: resetTable } = useTableStateStore()

  const handleSubmit = useCallback(
    (data: ServiceLineFormType, reset: () => void) => {
      const { items, details, selectedProperties, ...rest } = data

      // Convert details object with UID keys back to array (similar to catalogueItem)
      const detailsArray =
        details && typeof details === 'object' && !Array.isArray(details)
          ? (Object.values(details) as CatalogueItemDetail[])
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
      closeModal('dialog1')
    },
    [setServiceLine, resetTable, tableId, clearSelections, closeModal]
  )
  // Use useCallback for handleAddServiceLine
  const handleOpenAddServiceLine = () => {
    openModal('dialog1', {
      component: ServiceLineWizard,
      props: {
        title: 'Add Service Line',
        size: 'xl',
        handleSubmit
      }
    })
  }

  return (
    <div className="flex items-center mr-2">
      <PlusButton
        type="button"
        onClick={handleOpenAddServiceLine}
        className="mb-2"
      />
    </div>
  )
}
