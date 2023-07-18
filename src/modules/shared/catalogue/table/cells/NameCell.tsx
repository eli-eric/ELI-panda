import type { CellContext } from '@tanstack/react-table'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useIntl } from 'react-intl'

import { DeleteButton } from '@/components/Buttons'
import WarningModal from '@/components/modal/warning/modal-warning.comp'
import { createMessageValues } from '@/helpers/formatters'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useCatalogueImage } from '@/hooks/fetch/useImage'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import { message } from '@/i18n/src/messages'
import { useCatalogueItems } from '@/modules/catalogue/hooks/useCatalogueItems'
import type { ModalButtons } from '@/types/form'
import type { CatalogueItem } from '@/types/responses'

const buttonsMessage = message.common.buttons
const modalMessage = message.ordersPage.deleteModal

interface NameProps extends CellContext<CatalogueItem, any> {
  toDelete?: boolean
  tableId?: string
}

//TODO: permissions
export const NameCell = ({
  getValue,
  row: {
    original: { uid }
  },
  toDelete,
  tableId
}: NameProps) => {
  const { catalogueItem } = useEndpoint({ uid })
  const image = useCatalogueImage(uid)
  const [openDeleteWarn, setOpenDeleteWarn] = useState(false)
  const { formatMessage } = useIntl()
  const { mutate, catalogueItems } = useCatalogueItems(tableId)

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
        toast.error(`Can't delete ${getValue()}, it is binded in another items.`)
      } else {
        toast.error(`Error deleting ${getValue()}.`)
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
        <div className="ml-4 ">{getValue()}</div>
      </Link>
      <WarningModal
        buttons={deleteButtons}
        open={openDeleteWarn}
        setOpen={setOpenDeleteWarn}
        title={modalMessage.title}
        message={formatMessage({ id: modalMessage.message }, createMessageValues({ name: getValue() }))}
        testid="CatalogueDeleteModal"
        error={deleteSubmit.error}
      />
    </div>
  )
}
