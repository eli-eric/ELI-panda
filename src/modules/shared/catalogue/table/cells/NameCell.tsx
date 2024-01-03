import type { CellContext } from '@tanstack/react-table'
import Link from 'next/link'
import { useState } from 'react'
import { isMobile } from 'react-device-detect'
import { toast } from 'react-hot-toast'
import { useIntl } from 'react-intl'

import { TableActionsButtons, TableStatsButton } from '@/components/Buttons'
import { LinkDecorator } from '@/components/decorators'
import { Modal } from '@/components/modal/modal.comp'
import WarningModal from '@/components/modal/warning/modal-warning.comp'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { useCatalogueItems } from '@/modules/catalogue/hooks/useCatalogueItems'
import { CatalogueStatisticsContainer } from '@/modules/catalogueItem/components/statistics/CatalogueStatistics.cont'
import { useHoveringId } from '@/store/useHoveringId'
import { ROLE } from '@/types/constants/roles'
import type { ModalButtons } from '@/types/form'
import type { CatalogueItem } from '@/types/responses'
import { createMessageValues } from '@/utils/formatters'

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
    original: { uid },
    id
  },
  toDelete,
  tableId
}: NameProps) => {
  const { catalogueItem } = useEndpoint({ uid })
  const { hoveringId } = useHoveringId()
  const [openDeleteWarn, setOpenDeleteWarn] = useState(false)
  const [openStats, setOpenStats] = useState(false)
  const { formatMessage } = useIntl()
  const { mutate, catalogueItems } = useCatalogueItems(tableId)
  const canEdit = usePermission([ROLE.CATALOGUE_EDIT])

  const deleteSubmit = useSubmit({
    endpoint: catalogueItem,
    method: 'delete',
    onSuccess: () => {
      setOpenDeleteWarn(false)
      catalogueItems && mutate({ ...catalogueItems, data: catalogueItems?.data?.filter(item => item.uid !== uid) })
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
      {tableId === 'catalogueItemsModal' ? (
        <Link href={{ pathname: '/catalogue/item/' + uid }} legacyBehavior className="flex items-center">
          <a target="_blank" rel="noopener noreferrer">
            <LinkDecorator>
              <span>{getValue()}</span>
            </LinkDecorator>
          </a>
        </Link>
      ) : (
        <Link href={{ pathname: '/catalogue/item/' + uid }} className="flex items-center">
          <LinkDecorator>
            <span>{getValue()}</span>
          </LinkDecorator>
        </Link>
      )}
      {toDelete && (hoveringId === id || isMobile) && (
        <TableActionsButtons
          onDeleteClick={() => {
            setOpenDeleteWarn(true)
          }}
          canEdit={canEdit}
        >
          <TableStatsButton onClick={() => setOpenStats(true)} />
        </TableActionsButtons>
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
      <Modal open={openStats} setOpen={setOpenStats}>
        <CatalogueStatisticsContainer catalogueItemUid={uid} />
      </Modal>
    </div>
  )
}
