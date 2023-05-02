import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'

import { Button } from '@/components/Buttons'
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
        <Button
          className="mr-1"
          buttonSize="small"
          onClick={() => {
            setOpen(true)
          }}
          rounded="rounded-md"
        >
          <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
        </Button>
        <Button
          className="mr-1"
          buttonSize="small"
          onClick={() => {
            setOpenDeleteWarn(true)
          }}
          rounded="rounded-md"
        >
          <TrashIcon className="h-5 w-5 text-red-700" aria-hidden="true" />
        </Button>
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
