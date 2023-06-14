import { InformationCircleIcon } from '@heroicons/react/24/outline'
import type { CellContext, ColumnDef } from '@tanstack/react-table'
import { Fragment, useMemo } from 'react'
import { FormattedDate, useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import type { Order } from '@/modules/orders/types'

const messages = message.ordersPage.ordersTable.header

const useSystemsColumns = () => {
  const intl = useIntl()

  const columns = useMemo(
    (): ColumnDef<Order, string>[] => [
      {
        header: intl.formatMessage({ id: messages.name }),
        accessorKey: 'name',
        id: 'name',
        cell: ({ getValue }: CellContext<Order, string>) => <span>{getValue()}</span>
      },
      { header: intl.formatMessage({ id: messages.orderNumber }), accessorKey: 'orderNumber', id: 'orderNumber' },
      { header: intl.formatMessage({ id: messages.requestNumber }), accessorKey: 'requestNumber', id: 'requestNumber' },
      {
        header: intl.formatMessage({ id: messages.contractNumber }),
        accessorKey: 'contractNumber',
        id: 'contractNumber'
      },
      { header: intl.formatMessage({ id: messages.orderStatus }), accessorKey: 'orderStatus' },
      {
        header: intl.formatMessage({ id: messages.deliveryStatus }),
        accessorKey: 'deliveryStatus',
        cell: ({ getValue }) => <span>{getValue()}</span>
      },
      { header: intl.formatMessage({ id: messages.supplier }), accessorKey: 'supplier', id: 'supplier' },
      { header: intl.formatMessage({ id: messages.procurementResponsible }), accessorKey: 'procurementResponsible' },
      { header: intl.formatMessage({ id: messages.requestor }), accessorKey: 'requestor' },
      {
        header: intl.formatMessage({ id: messages.notes }),
        accessorKey: 'notes',
        cell: ({ getValue, row }) => (
          <Fragment>
            {row.original.notes && (
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
        header: intl.formatMessage({ id: messages.lastUpdateTime }),
        accessorKey: 'lastUpdateTime',
        cell: ({ row }) => (
          <FormattedDate value={row.original.lastUpdateTime} day="2-digit" month="long" year="numeric" />
        ),
        id: 'lastUpdateTime'
      },
      {
        header: intl.formatMessage({ id: messages.lastUpdateBy }),
        accessorKey: 'lastUpdateBy'
      },
      {
        header: intl.formatMessage({ id: messages.orderDate }),
        accessorKey: 'orderDate',
        cell: ({ row }) => (
          <span className="text-right">
            <FormattedDate value={row.original.orderDate} day="2-digit" month="long" year="numeric" />
          </span>
        ),
        id: 'orderDate'
      }
    ],
    [intl]
  )

  return columns
}

export default useSystemsColumns
