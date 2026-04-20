import type { FC } from 'react'

import { useCatalogueItemDetail } from '../../hooks/queries/useCatalogueItemDetail'
import { useCatalogueNavigation } from '../../hooks/useCatalogueNavigation'
import { CatalogueItemDetailHeader } from './CatalogueItemDetailHeader.comp'
import { CatalogueItemDetailTabs } from './CatalogueItemDetailTabs.cont'

export const CatalogueItemDetailViewContainer: FC = () => {
    const { selectedItemUid, backToTable } = useCatalogueNavigation()
    const { item, isLoading, error } = useCatalogueItemDetail(selectedItemUid)

    if (isLoading) {
        return <div className="p-4 text-sm text-muted-foreground">Loading item...</div>
    }
    if (error || !item) {
        return <div className="p-4 text-sm text-destructive">Item not found.</div>
    }

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <CatalogueItemDetailHeader
                name={item.name}
                catalogueNumber={item.catalogueNumber}
                onBack={backToTable}
            />
            <CatalogueItemDetailTabs item={item} />
        </div>
    )
}
