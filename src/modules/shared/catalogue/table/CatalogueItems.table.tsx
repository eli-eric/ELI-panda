import type { ColumnDef, Table } from '@tanstack/react-table'
import { useEffect, useRef } from 'react'

import type { CatalogueCategoryResponse, CatalogueItem, CatalogueItemsResponse } from '@/types/responses'

import { PandaTable } from '../../table/pandaTable/PandaTable'
import { useCatalogueItemsColumns } from './CatalogueItems.columns'

interface CatalogueTableProps {
  additionalColumn?: ColumnDef<CatalogueItem, any>
  enableQueryURL?: boolean
  tableId?: string
  catalogueItems?: CatalogueItemsResponse
  categoryList?: CatalogueCategoryResponse[]
  loading?: boolean
}

export const CatalogueTable = ({
  additionalColumn,
  enableQueryURL = true,
  tableId = 'catalogueItems',
  catalogueItems,
  categoryList,
  loading
}: CatalogueTableProps) => {
  const columns = useCatalogueItemsColumns(tableId, additionalColumn)
  const catalogueTableRef = useRef<Table<CatalogueItem>>()

  useEffect(() => {
    if (catalogueTableRef.current) {
      catalogueTableRef.current.setColumnVisibility({ categoryName: categoryList?.length !== 0 })
    }
  }, [categoryList])

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
      className={'relative overflow-x-auto'}
      settings={{ enableQueryURL: enableQueryURL }}
    />
  )
}
