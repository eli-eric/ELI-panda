import { useCallback } from 'react'
import type { UseFormReturn } from 'react-hook-form'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { CatalogueFilterSheet } from '../CatalogueFilterSheet.cont'

interface UseCatalogueFilterSheetProps {
  tableId?: string
  enableQueryURL?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
  filterFormMethods: UseFormReturn<any, any, any>
}

export const useCatalogueFilterSheet = () => {
  const { openModal } = useDynamicModalStore()

  const openFilterSheet = useCallback(
    ({
      tableId = 'catalogueItems',
      enableQueryURL = true,
      side = 'left',
      filterFormMethods
    }: UseCatalogueFilterSheetProps) => {
      const modalId = openModal('sheet', {
        id: `catalogue-filters-${tableId}`,
        component: CatalogueFilterSheet,
        props: {
          title: 'Catalogue Filters',
          size: 'l',
          side,
          tableId,
          enableQueryURL,
          filterFormMethods
        }
      })

      return modalId
    },
    [openModal]
  )

  return openFilterSheet
}
