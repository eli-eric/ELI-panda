import { Fragment, useState } from 'react'

import { DeleteButton, EditButton } from '@/components/Buttons'
import { useToggle } from '@/components/form/Switch'
import WarningModal from '@/components/modal/warning/modal-warning.comp'
import { message } from '@/i18n/src/messages'
import { OrderLineFormType } from '@/modules/orderItem/types'
import { ModalButtons } from '@/types/form'

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

export const OrderDeliveredAction = ({
  orderLine,
  checked,
  setOrderLine
}: {
  orderLine: OrderLineFormType
  checked?: boolean
  setOrderLine: (orderLines: OrderLineFormType) => void
}) => {
  const { enabled, toggle, Toggle } = useToggle(checked)
  //const { order } = useEndpoint({ uid: orderLine.uid })
  //TODO: add endpoint to update orderLine + mutation
  const handleCheck = (enabled: boolean) => {
    toggle()
    setOrderLine({
      ...orderLine,
      delivered: !checked,
      eun: !checked ? '12345' : ''
    })
  }

  return <Toggle onChange={handleCheck} enabled={enabled} />
}
