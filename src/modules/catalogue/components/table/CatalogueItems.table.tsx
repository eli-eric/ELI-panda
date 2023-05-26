import { useEffect } from 'react'

import useGeneralTable from '@/hooks/table/useGeneralTable'
import usePagination from '@/hooks/table/usePagination'
import type { CatalogueItem } from '@/types/responses'

import useCatalogueItems from '../../hooks/useCatalogueItems'
import useCategoryList from '../../hooks/useCategoryList'
import useCatalogueItemsColumns from './CatalogueItems.columns'

const useCatalogueItemsTable = () => {
  const { catalogueItems, loading } = useCatalogueItems()
  const { categoryList } = useCategoryList()

  const { getPaginationComponent } = usePagination({
    useQuery: true,
    tableId: 'catalogueItems',
    total: catalogueItems?.totalCount,
    pageSizeDefault: 50
  })

  const columns = useCatalogueItemsColumns()

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
    if (categoryList) {
      if (!categoryList || categoryList.length === 0) {
        toggleHideColumn('categoryName', true)
      } else {
        toggleHideColumn('categoryName', false)
      }
    }
  }, [categoryList]) // eslint-disable-line react-hooks/exhaustive-deps

  return { getTable, getPaginationComponent }
}

export default useCatalogueItemsTable
