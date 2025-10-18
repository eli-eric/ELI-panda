import { useCallback } from 'react'

import { PlusButton } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import useTableStateStore from '@/store/useTableStateStore'
import { TABLE_IDS } from '@/types/constants/tableIds'

import { useServiceLine } from '../../hooks/useServiceLine'
import type { ServiceLineFormType } from '../../types/form'
import { useServiceLineSelectionStore } from './form/details/store/useServiceLineSelectionStore'
import { ServiceLineV3Wizard } from './form/service-line-v3.wizz'

export const ServiceLinesAddButton = () => {
  const { openModal, closeModal } = useModalGlobalStore()
  const { setServiceLine } = useServiceLine()
  const { clearSelections } = useServiceLineSelectionStore()

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
      resetTable(TABLE_IDS.SERVICE_LINE_ITEMS_SELECT)
      clearSelections()
      closeModal('dialog1')
    },
    [setServiceLine, resetTable, clearSelections, closeModal]
  )
  // Use useCallback for handleAddServiceLine
  const handleOpenAddServiceLine = () => {
    openModal('dialog1', {
      component: ServiceLineV3Wizard,
      props: {
        title: 'Add Service Line',
        size: 'xl',
        handleSubmit
      }
    })
  }

  return (
    <Tooltip content="Add Service Line">
      <PlusButton
        type="button"
        onClick={handleOpenAddServiceLine}
        className="mb-2"
      />
    </Tooltip>
  )
}
