import { Fragment } from 'react'

import { TableButtonsWrapper, TableDeleteButton } from '@/components/Buttons'
import { Toggle } from '@/components/form/Switch'
import usePermission from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'
import { useServiceLineDeliver } from '@/modules/orderItem/hooks/useServiceDelivery'
import { useServiceLine } from '@/modules/orderItem/hooks/useServiceLine'
import type { ServiceLine } from '@/modules/orderItem/types/form'
import { ROLE } from '@/types/constants/roles'

import { ServiceLineEdit } from './service-line.edit'

export const ServiceLineActionButtons = ({
  serviceLine
}: {
  serviceLine: ServiceLine
}) => {
  const { deleteServiceLine } = useServiceLine()
  const withWarning = useWarningModal()

  return (
    <Fragment>
      <TableButtonsWrapper>
        <ServiceLineEdit serviceLine={serviceLine} />
        <TableDeleteButton
          onClick={() => {
            withWarning(deleteServiceLine)(serviceLine.uuid)
          }}
        />
      </TableButtonsWrapper>
    </Fragment>
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
