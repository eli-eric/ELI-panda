import type { Row } from '@tanstack/react-table'
import { createContext, useEffect } from 'react'

import type { GetCategoriesQuery } from '@/types/gql/graphql'
import type { CatalogueItemsResponse } from '@/types/responses/catalogue'
import type { CodebookType } from '@/types/responses/codebook'

import { usePandaTable } from '../../table/pandaTable/hooks/usePandaTable'
import type { GetRowPropsReturnType } from '../../table/pandaTable/PandaTable'
import { PandaTablev2 } from '../../table/pandaTableV2/PandaTableV2'
import { useCatalogueItemsColumns } from './CatalogueItems.columns'

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

  const table = usePandaTable({
    tableId,
    columns,
    data: catalogueItems?.data,
    settings: {
      enableSorting: true,
      enableQueryURL: true,
      enableColumnHiding: true,
      enableColumnReordering: true,
      manualSorting: true
    }
  })

  useEffect(() => {
    table.setColumnVisibility({
      categoryName: categoryList?.length !== 0
    })
    table.setColumnOrder(table.getAllLeafColumns().map(column => column.id))
  }, [categoryList, columns, table])

  return (
    <PandaTablev2
      table={table}
      loading={loading}
      tableId={tableId}
      getRowProps={getRowProps}
      data={catalogueItems?.data}
      className={'relative overflow-y-scroll scrollbar-style text-sm'}
      settings={{
        enableQueryURL,
        defaultColumnOrder: ['miniImageUrl', 'name'],
        enableColumnHiding: tableId === 'catalogueItems',
        enableColumnReordering: tableId === 'catalogueItems',
        enableSorting: tableId === 'catalogueItems',
        manualSorting: tableId === 'catalogueItems'
      }}
    />
  )
}
