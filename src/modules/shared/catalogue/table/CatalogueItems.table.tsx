import type { ColumnDef, Table } from '@tanstack/react-table'
import { useEffect, useRef, useState } from 'react'

import type { CatalogueCategory } from '@/types/gql/graphql'
import type { CatalogueItem } from '@/types/responses'
import type { CatalogueItemsResponse } from '@/types/responses'

import { PandaTable } from '../../table/pandaTable/PandaTable'
import { useCatalogueItemsColumns } from './CatalogueItems.columns'

interface CatalogueTableProps {
  additionalColumn?: ColumnDef<CatalogueItem, any>
  enableQueryURL?: boolean
  tableId?: string
  catalogueItems?: CatalogueItemsResponse
  categoryList?: CatalogueCategory[]
  loading?: boolean
  categoryUID?: string
}

export const CatalogueTable = ({
  additionalColumn,
  enableQueryURL = true,
  tableId = 'catalogueItems',
  catalogueItems,
  categoryList,
  loading,
  categoryUID
}: CatalogueTableProps) => {
  const [isHoveringId, setIsHoveringId] = useState<number | undefined | string>()

  const columns = useCatalogueItemsColumns({ tableId, additionalColumn, isHoveringId, categoryUID, catalogueItems })
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
          setIsHoveringId(id)
        },
        onMouseLeave: () => {
          setIsHoveringId(undefined)
        }
      })}
      className={'relative overflow-y-scroll scrollbar-style'}
      settings={{
        enableQueryURL,
        enableColumnHiding: tableId === 'catalogueItems',
        enableColumnReordering: tableId === 'catalogueItems'
      }}
    />
  )
}
