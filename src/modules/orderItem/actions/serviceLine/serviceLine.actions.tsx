import { CheckCircleIcon } from '@heroicons/react/24/outline'
import type { Row } from '@tanstack/react-table'
import { Edit, MoreVertical, Trash2 } from 'lucide-react'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { Button } from '@/components/Buttons'
import { Toggle } from '@/components/form/Switch'
import { Tooltip } from '@/components/Tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
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
  const formMethods = useForm<ServiceLine>()
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Service line actions"
          className="h-8 w-8 p-0"
        >
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={4}>
        <DropdownMenuItem onClick={openEditSheet} className="cursor-pointer">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => withWarning(deleteServiceLine)(serviceLine.uuid)}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
    <Tooltip content="Mark All as Delivered">
      <Button
        disabled={isPending || !hasRole}
        className="flex justify-center items-center p-1 h-7 min-h-0 w-7"
        onClick={handleClick}
      >
        <CheckCircleIcon className="h-5 w-5" />
      </Button>
    </Tooltip>
  )
}