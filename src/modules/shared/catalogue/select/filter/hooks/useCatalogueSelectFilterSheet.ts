import { useCallback } from 'react'

import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { CatalogueSelectFilterSheet } from '../CatalogueSelectFilterSheet'

interface UseCatalogueSelectFilterSheetProps {
    tableId: string
    catalogueCategoryProperties?: CatalogueItemDetail[]
    side?: 'top' | 'right' | 'bottom' | 'left'
}

export const useCatalogueSelectFilterSheet = () => {
    const { openModal } = useDynamicModalStore()

    const openFilterSheet = useCallback(
        ({
            tableId,
            catalogueCategoryProperties,
            side = 'right',
        }: UseCatalogueSelectFilterSheetProps) => {
            const modalId = openModal('sheet', {
                id: `catalogue-select-filters-${tableId}`,
                component: CatalogueSelectFilterSheet,
                props: {
                    title: 'Catalogue Filters',
                    size: 'l',
                    side,
                    tableId,
                    catalogueCategoryProperties,
                },
            })

            return modalId
        },
        [openModal],
    )

    return openFilterSheet
}
