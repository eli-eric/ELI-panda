import { MoreVertical, Trash2 } from 'lucide-react'
import { Fragment, useState } from 'react'
import { useIntl } from 'react-intl'

import WarningModal from '@/components/overlays/modal/warning/modal-warning.comp'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { ROLE } from '@/types/constants/roles'
import type { ModalButtons } from '@/types/form'
import type { Order } from '@/types/responses/orders'
import { createMessageValues } from '@/utils/formatters'

import { useOrders } from '../hooks/useOrders'

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

  if (!canEdit) {
    return null
  }

  return (
    <Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Order actions"
            className="h-8 w-8 p-0"
          >
            <MoreVertical className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={4}>
          <DropdownMenuItem
            onClick={() => setOpenDeleteWarn(true)}
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Order
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
