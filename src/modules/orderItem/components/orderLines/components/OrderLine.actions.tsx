import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useIntl } from 'react-intl'

import { DeleteButton, EditButton } from '@/components/Buttons'
import { Heading } from '@/components/card/card.comp'
import { Input } from '@/components/form/Input'
import { useToggle } from '@/components/form/Switch'
import WarningModal from '@/components/modal/warning/modal-warning.comp'
import { createMessageValues } from '@/helpers/formatters'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useSubmit from '@/hooks/fetch/useSubmit'
import useFormModal from '@/hooks/form/useFormModal'
import useRolePermission from '@/hooks/useRole'
import { message } from '@/i18n/src/messages'
import type { OrderLineFormType } from '@/modules/orderItem/types'
import { ROLE } from '@/types/constants/roles'
import type { ModalButtons } from '@/types/form'

import useOrderLineForm from '../form/OrderLineForm.cont'

const messages = message.common.buttons

const orderLines = message.ordersPage.orderLines

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
  const { formatMessage } = useIntl()

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
        title={orderLines.deleteModal.title}
        message={formatMessage({ id: orderLines.deleteModal.message }, createMessageValues({ name: orderLine.name }))}
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
  const hasRole = useRolePermission([ROLE.ORDERS_DELIVERY_EDIT, ROLE.ORDERS_EDIT])
  const { formatMessage } = useIntl()

  const { submit } = useSubmit<OrderLineFormType>({
    endpoint: orderLineDelivery,
    method: 'put',
    onSuccess: data => {
      toggle()
      setOrderLine({
        ...orderLine,
        id: orderLine.id,
        isDelivered: data?.isDelivered,
        serialNumber: data?.serialNumber,
        eun: data?.eun
      })
    },
    onError: err => {
      toast.error(err.message)
    }
  })
  const { getFormModal, setOpen, formMethods } = useFormModal<{ serialNumber: string }>({
    renderForm: () => (
      <Input
        register={formMethods.register}
        name="serialNumber"
        label={formatMessage({ id: orderLines.form.serialNumber.label })}
        placeholder={formatMessage({ id: orderLines.form.serialNumber.placeholder })}
        rounded="rounded-md"
      />
    ),
    renderOutsideForm: () => <Heading text="Fill missing Serial Number" />,
    onSubmit: data => {
      submit({ serialNumber: data.serialNumber, isDelivered: !enabled })
    }
  })

  const handleCheck = () => {
    !orderLine.serialNumber && !orderLine.isDelivered ? setOpen(true) : submit({ isDelivered: !enabled })
  }

  return (
    <Fragment>
      {orderLine.uid && (
        <Fragment>
          {hasRole ? <Toggle onChange={handleCheck} enabled={enabled} /> : <Toggle enabled={enabled} />}
        </Fragment>
      )}
      {getFormModal()}
    </Fragment>
  )
}
