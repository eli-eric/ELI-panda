import { X } from 'lucide-react'
import { useQueryState } from 'next-usequerystate'
import { useCallback, useMemo, useState } from 'react'
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
import { PaginationV2 as Pagination } from '../shared/table/PaginationV2'
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
  const defValues = useMemo<CatalogueItemForm>(
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
  const { formatMessage: fm } = useIntl()

  return (
    <div className="w-max-full flex flex-col">
      <SearchBar
        left={<SearchBarButtons filterFormMethods={filterFormMethods} />}
        tableId={tableId}
        right={
          <FilterBadges
            tableId={tableId}
            additionalBadge={
              categoryQuery ? (
                <Badge>
                  <span>
                    {fm({
                      id: message.catalogue.category.badge,
                      defaultMessage: 'Category'
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
      <CategoryListContainer
        setCategoryFilter={setCategoryFilter}
        onChange={setOpen}
      />
      <TableLayoutContainer deps={[open, catalogueItems, catalogueCategories]}>
        <CatalogueTable
          tableId={tableId}
          setCategoryFilter={setCategoryFilter}
          catalogueItems={catalogueItems}
          loading={loading}
          pageSize={50}
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
    </div>
  )
}

export default CatalogueContainer
