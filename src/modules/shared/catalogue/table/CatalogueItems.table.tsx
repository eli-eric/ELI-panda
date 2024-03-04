import type { ColumnDef, Table } from '@tanstack/react-table'
import { createContext, useEffect, useRef } from 'react'

import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { useHoveringId } from '@/store/useHoveringId'
import type { CatalogueCategory } from '@/types/gql/graphql'
import type { CatalogueItem, CatalogueItemsResponse } from '@/types/responses'

import { PandaTable } from '../../table/pandaTable/PandaTable'
import { useCatalogueItemsColumns } from './CatalogueItems.columns'

interface CatalogueTableProps {
  additionalColumn?: ColumnDef<CatalogueItem, any>
  enableQueryURL?: boolean
  tableId?: string
  catalogueItems?: CatalogueItemsResponse
  categoryList?: CatalogueCategory[]
  loading?: boolean
  enableFiltering?: boolean
  setCategoryFilter?: (value: CodebookType) => void
}

export const CatalogueTableContext = createContext<{ isHoveringId: number | undefined | string }>({
  isHoveringId: undefined
})

export const CatalogueTable = ({
  additionalColumn,
  enableQueryURL = true,
  tableId = 'catalogueItems',
  catalogueItems,
  categoryList,
  loading,
  setCategoryFilter
}: CatalogueTableProps) => {
  const columns = useCatalogueItemsColumns({ tableId, additionalColumn, catalogueItems, setCategoryFilter })
  const { setHoveringId } = useHoveringId()
  const catalogueTableRef = useRef<Table<CatalogueItem>>()

  useEffect(() => {
    if (catalogueTableRef.current) {
      catalogueTableRef.current.setColumnVisibility({ categoryName: categoryList?.length !== 0 })
      catalogueTableRef.current.setColumnOrder(catalogueTableRef.current.getAllLeafColumns().map(column => column.id))
    }
  }, [categoryList, columns])

  useEffect(() => {
    if (catalogueTableRef.current) {
      if (additionalColumn) {
        catalogueTableRef.current.setColumnOrder(['select'])
      }
    }
  }, [additionalColumn])

  return (
    <PandaTable
      ref={catalogueTableRef}
      columns={columns}
      loading={loading}
      tableId={tableId}
      data={catalogueItems?.data}
      getRowProps={({ id }) => ({
        onMouseEnter: () => {
          setHoveringId(id)
        },
        onMouseLeave: () => {
          setHoveringId(undefined)
        }
      })}
      className={'relative overflow-y-scroll scrollbar-style'}
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
