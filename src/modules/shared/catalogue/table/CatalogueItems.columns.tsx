import type { CellContext, ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { useCategoryList } from '@/modules/catalogue/hooks/useCategoryList'
import { CODEBOOK } from '@/types/constants/codebook'
import type { CatalogueItem, CatalogueItemsResponse } from '@/types/responses'

import { CategoryName } from './cells/CategoryNameCell'
import { DescriptionCell } from './cells/DescriptionCell'
import { ManufacturerUrl } from './cells/ManufacturerUrlCell'
import { NameCell } from './cells/NameCell'

const messages = message.cataloguePage.itemList.header

type Props = {
  tableId?: string
  additionalColumn?: ColumnDef<CatalogueItem, any>
  categoryUID?: string
  catalogueItems?: CatalogueItemsResponse
}

export const useCatalogueItemsColumns = ({ tableId, additionalColumn, categoryUID, catalogueItems }: Props) => {
  const intl = useIntl()

  const { catalogueCategories } = useCategoryList()

  const columns: ColumnDef<CatalogueItem, any>[] = useMemo(() => {
    const columns: ColumnDef<CatalogueItem, any>[] = [
      {
        header: intl.formatMessage({ id: messages.name }),
        accessorFn: row => row.name,
        id: 'name',
        cell: props => <NameCell {...props} toDelete={!additionalColumn} tableId={tableId} categoryUID={categoryUID} />,
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

    if (
      catalogueCategories?.length === 0 &&
      catalogueItems?.data[0]?.details &&
      catalogueItems?.data[0]?.details?.length > 0
    ) {
      const detailsColumns: ColumnDef<CatalogueItem, any>[] = catalogueItems?.data[0]?.details?.map(detail => ({
        header: detail.property.name,
        id: detail.property.name.replace(/\s/g, ''),
        accessorFn: row =>
          row.details?.find(originDetail => originDetail?.property.name === detail?.property.name)?.value,
        cell: ({ row: { original } }: CellContext<CatalogueItem, any>) => (
          <span>
            {original.details?.find(originDetail => originDetail?.property.name === detail?.property.name)?.value}
          </span>
        )
      }))
      if (detailsColumns) {
        const categoryNameIndex = columns.findIndex(column => column.id === 'categoryName')
        columns.splice(categoryNameIndex, 0, ...detailsColumns)
      }
    }
    if (additionalColumn) {
      columns.push(additionalColumn)
    }
    return columns
  }, [intl, catalogueItems, catalogueCategories, additionalColumn, tableId, categoryUID])

  return columns
}
