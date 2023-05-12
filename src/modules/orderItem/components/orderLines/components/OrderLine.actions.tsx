import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { toast } from 'react-hot-toast'

import { DeleteButton, EditButton } from '@/components/Buttons'
import { useToggle } from '@/components/form/Switch'
import WarningModal from '@/components/modal/warning/modal-warning.comp'
import { useEndpoint } from '@/hooks/useEndpoint'
import useRolePermission from '@/hooks/useRole'
import useSubmit from '@/hooks/useSubmit'
import { message } from '@/i18n/src/messages'
import type { OrderLineFormType } from '@/modules/orderItem/types'
import { ROLE } from '@/types/constants/roles'
import type { ModalButtons } from '@/types/form'

import useOrderLineForm from '../form/OrderLineForm.cont'

const messages = message.common.buttons

const modalMessage = message.ordersPage.orderLines.deleteModal

export const OrderLineActionButtons = ({
  orderLine,
  setOrderLine,
  deleteOrderLine
}: {
  orderLine: OrderLineFormType
  setOrderLine: (orderLines: OrderLineFormType) => void
  deleteOrderLine: (orderLine: OrderLineFormType) => void
}) => {
  const [openDeleteWarn, setOpenDeleteWarn] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const { setOpen, getFormModal } = useOrderLineForm({ setOrderLine, orderLine })

  const deleteButtons: ModalButtons = {
    goNext: {
      text: messages.continue,
      loading: deleteLoading,
      onClick: () => {
        setDeleteLoading(true)
        setTimeout(() => {
          deleteOrderLine(orderLine)
        }, 100)
        setOpenDeleteWarn(false)
      }
    },
    goBack: {
      text: messages.cancel,
      onClick: () => {
        setOpenDeleteWarn(false)
      }
    }
  }

  return (
    <div className="flex">
      <Fragment>
        <EditButton
          className="mr-1"
          onClick={() => {
            setOpen(true)
          }}
        />
        <DeleteButton
          className="mr-1"
          onClick={() => {
            setOpenDeleteWarn(true)
          }}
        />
      </Fragment>
      {getFormModal()}
      <WarningModal
        buttons={deleteButtons}
        open={openDeleteWarn}
        setOpen={setOpenDeleteWarn}
        title={modalMessage.title}
        message={modalMessage.message}
        testid="OrderLineDelete"
      />
    </div>
  )
}

export const OrderisDeliveredAction = ({
  orderLine,
  checked,
  setOrderLine
}: {
  orderLine: OrderLineFormType
  checked?: boolean
  setOrderLine: (orderLines: OrderLineFormType) => void
}) => {
  const { enabled, toggle, Toggle } = useToggle(checked)
  const uid = useRouter().query.uid as string
  const { orderLineDelivery } = useEndpoint({ uid: uid, itemUid: orderLine.uid })
  const hasRole = useRolePermission([ROLE.ORDERS_DELIVERY_EDIT])

  const { submit } = useSubmit<OrderLineFormType>({
    endpoint: orderLineDelivery,
    method: 'put',
    onSuccess: data => {
      toggle()
      setOrderLine({
        ...orderLine,
        isDelivered: orderLine.isDelivered,
        eun: data?.eun
      })
    },
    onError: err => {
      toast.error(err.message)
    }
  })

  const handleCheck = () => {
    submit({ isDelivered: !enabled })
  }

  return (
    <Fragment>
      {orderLine.uid && (
        <Fragment>
          {hasRole ? <Toggle onChange={handleCheck} enabled={enabled} /> : <Toggle enabled={enabled} />}
        </Fragment>
      )}
    </Fragment>
  )
}
