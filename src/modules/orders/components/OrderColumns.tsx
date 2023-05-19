import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { Fragment, useMemo } from 'react'
import { FormattedDate, useIntl } from 'react-intl'
import { type CellProps, type Column } from 'react-table'

import TooltipComponent from '@/components/tooltip.comp'
import { message } from '@/i18n/src/messages'

import type { Order } from '../types'
import { DeliveryStatusMapping } from '../types'
import TableActions from './TableActions'

const messages = message.ordersPage.ordersTable.header

const useOrderColumns = () => {
  const intl = useIntl()

  const columns = useMemo(
    (): Column<Order>[] => [
      {
        Header: intl.formatMessage({ id: messages.name }),
        accessor: 'name',
        id: 'name',
        Cell: ({ value, row }: CellProps<Order>) => (
          <div className="flex items-center my-1">
            <TableActions order={row.original} />
            <span>{value}</span>
          </div>
        )
      },
      { Header: intl.formatMessage({ id: messages.orderNumber }), accessor: 'orderNumber', id: 'orderNumber' },
      { Header: intl.formatMessage({ id: messages.requestNumber }), accessor: 'requestNumber', id: 'requestNumber' },
      { Header: intl.formatMessage({ id: messages.contractNumber }), accessor: 'contractNumber', id: 'contractNumber' },
      { Header: intl.formatMessage({ id: messages.orderStatus }), accessor: 'orderStatus' },
      {
        Header: intl.formatMessage({ id: messages.deliveryStatus }),
        accessor: 'deliveryStatus',
        Cell: ({ value }: CellProps<Order>) => <span>{DeliveryStatusMapping[value]}</span>
      },
      { Header: intl.formatMessage({ id: messages.supplier }), accessor: 'supplier', id: 'supplier' },
      { Header: intl.formatMessage({ id: messages.procurementResponsible }), accessor: 'procurementResponsible' },
      { Header: intl.formatMessage({ id: messages.requestor }), accessor: 'requestor' },
      {
        Header: intl.formatMessage({ id: messages.notes }),
        accessor: 'notes',
        Cell: ({ value }: CellProps<Order>) => (
          <Fragment>
            {value && (
              <TooltipComponent text={value}>
                <InformationCircleIcon className="h-6 w-6 flex-shrink-0" />
              </TooltipComponent>
            )}
          </Fragment>
        ),
        id: 'notes'
      },
      {
        Header: intl.formatMessage({ id: messages.lastUpdateTime }),
        accessor: 'lastUpdateTime',
        Cell: ({ value }: CellProps<Order>) => (
          <FormattedDate value={value} day="2-digit" month="long" year="numeric" />
        ),
        id: 'lastUpdateTime'
      },
      {
        Header: intl.formatMessage({ id: messages.lastUpdateBy }),
        accessor: 'lastUpdateBy'
      },
      {
        Header: intl.formatMessage({ id: messages.orderDate }),
        accessor: 'orderDate',
        Cell: ({ value }: CellProps<Order>) => (
          <span className="text-right">
            <FormattedDate value={value} day="2-digit" month="long" year="numeric" />
          </span>
        ),
        id: 'orderDate'
      }
    ],
    [intl]
  )

  return columns
}

export default useOrderColumns
