import type { FC } from 'react'

import { useCatalogueItems } from '@/modules/catalogue/hooks/useCatalogueItems'
import { CatalogueTable } from '@/modules/shared/catalogue/table/CatalogueItems.table'

import { useCatalogueCategoryDetail } from '../../hooks/queries/useCatalogueCategoryDetail'
import { useCatalogueNavigation } from '../../hooks/useCatalogueNavigation'
import { CATALOGUE_ITEMS_TABLE_ID } from '../../types/constants'
import { CatalogueItemsPanelHeader } from './CatalogueItemsPanelHeader.comp'

export const CatalogueItemsPanelContainer: FC = () => {
    const { selectedCategoryUid, selectItem } = useCatalogueNavigation()
    const { catalogueItems, loading } = useCatalogueItems(CATALOGUE_ITEMS_TABLE_ID, undefined, true)
    const { category } = useCatalogueCategoryDetail(selectedCategoryUid)

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <CatalogueItemsPanelHeader
                categoryUid={selectedCategoryUid}
                categoryName={category?.name ?? null}
            />
            <div className="flex-1 overflow-hidden">
                <CatalogueTable
                    tableId={CATALOGUE_ITEMS_TABLE_ID}
                    catalogueItems={catalogueItems}
                    loading={loading}
                    enableQueryURL
                    onSelectItem={selectItem}
                    getRowProps={() => ({
                        className:
                            'cursor-pointer hover:text-primary hover:bg-primary/10 transition-colors',
                    })}
                />
            </div>
        </div>
    )
}
