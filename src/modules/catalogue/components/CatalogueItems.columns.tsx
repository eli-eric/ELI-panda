import { InformationCircleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useMemo } from 'react'
import { useIntl } from 'react-intl'
import type { CellProps } from 'react-table'
import { type Column } from 'react-table'

import TooltipComponent from '@/components/tooltip.comp'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useImage } from '@/hooks/useImage'
import { message } from '@/i18n/src/messages'
import type { CatalogueItem } from '@/types/responses'

import useCatalogueItems from '../hooks/useCatalogueItems'
import useCategoryList from '../hooks/useCategoryList'

const messages = message.cataloguePage.itemList.header

interface Props {
  name: string
  uid: string
}

const Name = ({ name, uid }: Props) => {
  const { catalogueItemImage } = useEndpoint({ uid })
  const image = useImage(catalogueItemImage)

  return (
    <Link href={{ pathname: '/catalogue/item/' + uid }} className="text-blue-500 hover:underline">
      <div className="flex items-center">
        <div className="h-10 w-10 flex-shrink-0">
          <Image className="h-10 w-10 rounded-full" alt={name} src={image} width={200} height={200} />
        </div>
        <div className="ml-4 ">{name}</div>
      </div>
    </Link>
  )
}

const useCatalogueItemsColumns = () => {
  const intl = useIntl()

  const { catalogueItems } = useCatalogueItems()
  const { categoryList } = useCategoryList()

  const columns = useMemo((): Column<CatalogueItem>[] => {
    const columns: Column<CatalogueItem>[] = [
      {
        Header: intl.formatMessage({ id: messages.name }),
        accessor: 'name',
        id: 'name',
        Cell: ({
          value,
          row: {
            original: { uid }
          }
        }: CellProps<CatalogueItem>) => <Name name={value} uid={uid} />
      },
      {
        Header: intl.formatMessage({ id: messages.description }),
        accessor: 'description',
        id: 'description',
        Cell: ({ value }: CellProps<CatalogueItem>) => (
          <Fragment>
            {value && (
              <TooltipComponent text={value}>
                <InformationCircleIcon className="h-8 w-8 flex-shrink-0" />
              </TooltipComponent>
            )}
          </Fragment>
        )
      },
      {
        Header: intl.formatMessage({ id: messages.categoryName }),
        accessor: 'categoryName',
        id: 'categoryName',
        Cell: ({
          value,
          row: {
            original: { categoryPath }
          }
        }: CellProps<CatalogueItem>) => {
          const router = useRouter()
          return (
            <Fragment>
              <Link
                href={{ pathname: categoryPath, query: { ...router.query } }}
                className="text-blue-500 hover:underline"
              >
                {value}
              </Link>
            </Fragment>
          )
        }
      },
      {
        Header: intl.formatMessage({ id: messages.manufacturer }),
        accessor: 'manufacturer',
        id: 'manufacturer'
      },
      {
        Header: intl.formatMessage({ id: messages.manufacturerNumber }),
        accessor: 'manufacturerNumber',
        id: 'manufacturerNumber'
      },
      {
        Header: intl.formatMessage({ id: messages.manufacturerUrl }),
        accessor: 'manufacturerUrl',
        id: 'manufacturerUrl',
        Cell: ({ value }: CellProps<CatalogueItem>) => (
          <Fragment>
            {value && (
              <Link href={value} passHref legacyBehavior>
                <a target="_blank" className="text-blue-500 hover:underline">
                  link
                </a>
              </Link>
            )}
          </Fragment>
        )
      }
    ]

    if (
      categoryList?.length === 0 &&
      catalogueItems?.data[0]?.details &&
      catalogueItems?.data[0]?.details[0]?.propertyName
    ) {
      const detailsColumns = catalogueItems?.data[0]?.details?.map(detail => ({
        Header: detail.propertyName,
        id: detail.propertyName,
        accessor: ({ details }: CatalogueItem) =>
          details?.find(originDetail => originDetail?.propertyName === detail?.propertyName)?.value,
        Cell: ({ row: { original } }: CellProps<CatalogueItem>) => (
          <span>
            {original.details?.find(originDetail => originDetail?.propertyName === detail?.propertyName)?.value}
          </span>
        )
      }))
      if (detailsColumns) {
        const categoryNameIndex = columns.findIndex(column => column.accessor === 'categoryName')
        columns.splice(categoryNameIndex + 1, 0, ...detailsColumns)
      }
    }

    return columns
  }, [intl, catalogueItems, categoryList])

  return columns
}

export default useCatalogueItemsColumns
