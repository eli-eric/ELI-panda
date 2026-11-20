import type { FC } from 'react'

import { useCatalogueNavigation } from '../../hooks/useCatalogueNavigation'
import { CatalogueItemDetailViewContainer } from './CatalogueItemDetailView.cont'
import { CatalogueItemsPanelContainer } from './CatalogueItemsPanel.cont'
import { CategoryDetailViewContainer } from './CategoryDetailView.cont'

export const CatalogueMiddlePanel: FC = () => {
    const { selectedItemUid, selectedCategoryUid, isCategoryDetailView } = useCatalogueNavigation()

    if (selectedItemUid) {
        return <CatalogueItemDetailViewContainer />
    }

    if (selectedCategoryUid && isCategoryDetailView) {
        return <CategoryDetailViewContainer />
    }

    return <CatalogueItemsPanelContainer />
}
