import type { Row } from '@tanstack/react-table'
import { CheckCircle } from 'lucide-react'
import { Edit, Trash2 } from 'lucide-react'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/Buttons'
import { Toggle } from '@/components/form/Switch'
import { Tooltip } from '@/components/Tooltip'
import usePermission from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { useServiceLineDeliver } from '@/modules/orderItem/hooks/useServiceDelivery'
import { useServiceDeliveryAll } from '@/modules/orderItem/hooks/useServiceDeliveryAll'
import { useServiceLine } from '@/modules/orderItem/hooks/useServiceLine'
import type { ServiceLine } from '@/modules/orderItem/types/form'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import { ROLE } from '@/types/constants/roles'
import { createMessageValues } from '@/utils/formatters'

import { ServiceLineEditSheet } from '../../components/serviceLines/components/ServiceLineEditSheet.comp'

export const ServiceLineActionButtons = ({
  serviceLine
}: {
  serviceLine: ServiceLine
}) => {
  const { formatMessage } = useIntl()
  const { deleteServiceLine, setServiceLine } = useServiceLine()
  const { openModal, closeModal } = useModalGlobalStore()
  const withWarning = useWarningModal(
    formatMessage(
      { id: message.ordersPage.serviceLines.deleteModal.message },
      createMessageValues({ name: serviceLine.name })
    )
  )

  const submit = (data: ServiceLine) => {
    setServiceLine({
      ...data,
      details: Array.isArray(data.details) ? data.details : []
    })
    closeModal('dialog1')
  }

  const openEditSheet = () => {
    openModal('sheet', {
      component: ServiceLineEditSheet,
      props: {
        title: 'Edit Service Line',
        serviceLine,
        onClose: () => {
          closeModal('sheet')
        }
      },
      onSubmit: (data: ServiceLine) => {
        submit(data)
        closeModal('sheet')
      },
      onClose: () => {
        closeModal('sheet')
      }
    })
  }

  return (
    <div className="flex items-center gap-1">
      <Tooltip content="Edit service line">
        <Button
          variant="ghost"
          size="sm"
          onClick={openEditSheet}
          className="h-8 w-8 p-0 hover:bg-accent"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </Tooltip>
      <Tooltip content="Delete service line">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => withWarning(deleteServiceLine)(serviceLine.uuid)}
          className="h-8 w-8 p-0 hover:bg-accent hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </Tooltip>
    </div>
  )
}

export const ServiceDeliveryAction = ({
  serviceLine,
  checked
}: {
  serviceLine: ServiceLine
  checked?: boolean
}) => {
  const hasRole = usePermission([ROLE.ORDERS_DELIVERY_EDIT, ROLE.ORDERS_EDIT])
  const { mutate } = useServiceLineDeliver(serviceLine)
  const handleCheck = () => {
    mutate({ isDelivered: !checked })
  }

  return (
    <Fragment>
      {serviceLine.uid && (
        <Fragment>
          {hasRole ? (
            <Toggle onChange={handleCheck} enabled={checked || false} />
          ) : (
            <Toggle enabled={checked || false} onChange={() => {}} />
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

export const ServiceLinePriceFooter = ({
  rows
}: {
  rows: Row<ServiceLine>[]
}) => {
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
        <div className="flex flex-col whitespace-nowrap py-1">
          <span className="font-medium">{`${parseFloat(total.toFixed(2))} ${totalCurrency}`}</span>
        </div>
      )}
    </Fragment>
  )
}

export const DeliveredAllButton = () => {
  const { handleDelivery, isPending } = useServiceDeliveryAll()
  const hasRole = usePermission([ROLE.ORDERS_DELIVERY_EDIT, ROLE.ORDERS_EDIT])

  const handleClick = () => {
    handleDelivery()
  }

  return (
    <Tooltip content="Mark All as Delivered">
      <Button
        disabled={isPending || !hasRole}
        className="flex justify-center items-center p-1 h-7 min-h-0 w-7"
        onClick={handleClick}
      >
        <CheckCircle className="h-5 w-5" />
      </Button>
    </Tooltip>
  )
}
