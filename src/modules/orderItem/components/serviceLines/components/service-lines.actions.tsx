import { CheckCircleIcon } from '@heroicons/react/24/outline'
import type { Row } from '@tanstack/react-table'
import { Fragment } from 'react'

import { Button, TableDeleteButton } from '@/components/Buttons'
import { Toggle } from '@/components/form/Switch'
import usePermission from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'
import { useServiceLineDeliver } from '@/modules/orderItem/hooks/useServiceDelivery'
import { useServiceDeliveryAll } from '@/modules/orderItem/hooks/useServiceDeliveryAll'
import { useServiceLine } from '@/modules/orderItem/hooks/useServiceLine'
import type { ServiceLine } from '@/modules/orderItem/types/form'
import { ROLE } from '@/types/constants/roles'

import { ButtonsWrapperNew } from '../../orderLines/components/OrderLine.actions'
import { ServiceLineEdit } from './service-line.edit'

export const ServiceLineActionButtons = ({
  serviceLine
}: {
  serviceLine: ServiceLine
}) => {
  const { deleteServiceLine } = useServiceLine()
  const withWarning = useWarningModal()

  return (
    <ButtonsWrapperNew position="right-1">
      <ServiceLineEdit serviceLine={serviceLine} />
      <TableDeleteButton
        onClick={() => {
          withWarning(deleteServiceLine)(serviceLine.uuid)
        }}
      />
    </ButtonsWrapperNew>
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

export const PriceFooter = ({ rows }: { rows: Row<ServiceLine>[] }) => {
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
    <Button
      primary
      disabled={isPending || !hasRole}
      className="flex justify-center items-center p-1 h-7 min-h-0 w-7"
      onClick={handleClick}
      title="Mark All as Delivered"
    >
      <CheckCircleIcon className="h-5 w-5" />
    </Button>
  )
}
