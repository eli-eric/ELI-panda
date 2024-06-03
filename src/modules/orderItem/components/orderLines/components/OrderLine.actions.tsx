import type { Row } from '@tanstack/react-table'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useIntl } from 'react-intl'

import {
  TableButtonsWrapper,
  TableDeleteButton,
  TableEditButton
} from '@/components/Buttons'
import { Heading } from '@/components/card/card.comp'
import { useToggle } from '@/components/form/Switch'
import WarningModal from '@/components/overlays/modal/warning/modal-warning.comp'
import { Tooltip } from '@/components/Tooltip'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import { FormModal } from '@/hooks/form/useFormModal'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { useOrderLine } from '@/modules/orderItem/hooks/useOrderLine'
import type { OrderLineFormType } from '@/modules/orderItem/types/form'
import { ROLE } from '@/types/constants/roles'
import type { ModalButtons } from '@/types/form'
import { createMessageValues } from '@/utils/formatters'

import { OrderLineForm } from '../form/OrderLineForm.cont'
import { OrderIsDeliveryForm } from './OrderIsDeliveryForm'

const messages = message.common.buttons

const orderLines = message.ordersPage.orderLines

export const OrderLineActionButtons = ({
  orderLine
}: {
  orderLine: OrderLineFormType
}) => {
  const [openDeleteWarn, setOpenDeleteWarn] = useState(false)
  const [openOrderLineForm, setOpenOrderLineForm] = useState(false)
  const { formatMessage: fm } = useIntl()
  const { deleteOrderLine } = useOrderLine()

  const deleteButtons: ModalButtons = {
    goNext: {
      text: messages.continue,
      onClick: () => {
        deleteOrderLine(orderLine)
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
    <Fragment>
      <TableButtonsWrapper>
        <TableEditButton
          onClick={() => {
            setOpenOrderLineForm(true)
          }}
        />
        <TableDeleteButton
          onClick={() => {
            setOpenDeleteWarn(true)
          }}
        />
      </TableButtonsWrapper>
      <OrderLineForm
        orderLine={orderLine}
        open={openOrderLineForm}
        setOpen={setOpenOrderLineForm}
      />
      <WarningModal
        buttons={deleteButtons}
        open={openDeleteWarn}
        setOpen={setOpenDeleteWarn}
        title={orderLines.deleteModal.title}
        message={fm(
          { id: orderLines.deleteModal.message },
          createMessageValues({ name: orderLine.name })
        )}
        testid="OrderLineDelete"
      />
    </Fragment>
  )
}

export const OrderisDeliveredAction = ({
  orderLine,
  checked
}: {
  orderLine: OrderLineFormType
  checked?: boolean
}) => {
  const { enabled, toggle, Toggle } = useToggle(checked)
  const uid = useRouter().query.uid as string
  const { orderLineDelivery } = useEndpoint({
    uid: uid,
    itemUid: orderLine.uid
  })
  const hasRole = usePermission([ROLE.ORDERS_DELIVERY_EDIT, ROLE.ORDERS_EDIT])
  const { setOrderLine } = useOrderLine()

  const formMethods = useForm<OrderLineFormType>({
    defaultValues: { serialNumber: orderLine?.serialNumber || '' }
  })

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

  const [open, setOpen] = useState(false)

  const handleCheck = () => {
    !orderLine.isDelivered ? setOpen(true) : submit({ isDelivered: !enabled })
  }

  return (
    <Fragment>
      {orderLine.uid && (
        <Fragment>
          {hasRole ? (
            <Toggle onChange={handleCheck} enabled={enabled} />
          ) : (
            <Toggle enabled={enabled} onChange={() => {}} />
          )}
        </Fragment>
      )}
      <FormModal
        open={open}
        setOpen={setOpen}
        renderOutsideForm={<Heading text="Fill missing Serial Number" />}
        onSubmit={data => {
          submit({
            serialNumber: data?.serialNumber,
            isDelivered: !enabled,
            eun: data?.eun || undefined
          })
        }}
        formMethods={formMethods}
      >
        <OrderIsDeliveryForm />
      </FormModal>
    </Fragment>
  )
}

export const PrintEunButton = ({
  orderLine
}: {
  orderLine: OrderLineFormType
}) => {
  const { eunforPrint } = useEndpoint({
    uid: orderLine.eun,
    query: { printEUN: true }
  })
  const { submit } = useSubmit({
    endpoint: eunforPrint,
    method: 'put',
    onSuccess: () => {
      toast.success(`EUN ${orderLine.eun} printed successfully`)
    },
    onError: err => {
      toast.error(err.message)
    }
  })

  return (
    <Tooltip content={'Print eun'}>
      <button
        className="hover:underline"
        type="button"
        onClick={() => {
          submit()
        }}
      >
        <span>{orderLine.eun}</span>
      </button>
    </Tooltip>
  )
}

export const PriceFooter = ({ rows }: { rows: Row<OrderLineFormType>[] }) => {
  const total = rows.reduce(
    (sum, { original: { price } }) => sum + (price || 0),
    0
  )
  const totalCurrencyRows = rows.filter(
    ({ original: { currency } }) => currency != undefined
  )
  const totalCurrency =
    totalCurrencyRows.length > 0 ? totalCurrencyRows[0].original.currency : ''
  return (
    <Fragment>
      {rows.length > 0 && (
        <div className="flex flex-col whitespace-nowrap">
          <span className="font-medium">{'Total:'}</span>
          <span className="font-medium">{`${parseFloat(total.toFixed(2))} ${totalCurrency}`}</span>
        </div>
      )}
    </Fragment>
  )
}
