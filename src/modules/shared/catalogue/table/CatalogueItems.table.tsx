import type { Row, Table } from '@tanstack/react-table'
import { createContext, useEffect, useRef } from 'react'

import type { CodebookType } from '@/hooks/fetch/useCodebook'
import type { CatalogueItem, CatalogueItemsResponse } from '@/types/responses'

import type { GetRowPropsReturnType } from '../../table/pandaTable/PandaTable'
import { PandaTable } from '../../table/pandaTable/PandaTable'
import { useCatalogueItemsColumns } from './CatalogueItems.columns'
import type { GetCategoriesQuery } from '@/types/gql/graphql'

interface CatalogueTableProps {
  hideButtons?: boolean
  enableQueryURL?: boolean
  tableId?: string
  catalogueItems?: CatalogueItemsResponse
  categoryList?: GetCategoriesQuery['catalogueCategories']
  loading?: boolean
  enableFiltering?: boolean
  setCategoryFilter?: (value: CodebookType) => void
  getRowProps?: (row: Row<any>) => GetRowPropsReturnType
}

export const CatalogueTableContext = createContext<{
  isHoveringId: number | undefined | string
}>({
  isHoveringId: undefined
})

export const CatalogueTable = ({
  hideButtons,
  enableQueryURL = true,
  tableId = 'catalogueItems',
  catalogueItems,
  getRowProps,
  categoryList,
  loading,
  setCategoryFilter
}: CatalogueTableProps) => {
  const columns = useCatalogueItemsColumns({
    tableId,
    hideButtons,
    catalogueItems,
    setCategoryFilter
  })
  const catalogueTableRef = useRef<Table<CatalogueItem>>()

  useEffect(() => {
    if (catalogueTableRef.current) {
      catalogueTableRef.current.setColumnVisibility({
        categoryName: categoryList?.length !== 0
      })
      catalogueTableRef.current.setColumnOrder(
        catalogueTableRef.current.getAllLeafColumns().map(column => column.id)
      )
    }
  }, [categoryList, columns])

  return (
    <PandaTable
      ref={catalogueTableRef}
      columns={columns}
      loading={loading}
      tableId={tableId}
      getRowProps={getRowProps}
      data={catalogueItems?.data}
      className={'relative overflow-y-scroll scrollbar-style text-sm'}
      settings={{
        enableQueryURL,
        enableColumnHiding: tableId === 'catalogueItems',
        enableColumnReordering: tableId === 'catalogueItems',
        enableSorting: tableId === 'catalogueItems',
        manualSorting: tableId === 'catalogueItems'
      }}
    />
  )
}
