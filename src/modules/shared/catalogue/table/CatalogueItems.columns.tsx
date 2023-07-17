import type { CellContext, ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { useCatalogueItems } from '@/modules/catalogue/hooks/useCatalogueItems'
import { useCategoryList } from '@/modules/catalogue/hooks/useCategoryList'
import type { CatalogueItem } from '@/types/responses'

import { CategoryName } from './cells/CategoryNameCell'
import { DescriptionCell } from './cells/DescriptionCell'
import { ManufacturerUrl } from './cells/ManufacturerUrlCell'
import { NameCell } from './cells/NameCell'

const messages = message.cataloguePage.itemList.header

export const useCatalogueItemsColumns = (tableId?: string, additionalColumn?: ColumnDef<CatalogueItem, any>) => {
  const intl = useIntl()

  const { catalogueItems } = useCatalogueItems(tableId)
  const { categoryList } = useCategoryList()

  const columns: ColumnDef<CatalogueItem, any>[] = useMemo(() => {
    const columns: ColumnDef<CatalogueItem, any>[] = [
      {
        header: intl.formatMessage({ id: messages.name }),
        accessorFn: row => row.name,
        id: 'name',
        cell: props => <NameCell {...props} toDelete={!additionalColumn} tableId={tableId} />,
        size: 300
      },
      {
        header: intl.formatMessage({ id: messages.description }),
        accessorFn: row => row.description,
        id: 'description',
        cell: DescriptionCell
      },
      {
        header: intl.formatMessage({ id: messages.categoryName }),
        accessorFn: row => row.categoryName,
        id: 'categoryName',
        cell: CategoryName
      },
      {
        header: intl.formatMessage({ id: messages.supplier }),
        accessorFn: row => row.supplier?.name,
        id: 'supplier',
        cell: ({ getValue }: CellContext<CatalogueItem, any>) => <span>{getValue()?.name}</span>
      },
      {
        header: intl.formatMessage({ id: messages.supplierUrl }),
        accessorFn: row => row.manufacturerUrl,
        id: 'manufacturerUrl',
        cell: ManufacturerUrl
      }
    ]

    if (
      categoryList?.length === 0 &&
      catalogueItems?.data[0]?.details &&
      catalogueItems?.data[0]?.details?.length > 0 &&
      catalogueItems.data[0]?.details[0]?.property?.type?.name
    ) {
      const detailsColumns: ColumnDef<CatalogueItem, any>[] = catalogueItems?.data[0]?.details?.map(detail => ({
        header: detail.property.name,
        id: detail.property.name,
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
  }, [intl, catalogueItems, categoryList, additionalColumn, tableId])

  return columns
}
