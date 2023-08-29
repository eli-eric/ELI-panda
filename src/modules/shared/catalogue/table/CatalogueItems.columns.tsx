import type { CellContext, ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { useCatalogueItems } from '@/modules/catalogue/hooks/useCatalogueItems'
import { useCategoryList } from '@/modules/catalogue/hooks/useCategoryList'
import type { CatalogueItem } from '@/modules/catalogueItem/types/responses'
import { CODEBOOK } from '@/types/constants/codebook'

import { CategoryName } from './cells/CategoryNameCell'
import { DescriptionCell } from './cells/DescriptionCell'
import { ManufacturerUrl } from './cells/ManufacturerUrlCell'
import { NameCell } from './cells/NameCell'

const messages = message.cataloguePage.itemList.header

export const useCatalogueItemsColumns = (
  tableId?: string,
  additionalColumn?: ColumnDef<CatalogueItem, any>,
  isHoveringId?: number | string
) => {
  const intl = useIntl()

  const { catalogueItems } = useCatalogueItems(tableId)
  const { categoryList } = useCategoryList()

  const columns: ColumnDef<CatalogueItem, any>[] = useMemo(() => {
    const columns: ColumnDef<CatalogueItem, any>[] = [
      {
        header: intl.formatMessage({ id: messages.name }),
        accessorFn: row => row.name,
        id: 'name',
        cell: props => (
          <NameCell {...props} toDelete={!additionalColumn} tableId={tableId} isHoveringId={isHoveringId} />
        ),
        size: 300,
        meta: { sticky: true, filter: { type: 'string', enableColumnFilter: true } }
      },
      {
        header: intl.formatMessage({ id: messages.description }),
        accessorFn: row => row.description,
        id: 'description',
        cell: DescriptionCell,
        maxSize: 100,
        size: 100,
        meta: { filter: { type: 'string', enableColumnFilter: true } }
      },
      {
        header: intl.formatMessage({ id: messages.partNumber }),
        accessorFn: row => row.catalogueNumber,
        id: 'partNumber',
        meta: { filter: { type: 'string', enableColumnFilter: true } }
      },
      {
        header: intl.formatMessage({ id: messages.categoryName }),
        accessorFn: row => row.categoryName,
        id: 'categoryName',
        cell: CategoryName,
        meta: { filter: { type: 'autoComplete', enableColumnFilter: true, codebookCode: CODEBOOK.CATALOGUE_CATEGORY } }
      },
      {
        header: intl.formatMessage({ id: messages.supplier }),
        accessorFn: row => row.supplier?.name,
        id: 'supplier',
        meta: { filter: { type: 'autoComplete', enableColumnFilter: true, codebookCode: CODEBOOK.SUPPLIER } }
      },
      {
        header: intl.formatMessage({ id: messages.supplierUrl }),
        accessorFn: row => row.manufacturerUrl,
        id: 'manufacturerUrl',
        cell: ManufacturerUrl,
        meta: { filter: { type: 'string', enableColumnFilter: true } }
      }
    ]

    let detailsColumns: ColumnDef<CatalogueItem, any>[] = []
    if (catalogueItems?.columnDef && catalogueItems?.columnDef?.length > 0) {
      detailsColumns = catalogueItems.columnDef?.map(def => ({
        header: def.accessorKey,
        id: def.accessorKey.replace(/\s/g, ''),
        accessorFn: row => row.details?.find(originDetail => originDetail?.property.name === def.accessorKey)?.value,
        cell: ({ row: { original } }: CellContext<CatalogueItem, any>) => (
          <span>{original.details?.find(originDetail => originDetail?.property.name === def.accessorKey)?.value}</span>
        )
      }))
    }
    if (categoryList && categoryList.length === 0) {
      const categoryNameIndex = columns.findIndex(column => column.id === 'categoryName')
      columns.splice(categoryNameIndex, 1)
    }
    if (additionalColumn) {
      columns.push(additionalColumn)
    }
    return [...columns, ...detailsColumns]
  }, [intl, catalogueItems, additionalColumn, tableId, isHoveringId, categoryList])

  return columns
}
