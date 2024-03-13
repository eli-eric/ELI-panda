import type { CellContext, ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { Tooltip } from '@/components/Tooltip'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { message } from '@/i18n/src/messages'
import { useCategoryUid } from '@/modules/catalogue/hooks/useCategoryUid'
import { useCategoryProperties } from '@/modules/systems/hooks/useCategoryProperties'
import { PROPERTY_TYPE } from '@/types/catalogue/constants'
import { CODEBOOK } from '@/types/constants/codebook'
import type { CatalogueItem, CatalogueItemsResponse } from '@/types/responses'
import { classNames } from '@/utils'

import { CategoryName } from './cells/CategoryNameCell'
import { DescriptionCell } from './cells/DescriptionCell'
import { ManufacturerUrl } from './cells/ManufacturerUrlCell'
import { NameCell } from './cells/NameCell'

const messages = message.cataloguePage.itemList.header

type Props = {
  tableId: string
  additionalColumn?: ColumnDef<CatalogueItem, any>
  catalogueItems?: CatalogueItemsResponse
  setCategoryFilter?: (value: CodebookType) => void
}

export const useCatalogueItemsColumns = ({ tableId, additionalColumn, catalogueItems, setCategoryFilter }: Props) => {
  const intl = useIntl()
  const uid = useCategoryUid()
  const { catalogueCategoryProperties } = useCategoryProperties(uid)

  const columns: ColumnDef<CatalogueItem, any>[] = useMemo(() => {
    const columns: ColumnDef<CatalogueItem, any>[] = [
      {
        header: 'name2',
        accessorFn: row => row.name,
        id: 'name2',
        cell: props => <NameCell {...props} toDelete={!additionalColumn} tableId={tableId} />,
        size: 300,
        meta: { sticky: true, filter: { type: 'string', enableColumnFilter: true } }
      },
      {
        header: intl.formatMessage({ id: messages.name }),
        accessorFn: row => row.name,
        id: 'name',
        cell: props => <NameCell {...props} toDelete={!additionalColumn} tableId={tableId} />,
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
        accessorFn: row => row.category,
        id: 'categoryName',
        cell: props => <CategoryName {...props} setCategoryFilter={setCategoryFilter} />,
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
      catalogueCategoryProperties &&
      catalogueItems?.data[0]?.details &&
      catalogueItems?.data[0]?.details?.length > 0
    ) {
      const detailsColumns: ColumnDef<CatalogueItem, any>[] = catalogueCategoryProperties?.map(detail => ({
        header: () => {
          const name =
            detail?.property?.name.length > 10 ? detail?.property?.name.slice(0, 10) + '...' : detail?.property?.name
          return (
            <Tooltip content={detail?.property?.name}>
              <div>
                <span>{name}</span>
              </div>
            </Tooltip>
          )
        },
        id: detail.property.name.replace(/\s/g, ''),
        size: 120,
        meta: {
          className: classNames(
            (detail?.property?.type.uid === PROPERTY_TYPE.NUMBER ||
              detail?.property?.type.uid === PROPERTY_TYPE.RANGE) &&
              'text-right'
          )
        },
        accessorFn: row =>
          row.details?.find(originDetail => originDetail?.property.name === detail?.property.name)?.value,
        cell: ({ row: { original } }: CellContext<CatalogueItem, any>) => {
          const value = original.details?.find(
            originDetail => originDetail?.property.uid === detail?.property.uid
          )?.value
          const unit = detail?.property?.unit?.name
          if (!value) return null
          if (detail?.property?.type.uid === PROPERTY_TYPE.RANGE) {
            let valObject = value
            if (typeof valObject === 'string') {
              valObject = JSON.parse(valObject)
            }
            return (
              <div>
                <span>{valObject?.min}</span>
                <span> - </span>
                <span>{valObject?.max}</span>
                {unit && <span> {unit}</span>}
              </div>
            )
          }
          return (
            <div>
              <span className={classNames(unit && 'font-bold')}>{value}</span>
              {unit && <span> {unit}</span>}
            </div>
          )
        }
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
    // eslint-disable-next-line
  }, [intl, catalogueItems, additionalColumn, tableId, catalogueCategoryProperties])

  return columns
}
