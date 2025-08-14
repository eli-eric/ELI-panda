import { InformationCircleIcon } from '@heroicons/react/24/outline'
import type { ColumnDef } from '@tanstack/react-table'
import { Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useMemo } from 'react'
import { useIntl } from 'react-intl'

import { NewTabLink } from '@/components/decorators'
import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { useOrderLine } from '@/modules/orderItem/hooks/useOrderLine'
import useOrderDetail from '@/modules/orderItem/hooks/useOrderDetail'
import type { OrderLineFormType } from '@/modules/orderItem/types/form'
import { PATH } from '@/types/constants/paths'
import { createMessageValues } from '@/utils/formatters'

import { DeliveredAllButton } from './deliver-all.button'
import {
  OrderisDeliveredAction,
  PriceFooter,
  PrintEunButton,
  useOrderLineActions
} from './OrderLine.actions'

const messages = message.ordersPage.orderLines.orderLinesTable.header

const OrderLineActionButtons = ({ orderLine }: { orderLine: OrderLineFormType }) => {
  const { formatMessage } = useIntl()
  const { deleteOrderLine } = useOrderLine()
  const { openEditModal } = useOrderLineActions()
  
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
      <Tooltip content="Edit order line">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => openEditModal(orderLine)}
          className="h-8 w-8 p-0 hover:bg-accent"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </Tooltip>
      <Tooltip content="Delete order line">
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
        id: 'actions',
        header: '',
        cell: ({ row: { original } }) =>
          !disabledEdit ? (
            <OrderLineActionButtons orderLine={original} />
          ) : null,
        size: 100,
        enableSorting: false,
        enablePinning: false,
        enableColumnFilter: false,
        enableHiding: false
      },
      {
        header: formatMessage({ id: messages.name }),
        accessorKey: 'name',
        cell: ({ getValue }) => (
          <div className="whitespace-nowrap">{getValue()}</div>
        ),
        size: 340,
        footer: ({ table: { getRowCount } }) => (
          <span>Total: {getRowCount()} line(s)</span>
        )
      },
      {
        header: formatMessage({ id: messages.catalogueNumber }),
        accessorKey: 'catalogueNumber',
        size: 240,
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
        size: 220
      },
      {
        header: formatMessage({ id: messages.eun }),
        accessorKey: 'eun',
        cell: ({ row: { original } }) => (
          <PrintEunButton orderLine={original} />
        ),
        size: 150
      },
      {
        header: () => {
          return (
            <div className="flex items-center justify-between px-2 w-full">
              <DeliveredAllButton />
            </div>
          )
        },
        accessorKey: 'isDelivered',
        cell: ({ getValue, row: { original } }) =>
          uid ? (
            <div className="flex justify-center w-full">
              <OrderisDeliveredAction
                orderLine={original}
                checked={getValue()}
              />
            </div>
          ) : null,
        size: 80,
        enableSorting: false,
        enablePinning: false,
        enableColumnFilter: false
      },
      {
        header: formatMessage({ id: messages.notes }),
        accessorKey: 'notes',
        cell: ({ getValue }) => (
          <Fragment>
            {getValue() && (
              <Tooltip content={getValue()}>
                <InformationCircleIcon className="h-6 w-6 shrink-0" />
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
        size: 240
      },
      {
        header: formatMessage({ id: messages.system }),
        accessorFn: row => row.system?.name,
        size: 240,
        cell: ({ getValue, row: { original } }) => (
          <Link
            className="link"
            href={PATH.SYSTEM + '/' + original.system?.uid}
            target="_blank"
          >
            <Button type="button" variant="link" className="cursor-pointer">
              <span>{getValue()?.split('-')[0]}</span>
            </Button>
          </Link>
        )
      },
      {
        header: formatMessage({ id: messages.location }),
        accessorFn: row => row.location?.name,
        cell: ({ getValue }) => <span>{getValue()?.split(' - ')[0]}</span>,
        size: 240
      },
      {
        header: formatMessage({ id: messages.service }),
        accessorFn: row => row.serviceItemName,
        size: 240,
        cell: ({ getValue, row: { original } }) => (
          <Link
            className="link"
            href={PATH.ORDER + '/' + original.serviceOrderUid}
            target="_blank"
          >
            <span>{getValue()?.split('-')[0]}</span>
          </Link>
        )
      }
    ]
    return cols
  }, [disabledEdit, uid, formatMessage])

  return columns
}

export default useOrderLinesColumns
