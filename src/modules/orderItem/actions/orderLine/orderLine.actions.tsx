import type { Row } from '@tanstack/react-table'
import { Edit, MoreVertical, Trash2 } from 'lucide-react'
import { useRouter } from 'next/router'
import type { FC, PropsWithChildren } from 'react'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useIntl } from 'react-intl'

import { Heading } from '@/components/card/card.comp'
import { Toggle } from '@/components/form/Switch'
import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import { FormModal } from '@/hooks/form/useFormModal'
import usePermission from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { useOrderLine } from '@/modules/orderItem/hooks/useOrderLine'
import type { OrderLineFormType } from '@/modules/orderItem/types/form'
import { ROLE } from '@/types/constants/roles'
import { createMessageValues } from '@/utils/formatters'

import { OrderIsDeliveryForm } from '../../components/orderLines/components/OrderIsDeliveryForm'
import { useOrderLineEditSheet } from '../../components/orderLines/hooks/useOrderLineEditSheet'

// Custom buttons wrapper designed to better fit the table design
type OrderLineButtonsWrapperProps = {
  position?: 'left-0' | 'right-0' | 'left-1' | 'right-1'
  className?: string
}

export const ButtonsWrapperNew: FC<
  PropsWithChildren<OrderLineButtonsWrapperProps>
> = ({ children, position = 'right-0', className }) => (
  <div
    className={cn(
      'absolute flex items-center gap-1',
      'opacity-0 group-hover/row:opacity-100 transition-opacity duration-150',
      'z-20',
      'top-1/2 -translate-y-1/2 -right-1',
      position !== 'right-0' && position,
      className
    )}
  >
    {children}
  </div>
)

export const OrderLineActionButtons = ({
  orderLine
}: {
  orderLine: OrderLineFormType
}) => {
  const { formatMessage: fm } = useIntl()
  const { deleteOrderLine, setOrderLine } = useOrderLine()
  const { openEditSheet } = useOrderLineEditSheet()
  const withWarning = useWarningModal(
    fm(
      { id: message.ordersPage.orderLines.deleteModal.message },
      createMessageValues({ name: orderLine.name })
    )
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label={fm({
            id: message.ordersPage.orderLines.actionsMenuAriaLabel
          })}
          className="h-8 w-8 p-0"
        >
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={4}>
        <DropdownMenuItem
          onClick={() => {
            openEditSheet(orderLine, data => {
              setOrderLine(data)
            })
          }}
          className="cursor-pointer"
        >
          <Edit className="h-4 w-4 mr-2" />
          {fm({ id: message.common.buttons.edit })}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => withWarning(deleteOrderLine)(orderLine)}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          {fm({ id: message.common.buttons.delete })}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const OrderisDeliveredAction = ({
  orderLine,
  checked
}: {
  orderLine: OrderLineFormType
  checked?: boolean
}) => {
  const { formatMessage: fm } = useIntl()
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
    !orderLine.isDelivered ? setOpen(true) : submit({ isDelivered: !checked })
  }

  return (
    <div className="flex items-center justify-center gap-1 w-full">
      {orderLine.uid && (
        <Fragment>
          {hasRole ? (
            <Toggle onChange={handleCheck} enabled={checked || false} />
          ) : (
            <Toggle enabled={checked || false} onChange={() => {}} />
          )}
        </Fragment>
      )}
      <FormModal
        open={open}
        setOpen={setOpen}
        renderOutsideForm={
          <Heading
            text={fm({
              id: message.ordersPage.orderLines.missingSerialNumber.title
            })}
          />
        }
        onSubmit={data => {
          submit({
            serialNumber: data?.serialNumber,
            isDelivered: !checked,
            eun: data?.eun || undefined
          })
        }}
        formMethods={formMethods}
      >
        <OrderIsDeliveryForm />
      </FormModal>
    </div>
  )
}

export const PrintEunButton = ({
  orderLine
}: {
  orderLine: OrderLineFormType
}) => {
  const { formatMessage: fm } = useIntl()
  const { eunforPrint } = useEndpoint({
    uid: orderLine.eun,
    query: { printEUN: true }
  })
  const { submit } = useSubmit({
    endpoint: eunforPrint,
    method: 'put',
    onSuccess: () => {
      toast.success(
        fm(
          { id: message.ordersPage.orderLines.eunPrintedSuccessfully },
          { eun: orderLine.eun }
        )
      )
    },
    onError: err => {
      toast.error(err.message)
    }
  })

  return (
    <Tooltip
      content={fm({ id: message.ordersPage.orderLines.printEunTooltip })}
    >
      <Button
        type="button"
        variant={'link'}
        className="cursor-pointer"
        onClick={() => {
          submit()
        }}
      >
        <span>{orderLine.eun}</span>
      </Button>
    </Tooltip>
  )
}

export const PriceFooter = ({ rows }: { rows: Row<any>[] }) => {
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
          <span className="font-medium">
            {parseFloat(total.toFixed(2)).toFixed(2)} {totalCurrency}
          </span>
        </div>
      )}
    </Fragment>
  )
}
