import { InformationCircleIcon } from '@heroicons/react/20/solid'
import type { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/router'
import { Fragment, useMemo } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import type { OrderLineFormType } from '@/modules/orderItem/types'

import { OrderisDeliveredAction, OrderLineActionButtons, PriceFooter, PrintEunButton } from './OrderLine.actions'

const messages = message.ordersPage.orderLines.orderLinesTable.header

interface Props {
  setOrderLine: (orderLines: OrderLineFormType) => void
  deleteOrderLine: (orderLine: OrderLineFormType) => void
  disabledEdit?: boolean
}

const useOrderLinesColumns = ({ setOrderLine, deleteOrderLine, disabledEdit }: Props) => {
  const uid = useRouter().query.uid as string
  const { formatMessage } = useIntl()
  const columns = useMemo((): ColumnDef<OrderLineFormType, any>[] => {
    const cols: ColumnDef<OrderLineFormType, any>[] = [
      {
        header: formatMessage({ id: messages.name }),
        accessorKey: 'name',
        cell: ({ getValue, row: { original } }) => (
          <div className="flex items-center my-1">
            {!disabledEdit && (
              <OrderLineActionButtons
                orderLine={original}
                setOrderLine={setOrderLine}
                deleteOrderLine={deleteOrderLine}
              />
            )}
            <span>{getValue()}</span>
          </div>
        )
      },
      {
        header: formatMessage({ id: messages.notes }),
        accessorKey: 'notes',
        cell: ({ getValue }) => (
          <Fragment>
            {getValue() && (
              <InformationCircleIcon
                className="h-6 w-6 flex-shrink-0"
                data-tooltip-id="tooltip"
                data-tooltip-content={getValue()}
              />
            )}
          </Fragment>
        ),
        id: 'notes'
      },
      {
        header: formatMessage({ id: messages.catalogueNumber }),
        accessorKey: 'catalogueNumber'
      },
      {
        header: formatMessage({ id: messages.serialNumber }),
        accessorKey: 'serialNumber'
      },
      {
        header: formatMessage({ id: messages.itemUsage }),
        accessorKey: 'itemUsage',
        cell: ({ getValue }) => <span>{getValue()?.name}</span>
      },
      {
        header: formatMessage({ id: messages.system }),
        accessorKey: 'system',
        cell: ({ getValue }) => <span>{getValue()?.name.split('-')[0]}</span>
      },
      {
        header: formatMessage({ id: messages.location }),
        accessorKey: 'location',
        cell: ({ getValue }) => <span>{getValue()?.name.split(' - ')[0]}</span>
      },
      {
        header: formatMessage({ id: messages.price }),
        accessorKey: 'price',
        cell: ({ getValue, row: { original } }) => (
          <span className="whitespace-nowrap">
            {getValue()} <span className="font-medium">{original.currency}</span>
          </span>
        ),
        footer: props => <PriceFooter rows={props.table.getRowModel().rows} />
      },
      {
        header: formatMessage({ id: messages.eun }),
        accessorKey: 'eun',
        cell: ({ row: { original } }) => <PrintEunButton orderLine={original} />
      },
      {
        header: formatMessage({ id: messages.isDelivered }),
        accessorKey: 'isDelivered',
        cell: ({ getValue, row: { original } }) => (
          <OrderisDeliveredAction orderLine={original} setOrderLine={setOrderLine} checked={getValue()} />
        )
      }
    ]
    !uid && cols.pop()
    return cols
  }, [setOrderLine, deleteOrderLine, disabledEdit, uid, formatMessage])

  return columns
}

export default useOrderLinesColumns
