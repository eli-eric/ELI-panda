import type { Table } from '@tanstack/react-table'
import { X } from 'lucide-react'
import { useQueryState } from 'next-usequerystate'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useIntl } from 'react-intl'

import ErrorPage from '@/components/error/ErrorPage'
import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import { Badge } from '@/components/ui/badge'
import { useFormFilter } from '@/hooks/form/useFormFilters'
import { message } from '@/i18n/src/messages'
import type { CodebookType } from '@/types/responses/codebook'

import type { CatalogueItemForm } from '../catalogueItem/types/responses'
import { CatalogueTable } from '../shared/catalogue/table/CatalogueItems.table'
import { FilterBadges } from '../shared/form/FilterBadges'
import { ColumnVisibilityDropdown } from '../shared/table/ColumnVisibilityDropdown.comp'
import { PaginationV2 as Pagination } from '../shared/table/PaginationV2'
import { useVisibility } from '../shared/table/pandaTable/hooks/useVisibility'
import type { PandaTableV2Handle } from '../shared/table/pandaTableV2/PandaTableV2'
import { SearchBar } from '../shared/table/SearchBar'
import { CatalogueBreadcrumbs } from './components/breadcrump/CatalogueBreadcrumbs'
import { CategoryListContainer } from './components/categoryList/CategoryList.cont'
import { SearchBarButtons } from './components/SearchBarButtons'
import { useCatalogueItems } from './hooks/useCatalogueItems'
import { useCategoryList } from './hooks/useCategoryList'
import type { SystemFilterType } from './types/filter'

const CatalogueContainer = () => {
    const tableId = 'catalogueItems'
    const { catalogueItems, error, loading } = useCatalogueItems(tableId, undefined, true)
    const { catalogueCategories } = useCategoryList()
    const [categoryQuery, setCategoryQuery] = useQueryState('category', {
        history: 'push',
    })
    const tableRef = useRef<PandaTableV2Handle>(null)

    const defValues = useMemo<CatalogueItemForm>(
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
    const [open, setOpen] = useState(true)
    const [catalogueTable, setCatalogueTable] = useState<Table<any> | null>(null)
    const [columnVisibility] = useVisibility(tableId)

    const filterFormMethods = useFormFilter<SystemFilterType>({
        tableId,
        defValues,
        enableQueryURL: true,
    })

    const setCategoryFilter = useCallback(
        (value: CodebookType | null) => {
            setCategoryQuery(value ? JSON.stringify(value) : null)
        },
        [setCategoryQuery],
    )

    // Scroll table to top when page changes
    const handlePageChange = useCallback(() => {
        tableRef.current?.scrollToTop()
    }, [])

    const { formatMessage: fm } = useIntl()

    return (
        <div className="w-max-full flex flex-col">
            <SearchBar
                left={<SearchBarButtons filterFormMethods={filterFormMethods} />}
                tableId={tableId}
                right={
                    catalogueTable ? (
                        <ColumnVisibilityDropdown
                            table={catalogueTable}
                            columnVisibility={columnVisibility}
                        />
                    ) : undefined
                }
                secondRow={
                    <FilterBadges
                        tableId={tableId}
                        additionalBadge={
                            categoryQuery ? (
                                <Badge>
                                    <span>
                                        {fm({
                                            id: message.catalogue.category.badge,
                                            defaultMessage: 'Category',
                                        })}
                                    </span>
                                    <X
                                        className="h-4 w-4 ml-1 cursor-pointer hover:text-red-600 clickable"
                                        onClick={() => {
                                            setCategoryQuery(null)
                                        }}
                                    />
                                </Badge>
                            ) : undefined
                        }
                    />
                }
            />
            <CatalogueBreadcrumbs setCategoryFilter={setCategoryFilter} />
            <CategoryListContainer setCategoryFilter={setCategoryFilter} onChange={setOpen} />
            <TableLayoutContainer deps={[open, catalogueItems, catalogueCategories]}>
                <CatalogueTable
                    ref={tableRef}
                    tableId={tableId}
                    setCategoryFilter={setCategoryFilter}
                    catalogueItems={catalogueItems}
                    loading={loading}
                    pageSize={50}
                    categoryList={catalogueCategories}
                    onTableReady={setCatalogueTable}
                />
                <Pagination
                    tableId={tableId}
                    settings={{
                        enableQueryURL: true,
                        total: catalogueItems?.totalCount,
                    }}
                    onPageChange={handlePageChange}
                />
                {error && <ErrorPage />}
            </TableLayoutContainer>
        </div>
    )
}

export default CatalogueContainer
