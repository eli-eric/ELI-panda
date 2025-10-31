import { useCallback } from 'react'

import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { CatalogueSelectFilterSheet } from '../CatalogueSelectFilterSheet'

interface UseCatalogueSelectFilterSheetProps {
  tableId: string
  catalogueCategoryProperties?: CatalogueItemDetail[]
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export const useCatalogueSelectFilterSheet = () => {
  const { openModal } = useModalGlobalStore()

  const openFilterSheet = useCallback(
    ({
      tableId,
      catalogueCategoryProperties,
      side = 'right'
    }: UseCatalogueSelectFilterSheetProps) => {
      openModal('sheet', {
        component: CatalogueSelectFilterSheet,
        props: {
          title: 'Catalogue Filters',
          size: 'l',
          side,
          tableId,
          catalogueCategoryProperties
        }
      })
    },
    [openModal]
  )

  return openFilterSheet
}
