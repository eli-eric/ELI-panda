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
          <div className="flex items-center">
            <span>{getValue()}</span>
            {!disabledEdit && <OrderLineActionButtons orderLine={original} />}
          </div>
        ),
        meta: { sticky: true, className: 'sm:pr-12' },
        size: 240
      },
      {
        header: formatMessage({ id: messages.catalogueNumber }),
        accessorKey: 'catalogueNumber',
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
        size: 60
      },
      {
        header: formatMessage({ id: messages.isDelivered }),
        accessorKey: 'isDelivered',
        cell: ({ getValue, row: { original } }) =>
          uid ? (
            <OrderisDeliveredAction orderLine={original} checked={getValue()} />
          ) : null,
        size: 90,
        meta: { filter: { enableColumnFilter: false, type: 'boolean' } },
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
        size: 90
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
