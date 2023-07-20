import { InformationCircleIcon } from '@heroicons/react/24/outline'
import type { ColumnDef } from '@tanstack/react-table'
import { Fragment, useMemo } from 'react'
import { FormattedDate, useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import type { Order } from '../types'
import { DeliveryStatusMapping } from '../types'
import TableActions from './TableActions'

const messages = message.ordersPage.ordersTable.header

export const useOrderColumns = (isHoveringId?: number | undefined | string) => {
  const intl = useIntl()

  const columns = useMemo(
    (): ColumnDef<Order, any>[] => [
      {
        header: intl.formatMessage({ id: messages.name }),
        accessorKey: 'name',
        id: 'name',
        cell: ({ getValue, row: { original, id } }) => (
          <div className="flex items-center">
            <span>{getValue()}</span>
            <TableActions order={original} isHovering={id === isHoveringId} />
          </div>
        ),
        size: 300,
        meta: { sticky: true }
      },
      {
        header: intl.formatMessage({ id: messages.orderNumber }),
        accessorKey: 'orderNumber',
        id: 'orderNumber',
        meta: { className: 'text-right' }
      },
      {
        header: intl.formatMessage({ id: messages.requestNumber }),
        accessorKey: 'requestNumber',
        id: 'requestNumber',
        meta: { className: 'text-right' }
      },
      {
        header: intl.formatMessage({ id: messages.contractNumber }),
        accessorKey: 'contractNumber',
        id: 'contractNumber',
        meta: { className: 'text-right' }
      },
      { header: intl.formatMessage({ id: messages.orderStatus }), accessorKey: 'orderStatus' },
      {
        header: intl.formatMessage({ id: messages.deliveryStatus }),
        accessorKey: 'deliveryStatus',
        cell: ({ getValue }) => <span>{DeliveryStatusMapping[getValue()]}</span>
      },
      { header: intl.formatMessage({ id: messages.supplier }), accessorKey: 'supplier', id: 'supplier', size: 300 },
      {
        header: intl.formatMessage({ id: messages.procurementResponsible }),
        accessorKey: 'procurementResponsible',
        size: 200
      },
      { header: intl.formatMessage({ id: messages.requestor }), accessorKey: 'requestor' },
      {
        header: intl.formatMessage({ id: messages.notes }),
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
        id: 'notes',
        size: 90
      },
      {
        header: intl.formatMessage({ id: messages.lastUpdateTime }),
        accessorKey: 'lastUpdateTime',
        cell: ({ getValue }) => <FormattedDate value={getValue()} day="2-digit" month="long" year="numeric" />,
        id: 'lastUpdateTime',
        meta: { className: 'text-right' }
      },
      {
        header: intl.formatMessage({ id: messages.lastUpdateBy }),
        accessorKey: 'lastUpdateBy'
      },
      {
        header: intl.formatMessage({ id: messages.orderDate }),
        accessorKey: 'orderDate',
        cell: ({ getValue }) => (
          <span className="text-right">
            <FormattedDate value={getValue()} day="2-digit" month="long" year="numeric" />
          </span>
        ),
        id: 'orderDate',
        meta: { className: 'text-right' }
      }
    ],
    [intl, isHoveringId]
  )

  return columns
}
