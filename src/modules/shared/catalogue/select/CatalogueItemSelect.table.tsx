import type { Row } from '@tanstack/react-table'
import { createContext, useEffect } from 'react'

import type { GetCategoriesQuery } from '@/types/gql/graphql'
import type {
  CatalogueItem,
  CatalogueItemsResponse
} from '@/types/responses/catalogue'
import type { CodebookType } from '@/types/responses/codebook'

import { usePandaTable } from '../../table/pandaTable/hooks/usePandaTable'
import type { GetRowPropsReturnType } from '../../table/pandaTable/PandaTable'
import { PandaTableV2 } from '../../table/pandaTableV2/PandaTableV2'
import { useCatalogueItemSelectColumns } from './CatalogueItemSelect.columns'

interface CatalogueItemSelectTableProps {
  hideButtons?: boolean
  enableQueryURL?: boolean
  tableId: string
  catalogueItems?: CatalogueItemsResponse
  categoryList?: GetCategoriesQuery['catalogueCategories']
  loading?: boolean
  setCategoryFilter?: (value: CodebookType) => void
  getRowProps?: (row: Row<any>) => GetRowPropsReturnType
  selectedItemUid?: string
  onItemToggle: (item: CatalogueItem) => void
  pinnedData: CatalogueItem[]
}

export const CatalogueItemSelectTableContext = createContext<{
  isHoveringId: number | undefined | string
}>({
  isHoveringId: undefined
})

export const CatalogueItemSelectTable = ({
  hideButtons,
  enableQueryURL = false,
  tableId,
  catalogueItems,
  getRowProps,
  categoryList,
  loading,
  setCategoryFilter,
  selectedItemUid,
  onItemToggle,
  pinnedData
}: CatalogueItemSelectTableProps) => {
  const columns = useCatalogueItemSelectColumns({
    tableId,
    hideButtons,
    catalogueItems,
    setCategoryFilter,
    selectedItemUid,
    onItemToggle
  })

  const table = usePandaTable({
    tableId,
    columns,
    data: pinnedData,
    settings: {
      enableSorting: true,
      enableQueryURL: false,
      enableColumnHiding: true,
      enableColumnReordering: true,
      manualSorting: true,
      defaultColumnOrder: ['selection', 'name']
    }
  })

  useEffect(() => {
    table.setColumnVisibility({
      categoryName: categoryList?.length !== 0
    })
    table.setColumnOrder(table.getAllLeafColumns().map(column => column.id))
  }, [categoryList, columns, table])

  return (
    <PandaTableV2
      table={table}
      loading={loading}
      tableId={tableId}
      getRowProps={getRowProps}
      data={pinnedData}
      className={'relative overflow-y-scroll scrollbar-style text-sm'}
      settings={{
        enableQueryURL,
        defaultColumnOrder: ['selection', 'name'],
        enableColumnHiding: false,
        enableColumnReordering: false,
        enableSorting: false,
        manualSorting: false
      }}
    />
  )
}
