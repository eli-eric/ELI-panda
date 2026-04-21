import type { FC } from 'react'
import { useCallback, useRef } from 'react'

import { useCatalogueItems } from '@/modules/catalogue/hooks/useCatalogueItems'
import { CatalogueTable } from '@/modules/shared/catalogue/table/CatalogueItems.table'
import { PaginationV2 } from '@/modules/shared/table/PaginationV2'
import type { PandaTableV2Handle } from '@/modules/shared/table/pandaTableV2/PandaTableV2'

import { useCatalogueCategoryDetail } from '../../hooks/queries/useCatalogueCategoryDetail'
import { useCatalogueNavigation } from '../../hooks/useCatalogueNavigation'
import { CATALOGUE_ITEMS_TABLE_ID } from '../../types/constants'
import { CatalogueItemsPanelHeader } from './CatalogueItemsPanelHeader.comp'

export const CatalogueItemsPanelContainer: FC = () => {
    const { selectedCategoryUid, selectItem } = useCatalogueNavigation()
    const { catalogueItems, loading } = useCatalogueItems(CATALOGUE_ITEMS_TABLE_ID, undefined, true)
    const { category } = useCatalogueCategoryDetail(selectedCategoryUid)
    const tableRef = useRef<PandaTableV2Handle>(null)

    const handlePageChange = useCallback(() => {
        tableRef.current?.scrollToTop()
    }, [])

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <CatalogueItemsPanelHeader
                categoryUid={selectedCategoryUid}
                categoryName={category?.name ?? null}
            />
            <div className="flex-1 min-h-0 overflow-hidden">
                <CatalogueTable
                    ref={tableRef}
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
            <PaginationV2
                tableId={CATALOGUE_ITEMS_TABLE_ID}
                settings={{
                    enableQueryURL: true,
                    total: catalogueItems?.totalCount,
                }}
                onPageChange={handlePageChange}
            />
        </div>
    )
}
