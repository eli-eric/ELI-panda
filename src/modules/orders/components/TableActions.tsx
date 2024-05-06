import { Fragment, useState } from 'react'
import { useIntl } from 'react-intl'

import { TableActionsButtons } from '@/components/Buttons'
import WarningModal from '@/components/overlays/modal/warning/modal-warning.comp'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { ROLE } from '@/types/constants/roles'
import type { ModalButtons } from '@/types/form'
import { createMessageValues } from '@/utils/formatters'

import { useOrders } from '../hooks/useOrders'
import type { Order } from '../types'

const buttonsMessage = message.common.buttons
const modalMessage = message.ordersPage.deleteModal

interface Props {
  order: Order
}

export const TableActions = ({ order }: Props) => {
  const [openDeleteWarn, setOpenDeleteWarn] = useState(false)
  const { formatMessage } = useIntl()
  const { name } = order
  const canEdit = usePermission([ROLE.ORDERS_EDIT])
  const { order: orderEndpoint } = useEndpoint({ uid: order.uid })

  const { mutate, orderList } = useOrders()

  const deleteSubmit = useSubmit({
    endpoint: orderEndpoint,
    method: 'delete',
    onSuccess: () => {
      setOpenDeleteWarn(false)
      orderList && mutate()
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
    <Fragment>
      <TableActionsButtons
        onDeleteClick={() => {
          setOpenDeleteWarn(true)
        }}
        canEdit={canEdit}
      />
      <WarningModal
        buttons={deleteButtons}
        open={openDeleteWarn}
        setOpen={setOpenDeleteWarn}
        title={modalMessage.title}
        message={formatMessage(
          { id: modalMessage.message },
          createMessageValues({ name })
        )}
        testid="OrderDeleteModal"
        error={deleteSubmit.error}
      />
    </Fragment>
  )
}

export default TableActions
