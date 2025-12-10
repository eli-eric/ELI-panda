import type { ColumnDef } from '@tanstack/react-table'
import { Edit, Info, Trash2 } from 'lucide-react'
import { useRouter } from 'next/router'
import { Fragment, useMemo } from 'react'
import { useIntl } from 'react-intl'

import { NewTabLink } from '@/components/decorators'
import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import { DeliveryStatusBadge } from '@/components/ui/delivery-status-badge'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { useOrderLineContext } from '@/modules/orderItem/context'
import useOrderDetail from '@/modules/orderItem/hooks/useOrderDetail'
import type { OrderLineFormType } from '@/modules/orderItem/types/form'
import { PATH } from '@/types/constants/paths'
import { createMessageValues } from '@/utils/formatters'

import {
  OrderisDeliveredAction,
  PriceFooter,
  PrintEunButton
} from '../../../actions'
import { useOrderLineEditSheet } from '../hooks/useOrderLineEditSheet'
import { DeliveredAllButton } from './deliver-all.button'

const messages = message.ordersPage.orderLines.orderLinesTable.header

const OrderLineActionButtons = ({
  orderLine
}: {
  orderLine: OrderLineFormType & { id: string }
}) => {
  const { formatMessage } = useIntl()
  const { openEditSheet } = useOrderLineEditSheet()
  const { setOrderLine, deleteOrderLine } = useOrderLineContext()

  const withWarning = useWarningModal(
    formatMessage(
      { id: message.ordersPage.orderLines.deleteModal.message },
      createMessageValues({ name: orderLine.name })
    )
  )

  const handleDelete = () => {
    withWarning(deleteOrderLine)(orderLine)
  }

  return (
    <div className="flex items-center gap-1">
      <Tooltip
        content={formatMessage({ id: message.ordersPage.orderLines.update })}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            openEditSheet(orderLine, data => {
              setOrderLine(data)
            })
          }
          className="h-8 w-8 p-0 hover:bg-accent"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </Tooltip>
      <Tooltip
        content={formatMessage({ id: message.ordersPage.deleteModal.message })}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          className="h-8 w-8 p-0 hover:bg-accent hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </Tooltip>
    </div>
  )
}

const useOrderLinesColumns = () => {
  const uid = useRouter().query.uid as string
  const { disabledEdit } = useOrderDetail()
  const { formatMessage } = useIntl()

  const columns = useMemo((): ColumnDef<OrderLineFormType, any>[] => {
    const cols: ColumnDef<OrderLineFormType, any>[] = [
      {
        header: () => {
          return (
            <div className="flex items-center justify-between px-2 w-full">
              <span>{formatMessage({ id: message.common.ui.status })}</span>
              <DeliveredAllButton />
            </div>
          )
        },
        accessorKey: 'isDelivered',
        cell: ({ getValue, row: { original } }) =>
          uid ? (
            <div className="flex items-center gap-2">
              <DeliveryStatusBadge isDelivered={getValue() || false} />
              <OrderisDeliveredAction orderLine={original} checked={getValue()} />
            </div>
          ) : null,
        size: 160,
        enableSorting: false,
        enablePinning: false,
        enableColumnFilter: false,
        meta: {
          sticky: 'left'
        },
        footer: ({ table: { getRowCount } }) => (
          <span>
            {formatMessage(
              { id: message.ordersPage.orderLines.totalLines },
              { count: getRowCount() }
            )}
          </span>
        )
      },
      {
        header: formatMessage({ id: messages.name }),
        accessorKey: 'name',
        enablePinning: true,
        cell: ({
          getValue,
          row: {
            original: { system }
          }
        }) =>
          system ? (
            <NewTabLink
              href={PATH.SYSTEM + '/' + system?.uid}
              value={getValue()}
            />
          ) : (
            <div className="break-words">{getValue()}</div>
          ),
        size: 280
      },
      {
        header: formatMessage({ id: messages.catalogueNumber }),
        accessorKey: 'catalogueNumber',
        size: 180,
        enablePinning: false,
        cell: ({ getValue, row: { original } }) => (
          <NewTabLink
            href={PATH.CATALOGUE_ITEM + '/' + original.catalogueUid}
            value={getValue()}
          />
        )
      },
      {
        header: formatMessage({ id: messages.serialNumber }),
        accessorKey: 'serialNumber',
        enablePinning: false,
        size: 220
      },
      {
        header: formatMessage({ id: messages.eun }),
        accessorKey: 'eun',
        enablePinning: false,
        cell: ({ row: { original } }) => <PrintEunButton orderLine={original} />,
        size: 150
      },
      {
        header: formatMessage({ id: messages.notes }),
        accessorKey: 'notes',
        enablePinning: false,
        cell: ({ getValue }) => (
          <Fragment>
            {getValue() && (
              <Tooltip content={getValue()}>
                <Info className="h-6 w-6 shrink-0" />
              </Tooltip>
            )}
          </Fragment>
        ),
        id: 'notes',
        size: 110,
        enableSorting: false,
        enableColumnFilter: false
      },
      {
        header: formatMessage({ id: messages.price }),
        accessorKey: 'price',
        enablePinning: false,
        cell: ({ getValue, row: { original } }) => (
          <span className="whitespace-nowrap">
            {getValue()}{' '}
            <span className="font-medium ">{original.currency}</span>
          </span>
        ),
        footer: props => (
          <PriceFooter rows={props.table.getFilteredRowModel().rows} />
        )
      },
      {
        header: formatMessage({ id: messages.itemUsage }),
        accessorFn: row => row.itemUsage?.name,
        cell: ({ getValue }) => <span>{getValue()}</span>,
        size: 240,
        enablePinning: false
      },
      {
        header: formatMessage({ id: messages.parentSystem }),
        accessorFn: row => row.parentSystem?.name,
        size: 240,
        enablePinning: false,
        cell: ({ getValue, row: { original } }) => (
          <NewTabLink
            href={PATH.SYSTEM + '/' + original.parentSystem?.uid}
            value={getValue()?.split(' - ')[0]}
          />
        )
      },
      {
        header: formatMessage({ id: messages.location }),
        accessorFn: row => row.location?.name,
        cell: ({ getValue }) => <span>{getValue()?.split(' - ')[0]}</span>,
        size: 240,
        enablePinning: false
      },
      {
        header: formatMessage({ id: messages.service }),
        accessorFn: row => row.serviceItemName,
        enablePinning: false,
        size: 240,
        cell: ({ getValue, row: { original } }) => (
          <NewTabLink
            href={PATH.SYSTEM + '/' + original.parentSystem?.uid}
            value={getValue()?.split('-')[0]}
          />
        )
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row: { original } }) =>
          !disabledEdit ? (
            <OrderLineActionButtons
              orderLine={original as OrderLineFormType & { id: string }}
            />
          ) : null,
        size: 100,
        meta: {
          sticky: 'right'
        },
        enableSorting: false,
        enablePinning: false,
        enableColumnFilter: false,
        enableHiding: false
      }
    ]
    return cols
  }, [disabledEdit, uid, formatMessage])

  return columns
}

export default useOrderLinesColumns
