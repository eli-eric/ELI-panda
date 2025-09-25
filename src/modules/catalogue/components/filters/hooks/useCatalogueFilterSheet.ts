import { useCallback } from 'react'
import type { UseFormReturn } from 'react-hook-form'

import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { CatalogueFilterSheet } from '../CatalogueFilterSheet.cont'

interface UseCatalogueFilterSheetProps {
  tableId?: string
  enableQueryURL?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
  filterFormMethods: UseFormReturn<any, any, any>
}

export const useCatalogueFilterSheet = () => {
  const { openModal } = useModalGlobalStore()

  const openFilterSheet = useCallback(
    ({ tableId = 'catalogueItems', enableQueryURL = true, side = 'left', filterFormMethods }: UseCatalogueFilterSheetProps) => {
      openModal('sheet', {
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
    },
    [openModal]
  )

  return openFilterSheet
}