import { Fragment, useState } from 'react'

import { DeleteButton, EditButton } from '@/components/Buttons'
import WarningModal from '@/components/modal/warning/modal-warning.comp'
import { OrderLineFormType } from '@/modules/orderItem/types'
import { ModalButtons } from '@/types/form'

import useOrderLineForm from '../form/OrderLineForm.cont'

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
      text: 'Cancel',
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
      text: 'Cancel',
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
        title="Warning"
        message="Are sure you want delete this system?"
        testid="SystemDelete"
      />
    </div>
  )
}

export default OrderLineActionButtons
