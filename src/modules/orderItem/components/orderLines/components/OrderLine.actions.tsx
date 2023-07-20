import type { Row } from '@tanstack/react-table'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useIntl } from 'react-intl'

import { TableButtonsWrapper, TableDeleteButton, TableEditButton } from '@/components/Buttons'
import { Heading } from '@/components/card/card.comp'
import CheckBox from '@/components/form/CheckBox'
import { Input } from '@/components/form/Input'
import { useToggle } from '@/components/form/Switch'
import { Col, Grid } from '@/components/grid/Grid'
import WarningModal from '@/components/modal/warning/modal-warning.comp'
import { createMessageValues } from '@/helpers/formatters'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import useFormModal from '@/hooks/form/useFormModal'
import usePermission from '@/hooks/usePermission'
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
    <Fragment>
      <TableButtonsWrapper>
        <TableEditButton
          onClick={() => {
            setOpen(true)
          }}
        />
        <TableDeleteButton
          onClick={() => {
            setOpenDeleteWarn(true)
          }}
        />
      </TableButtonsWrapper>
      {getFormModal()}
      <WarningModal
        buttons={deleteButtons}
        open={openDeleteWarn}
        setOpen={setOpenDeleteWarn}
        title={orderLines.deleteModal.title}
        message={formatMessage({ id: orderLines.deleteModal.message }, createMessageValues({ name: orderLine.name }))}
        testid="OrderLineDelete"
      />
    </Fragment>
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
  const hasRole = usePermission([ROLE.ORDERS_DELIVERY_EDIT, ROLE.ORDERS_EDIT])
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
  const { getFormModal, setOpen, formMethods } = useFormModal<{
    serialNumber?: string
    eun?: string
    manualEun: boolean
  }>({
    defaultValues: { serialNumber: orderLine.serialNumber },
    renderForm: () => {
      const manualEun = formMethods.watch('manualEun')
      return (
        <Grid>
          <Col md={12}>
            <Input
              name="serialNumber"
              label={formatMessage({ id: orderLines.form.serialNumber.label })}
              placeholder={formatMessage({ id: orderLines.form.serialNumber.placeholder })}
              rounded="rounded-md"
            />
          </Col>

          <Col md={12}>
            <CheckBox
              name="manualEun"
              label={formatMessage({ id: orderLines.form.manualEun.label })}
              rounded="rounded-md"
            />
          </Col>
          {manualEun && (
            <Col md={12}>
              <Input
                name="eun"
                label={formatMessage({ id: orderLines.form.eun.label })}
                placeholder={formatMessage({ id: orderLines.form.eun.placeholder })}
                rounded="rounded-md"
              />
            </Col>
          )}
        </Grid>
      )
    },
    renderOutsideForm: () => <Heading text="Fill missing Serial Number" />,
    onSubmit: data => {
      submit({ serialNumber: data?.serialNumber, isDelivered: !enabled, eun: data?.eun || undefined })
    }
  })

  const handleCheck = () => {
    !orderLine.isDelivered ? setOpen(true) : submit({ isDelivered: !enabled })
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

export const PrintEunButton = ({ orderLine }: { orderLine: OrderLineFormType }) => {
  const { eunforPrint } = useEndpoint({ uid: orderLine.eun, query: { printEUN: true } })
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
    <button
      className="hover:underline"
      type="button"
      onClick={() => {
        submit()
      }}
    >
      <span>{orderLine.eun}</span>
    </button>
  )
}

export const PriceFooter = ({ rows }: { rows: Row<OrderLineFormType>[] }) => {
  const total = rows.reduce((sum, { original: { price } }) => sum + (price || 0), 0)
  const totalCurrencyRows = rows.filter(({ original: { currency } }) => currency != undefined)
  const totalCurrency = totalCurrencyRows.length > 0 ? totalCurrencyRows[0].original.currency : ''
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
