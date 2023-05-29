import { useEffect } from 'react'
import type { Column } from 'react-table'

import useGeneralTable from '@/hooks/table/useGeneralTable'
import usePagination from '@/hooks/table/usePagination'
import useCatalogueItems from '@/modules/catalogue/hooks/useCatalogueItems'
import useCategoryList from '@/modules/catalogue/hooks/useCategoryList'
import type { CatalogueItem } from '@/types/responses'

import useCatalogueItemsColumns from './CatalogueItems.columns'

const useCatalogueTable = (pageSizeDefault?: number, additionalColumn?: Column<CatalogueItem>, useQuery?: boolean) => {
  const { catalogueItems, loading } = useCatalogueItems()
  const { categoryList } = useCategoryList()

  const { getPaginationComponent } = usePagination({
    useQuery: useQuery ?? true,
    tableId: 'catalogueItems',
    total: catalogueItems?.totalCount,
    pageSizeDefault: pageSizeDefault || 50
  })

  const columns = useCatalogueItemsColumns()

  if (additionalColumn) {
    columns.splice(0, 0, additionalColumn)
  }

  const { getTable, toggleHideColumn } = useGeneralTable<CatalogueItem>({
    tableId: 'catalogueItems',
    data: catalogueItems?.data,
    loading,
    columns,
    className: 'relative overflow-x-auto',
    getCellProps: ({ column }) => ({ className: column.id === 'description' ? '' : 'whitespace-nowrap' }),
    getRowProps: () => ({ className: 'hover:bg-primary-200' })
  })

  useEffect(() => {
    toggleHideColumn('categoryName', !categoryList || categoryList.length === 0)
  }, [categoryList]) // eslint-disable-line react-hooks/exhaustive-deps

  return { getTable, getPaginationComponent }
}

export default useCatalogueTable
