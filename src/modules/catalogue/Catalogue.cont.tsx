import { XMarkIcon } from '@heroicons/react/24/outline'
import { useQueryState } from 'next-usequerystate'
import { Fragment, useCallback, useMemo, useState } from 'react'

import ErrorPage from '@/components/error/ErrorPage'
import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import { Badge } from '@/components/visuals/Badge'
import type { CodebookType } from '@/types/responses/codebook'

import { useFormFilter } from '@/hooks/form/useFormFilters'

import type { CatalogueItem } from '../catalogueItem/types/responses'
import { CatalogueTable } from '../shared/catalogue/table/CatalogueItems.table'
import { FilterBadges } from '../shared/form/FilterBadges'
import { Pagination } from '../shared/table/Pagination'
import { SearchBar } from '../shared/table/SearchBar'
import { CatalogueBreadcrumbs } from './components/breadcrump/CatalogueBreadcrumbs'
import { CategoryListContainer } from './components/categoryList/CategoryList.cont'
import { SearchBarButtons } from './components/SearchBarButtons'
import { useCatalogueItems } from './hooks/useCatalogueItems'
import { useCategoryList } from './hooks/useCategoryList'
import type { SystemFilterType } from './types/filter'

const CatalogueContainer = () => {
  const tableId = 'catalogueItems'
  const { catalogueItems, error, loading } = useCatalogueItems(tableId)
  const { catalogueCategories } = useCategoryList()
  const [categoryQuery, setCategoryQuery] = useQueryState('category', {
    history: 'push'
  })
  const defValues = useMemo<CatalogueItem>(
    () => ({
      name: '',
      category: null,
      catalogueNumber: '',
      manufacturerUrl: '',
      supplier: null,
      description: ''
    }),
    []
  )
  const [open, setOpen] = useState(true)

  const filterFormMethods = useFormFilter<SystemFilterType>({
    tableId,
    defValues,
    enableQueryURL: true
  })

  const setCategoryFilter = useCallback(
    (value: CodebookType | null) => {
      setCategoryQuery(value ? JSON.stringify(value) : null)
    },
    [setCategoryQuery]
  )

  return (
    <Fragment>
      <SearchBar
        left={<SearchBarButtons filterFormMethods={filterFormMethods} />}
        tableId={tableId}
        right={
          <FilterBadges
            tableId={tableId}
            additionalBadge={
              categoryQuery ? (
                <Badge>
                  <span>{'category'}</span>
                  <XMarkIcon
                    className="h-4 w-4 ml-1 cursor-pointer hover:text-red-600"
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
      <CategoryListContainer
        setCategoryFilter={setCategoryFilter}
        onChange={open => {
          setOpen(open)
        }}
      />
      <TableLayoutContainer
        deps={[open, catalogueItems, catalogueCategories]}
        className={'border-t border-gray-300'}
      >
        <CatalogueTable
          tableId={tableId}
          setCategoryFilter={setCategoryFilter}
          catalogueItems={catalogueItems}
          loading={loading}
          categoryList={catalogueCategories}
        />
        <Pagination
          tableId={tableId}
          settings={{
            enableQueryURL: true,
            total: catalogueItems?.totalCount,
            pageSizeDefault: 50
          }}
        />
        {error && <ErrorPage />}
      </TableLayoutContainer>
    </Fragment>
  )
}

export default CatalogueContainer
