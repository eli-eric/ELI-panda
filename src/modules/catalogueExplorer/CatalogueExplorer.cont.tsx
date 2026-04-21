import type { FC } from 'react'

import { CatalogueLayoutContainer } from './components/layout/CatalogueLayout.cont'
import { CatalogueMiddlePanel } from './components/middle/CatalogueMiddlePanel.cont'
import { CatalogueQuickInfoSidebar } from './components/sidebar/CatalogueQuickInfoSidebar.comp'
import { CategoryTreeContainer } from './components/tree/CategoryTree.cont'
import { useCatalogueNavigation } from './hooks/useCatalogueNavigation'

const CatalogueExplorerContainer: FC = () => {
    const { selectedCategoryUid, selectedItemUid } = useCatalogueNavigation()

    const showSidebar = !!selectedItemUid || !!selectedCategoryUid

    return (
        <CatalogueLayoutContainer
            tree={<CategoryTreeContainer />}
            middle={<CatalogueMiddlePanel />}
            sidebar={showSidebar ? <CatalogueQuickInfoSidebar /> : undefined}
        />
    )
}

export default CatalogueExplorerContainer
