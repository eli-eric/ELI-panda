import type { CellContext } from '@tanstack/react-table'
import Link from 'next/link'
import { useState } from 'react'
import { isMobile } from 'react-device-detect'
import { toast } from 'react-hot-toast'
import { useIntl } from 'react-intl'

import { TableActionsButtons } from '@/components/Buttons'
import { LinkDecorator } from '@/components/decorators'
import WarningModal from '@/components/modal/warning/modal-warning.comp'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { useCatalogueItems } from '@/modules/catalogue/hooks/useCatalogueItems'
import { ROLE } from '@/types/constants/roles'
import type { ModalButtons } from '@/types/form'
import type { CatalogueItem } from '@/types/responses'
import { createMessageValues } from '@/utils/formatters'

const buttonsMessage = message.common.buttons
const modalMessage = message.ordersPage.deleteModal

interface NameProps extends CellContext<CatalogueItem, any> {
  toDelete?: boolean
  tableId?: string
  isHoveringId?: number | string
  categoryUID?: string
}

//TODO: permissions
export const NameCell = ({
  getValue,
  row: {
    original: { uid },
    id
  },
  toDelete,
  tableId,
  isHoveringId,
  categoryUID
}: NameProps) => {
  const { catalogueItem } = useEndpoint({ uid })
  const [openDeleteWarn, setOpenDeleteWarn] = useState(false)
  const { formatMessage } = useIntl()
  const { mutate, catalogueItems } = useCatalogueItems(tableId, categoryUID)
  const canEdit = usePermission([ROLE.CATALOGUE_EDIT])

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
      <Link href={{ pathname: '/catalogue/item/' + uid }} className="flex items-center">
        <LinkDecorator>
          <span>{getValue()}</span>
        </LinkDecorator>
      </Link>
      {toDelete && (isHoveringId === id || isMobile) && (
        <TableActionsButtons
          onDeleteClick={() => {
            setOpenDeleteWarn(true)
          }}
          canEdit={canEdit}
        />
      )}
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
