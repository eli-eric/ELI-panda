import type { CellContext, ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { Tooltip } from '@/components/Tooltip'
import { message } from '@/i18n/src/messages'
import { useCategoryUid } from '@/modules/catalogue/hooks/useCategoryUid'
import { useCategoryProperties } from '@/modules/systems/hooks/useCategoryProperties'
import { PROPERTY_TYPE } from '@/types/catalogue/constants'
import { CODEBOOK } from '@/types/constants/codebook'
import { fallbackImage } from '@/types/constants/common'
import type {
  CatalogueItem,
  CatalogueItemsResponse
} from '@/types/responses/catalogue'
import type { CodebookType } from '@/types/responses/codebook'
import { classNames } from '@/utils'

import { CategoryName } from './cells/CategoryNameCell'
import { DescriptionCell } from './cells/DescriptionCell'
import { ManufacturerUrl } from './cells/ManufacturerUrlCell'
import { NameCell } from './cells/NameCell'

const messages = message.cataloguePage.itemList.header

type Props = {
  tableId: string
  hideButtons?: boolean
  catalogueItems?: CatalogueItemsResponse
  setCategoryFilter?: (value: CodebookType) => void
}

export const useCatalogueItemsColumns = ({
  tableId,
  hideButtons,
  catalogueItems,
  setCategoryFilter
}: Props) => {
  const intl = useIntl()
  const uid = useCategoryUid()
  const { catalogueCategoryProperties } = useCategoryProperties(uid)

  const columns: ColumnDef<CatalogueItem, any>[] = useMemo(() => {
    const columns: ColumnDef<CatalogueItem, any>[] = [
      {
        id: 'miniImageUrl',
        size: 32,
        header: '',
        enableColumnFilter: false,
        meta: {
          sticky: true,
          enableReorder: false,
          className: 'pl-0 pr-0'
        },
        accessorFn: row => row?.miniImageUrl?.[0],
        cell: ({ getValue }) => {
          return (
            <Image
              src={getValue() || fallbackImage.url}
              alt="img"
              width={50}
              height={50}
              className="rounded-full w-8 h-8 object-cover justify-center"
            />
          )
        }
      },
      {
        header: intl.formatMessage({ id: messages.name }),
        accessorFn: row => row.name,
        id: 'name',
        cell: props => (
          <NameCell {...props} hideButtons={hideButtons} tableId={tableId} />
        ),
        size: 300,
        meta: {
          sticky: hideButtons ? false : true,
          filter: { type: 'string', enableColumnFilter: true }
        }
      },
      {
        header: intl.formatMessage({ id: messages.description }),
        accessorFn: row => row.description,
        id: 'description',
        cell: DescriptionCell,
        size: 90,
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
        cell: props => (
          <CategoryName {...props} setCategoryFilter={setCategoryFilter} />
        ),
        meta: {
          filter: {
            type: 'autoComplete',
            enableColumnFilter: true,
            codebookCode: CODEBOOK.CATALOGUE_CATEGORY
          }
        }
      },
      {
        header: intl.formatMessage({ id: messages.supplier }),
        accessorFn: row => row.supplier?.name,
        id: 'supplier',
        meta: {
          filter: {
            type: 'autoComplete',
            enableColumnFilter: true,
            codebookCode: CODEBOOK.SUPPLIER
          }
        }
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
      const detailsColumns: ColumnDef<CatalogueItem, any>[] =
        catalogueCategoryProperties?.map(detail => ({
          header: () => {
            const name =
              detail?.property?.name.length > 10
                ? detail?.property?.name.slice(0, 10) + '...'
                : detail?.property?.name
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
            row.details?.find(
              originDetail =>
                originDetail?.property.name === detail?.property.name
            )?.value,
          cell: ({ row: { original } }: CellContext<CatalogueItem, any>) => {
            const value = original.details?.find(
              originDetail =>
                originDetail?.property.uid === detail?.property.uid
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
        const categoryNameIndex = columns.findIndex(
          column => column.id === 'categoryName'
        )
        columns.splice(categoryNameIndex, 0, ...detailsColumns)
      }
    }

    return columns
    // eslint-disable-next-line
  }, [intl, catalogueItems, tableId, catalogueCategoryProperties, hideButtons])

  return columns
}
