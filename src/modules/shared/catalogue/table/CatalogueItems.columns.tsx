import { InformationCircleIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useIntl } from 'react-intl'
import type { CellProps } from 'react-table'
import { type Column } from 'react-table'

import { DeleteButton } from '@/components/Buttons'
import WarningModal from '@/components/modal/warning/modal-warning.comp'
import { createMessageValues } from '@/helpers/formatters'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useCatalogueImage } from '@/hooks/fetch/useImage'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import { message } from '@/i18n/src/messages'
import { useCatalogueItems } from '@/modules/catalogue/hooks/useCatalogueItems'
import { useCategoryList } from '@/modules/catalogue/hooks/useCategoryList'
import { PATH } from '@/types/constants/paths'
import type { ModalButtons } from '@/types/form'
import type { CatalogueItem } from '@/types/responses'

const messages = message.cataloguePage.itemList.header
const buttonsMessage = message.common.buttons
const modalMessage = message.ordersPage.deleteModal

const Name = ({
  value,
  row: {
    original: { uid }
  },
  toDelete
}: CellProps<CatalogueItem>) => {
  const { catalogueItem } = useEndpoint({ uid })
  const image = useCatalogueImage(uid)
  const [openDeleteWarn, setOpenDeleteWarn] = useState(false)
  const { formatMessage } = useIntl()
  const { mutate, catalogueItems } = useCatalogueItems()

  const [loading, setLoading] = useState(true)

  const deleteSubmit = useSubmit({
    endpoint: catalogueItem,
    method: 'delete',
    onSuccess: () => {
      setOpenDeleteWarn(false)
      catalogueItems && mutate({ ...catalogueItems, data: catalogueItems?.data.filter(item => item.uid !== uid) })
    },
    onError: e => {
      if (e?.response?.status === 409) {
        toast.error(`Can't delete ${value}, it is binded in another items.`)
      } else {
        toast.error(`Error deleting ${value}.`)
      }
    }
  })

  const deleteButtons: ModalButtons = {
    goNext: {
      text: buttonsMessage.continue,
      loading: deleteSubmit.loading,
      onClick: () => {
        deleteSubmit.submit()
      }
    },
    goBack: {
      text: buttonsMessage.cancel,
      onClick: () => {
        setOpenDeleteWarn(false)
      }
    }
  }

  return (
    <div className="flex items-center">
      {toDelete && (
        <DeleteButton
          className="mr-1 z-0"
          onClick={() => {
            setOpenDeleteWarn(true)
          }}
        />
      )}
      <Link href={{ pathname: '/catalogue/item/' + uid }} className="flex items-center text-blue-500 hover:underline">
        <Image
          id={image.id}
          priority={false}
          className={classNames('h-10 w-10 flex-shrink-0 rounded-full bg-gray-300', loading ? 'animate-pulse' : '')}
          onLoadingComplete={() => {
            setLoading(false)
          }}
          alt={image.name}
          src={image.url}
          width={100}
          height={100}
          unoptimized
        />
        <div className="ml-4 ">{value}</div>
      </Link>
      <WarningModal
        buttons={deleteButtons}
        open={openDeleteWarn}
        setOpen={setOpenDeleteWarn}
        title={modalMessage.title}
        message={formatMessage({ id: modalMessage.message }, createMessageValues({ name: value }))}
        testid="CatalogueDeleteModal"
        error={deleteSubmit.error}
      />
    </div>
  )
}

const Description = ({ value }: CellProps<CatalogueItem>) => (
  <Fragment>
    {value && (
      <InformationCircleIcon className="h-8 w-8 flex-shrink-0" data-tooltip-id="tooltip" data-tooltip-content={value} />
    )}
  </Fragment>
)

const CategoryName = ({
  value,
  row: {
    original: { categoryPath }
  }
}: CellProps<CatalogueItem>) => {
  const router = useRouter()
  const link = PATH.CATALOGUE + '/' + categoryPath
  return (
    <Fragment>
      <Link href={{ pathname: link, query: { ...router.query } }} className="text-blue-500 hover:underline">
        {value}
      </Link>
    </Fragment>
  )
}

const ManufacturerUrl = ({ value }: CellProps<CatalogueItem>) => (
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

const useCatalogueItemsColumns = (toDelete: boolean) => {
  const intl = useIntl()

  const { catalogueItems } = useCatalogueItems()
  const { categoryList } = useCategoryList()

  const columns = useMemo((): Column<CatalogueItem>[] => {
    const columns: Column<CatalogueItem>[] = [
      {
        Header: intl.formatMessage({ id: messages.name }),
        accessor: 'name',
        id: 'name',
        Cell: props => <Name {...props} toDelete={toDelete} />
      },
      {
        Header: intl.formatMessage({ id: messages.description }),
        accessor: 'description',
        id: 'description',
        Cell: Description
      },
      {
        Header: intl.formatMessage({ id: messages.categoryName }),
        accessor: 'categoryName',
        id: 'categoryName',
        Cell: CategoryName
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
        Cell: ManufacturerUrl
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
        columns.splice(categoryNameIndex, 0, ...detailsColumns)
      }
    }

    return columns
  }, [intl, catalogueItems, categoryList, toDelete])

  return columns
}

export default useCatalogueItemsColumns
