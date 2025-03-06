import { InformationCircleIcon } from '@heroicons/react/24/outline'
import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useMemo } from 'react'
import { useIntl } from 'react-intl'

import { NewTabLink } from '@/components/decorators'
import { Tooltip } from '@/components/Tooltip'
import { message } from '@/i18n/src/messages'
import useOrderDetail from '@/modules/orderItem/hooks/useOrderDetail'
import type { OrderLineFormType } from '@/modules/orderItem/types/form'
import { PATH } from '@/types/constants/paths'

import { DeliveredAllButton } from './deliver-all.button'
import {
  OrderisDeliveredAction,
  OrderLineActionButtons,
  PriceFooter,
  PrintEunButton
} from './OrderLine.actions'

const messages = message.ordersPage.orderLines.orderLinesTable.header

const useOrderLinesColumns = () => {
  const uid = useRouter().query.uid as string
  const { disabledEdit } = useOrderDetail()
  const { formatMessage } = useIntl()
  const columns = useMemo((): ColumnDef<OrderLineFormType, any>[] => {
    const cols: ColumnDef<OrderLineFormType, any>[] = [
      {
        header: formatMessage({ id: messages.name }),
        accessorKey: 'name',
        cell: ({ getValue, row: { original } }) => (
          <div className="flex items-center ">
            <span title={getValue()} className="truncate">
              {getValue()}
            </span>
            {!disabledEdit && (
              <div className="absolute right-0">
                <OrderLineActionButtons orderLine={original} />
              </div>
            )}
          </div>
        ),
        meta: { sticky: true, className: 'sm:pr-16 relative' },
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
        accessorKey: 'serialNumber'
      },
      {
        header: formatMessage({ id: messages.eun }),
        accessorKey: 'eun',
        cell: ({ row: { original } }) => (
          <PrintEunButton orderLine={original} />
        ),
        size: 120
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
        meta: {
          filter: { enableColumnFilter: false, type: 'boolean' }
        },
        enableSorting: false,
        enableColumnFilter: false
      },
      {
        header: formatMessage({ id: messages.notes }),
        accessorKey: 'notes',
        cell: ({ getValue }) => (
          <Fragment>
            {getValue() && (
              <Tooltip content={getValue()}>
                <InformationCircleIcon className="h-6 w-6 flex-shrink-0" />
              </Tooltip>
            )}
          </Fragment>
        ),
        id: 'notes',
        size: 110
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
        footer: props => <PriceFooter rows={props.table.getRowModel().rows} />
      },
      {
        header: formatMessage({ id: messages.itemUsage }),
        accessorFn: row => row.itemUsage?.name,
        cell: ({ getValue }) => <span>{getValue()}</span>
      },
      {
        header: formatMessage({ id: messages.system }),
        accessorFn: row => row.system?.name,
        cell: ({ getValue, row: { original } }) => (
          <Link
            className="link"
            href={PATH.SYSTEM + '/' + original.system?.uid}
            target="_blank"
          >
            <span>{getValue()?.split('-')[0]}</span>
          </Link>
        )
      },
      {
        header: formatMessage({ id: messages.location }),
        accessorFn: row => row.location?.name,
        cell: ({ getValue }) => <span>{getValue()?.split(' - ')[0]}</span>
      }
    ]
    return cols
  }, [disabledEdit, uid, formatMessage])

  return columns
}

export default useOrderLinesColumns
