import type { Table } from '@tanstack/react-table'
import { X } from 'lucide-react'
import type { FC } from 'react'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import { useFormFilter } from '@/hooks/form/useFormFilters'
import { message } from '@/i18n/src/messages'
import { CatalogueFilterButtonContainer } from '@/modules/catalogue/components/filters/CatalogueFilterButton.cont'
import { useCatalogueItems } from '@/modules/catalogue/hooks/useCatalogueItems'
import type { CatalogueItemForm } from '@/modules/catalogueItem/types/responses'
import { CatalogueTable } from '@/modules/shared/catalogue/table/CatalogueItems.table'
import { FilterBadges } from '@/modules/shared/form/FilterBadges'
import { ColumnVisibilityDropdown } from '@/modules/shared/table/ColumnVisibilityDropdown.comp'
import { PaginationV2 } from '@/modules/shared/table/PaginationV2'
import type { PandaTableV2Handle } from '@/modules/shared/table/pandaTableV2/PandaTableV2'
import { SearchBar } from '@/modules/shared/table/SearchBar'

import { useCatalogueCategoryDetail } from '../../hooks/queries/useCatalogueCategoryDetail'
import { useCatalogueNavigation } from '../../hooks/useCatalogueNavigation'
import { CATALOGUE_ITEMS_TABLE_ID } from '../../types/constants'
import { CatalogueItemsPanelHeader } from './CatalogueItemsPanelHeader.comp'

export const CatalogueItemsPanelContainer: FC = () => {
    const { formatMessage: fm } = useIntl()
    const { selectedCategoryUid, selectItem, clearCategory } = useCatalogueNavigation()
    const { catalogueItems, loading } = useCatalogueItems(CATALOGUE_ITEMS_TABLE_ID, undefined, true)
    const { category } = useCatalogueCategoryDetail(selectedCategoryUid)
    const tableRef = useRef<PandaTableV2Handle>(null)
    const [table, setTable] = useState<Table<any> | null>(null)

    const defFilterValues = useMemo<CatalogueItemForm>(
        () => ({
            name: '',
            category: null,
            catalogueNumber: '',
            manufacturerUrl: '',
            supplier: null,
            description: '',
        }),
        [],
    )

    const filterFormMethods = useFormFilter<CatalogueItemForm>({
        tableId: CATALOGUE_ITEMS_TABLE_ID,
        defValues: defFilterValues,
        enableQueryURL: true,
    })

    const handlePageChange = useCallback(() => {
        tableRef.current?.scrollToTop()
    }, [])

    const categoryBadge = selectedCategoryUid ? (
        <Badge>
            <span>
                {fm({ id: message.catalogue.category.badge, defaultMessage: 'Category' })}
                {category?.name ? `: ${category.name}` : ''}
            </span>
            <X
                className="h-4 w-4 ml-1 cursor-pointer hover:text-red-600 clickable"
                onClick={clearCategory}
            />
        </Badge>
    ) : undefined

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <SearchBar
                tableId={CATALOGUE_ITEMS_TABLE_ID}
                left={
                    <CatalogueFilterButtonContainer
                        filterFormMethods={filterFormMethods}
                        tableId={CATALOGUE_ITEMS_TABLE_ID}
                    />
                }
                right={table ? <ColumnVisibilityDropdown table={table} /> : undefined}
                secondRow={
                    <FilterBadges
                        tableId={CATALOGUE_ITEMS_TABLE_ID}
                        additionalBadge={categoryBadge}
                    />
                }
            />
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
                    onTableReady={setTable}
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
