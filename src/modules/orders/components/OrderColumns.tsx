import { InformationCircleIcon } from '@heroicons/react/24/outline'
import type { CellContext, ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { Fragment, useMemo } from 'react'
import { FormattedDate, useIntl } from 'react-intl'

import { Tooltip } from '@/components/Tooltip'
import { Badge } from '@/components/ui/badge'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { PATH } from '@/types/constants/paths'
import type { Order } from '@/types/responses/orders'

import { DeliveryStatusMapping } from '../types'
import { getBadgeVariantByOrderStatus } from '../utils/getColorClassStatus'
import TableActions from './TableActions'

const messages = message.ordersPage.ordersTable.header

const LinkNameCell = ({
  getValue,
  row: { original },
  isReadOnly
}: CellContext<Order, any> & { isReadOnly: boolean }) => (
  <div className="flex items-center w-full">
    <div className="flex items-center flex-1 min-w-0">
      <Badge
        variant="outline"
        className={cn(
          'h-7 px-3 hover:opacity-80 flex items-center min-w-0 max-w-full',
          getBadgeVariantByOrderStatus(
            original.orderStatus,
            original.deliveryStatus
          )
        )}
      >
        <Tooltip content={getValue()}>
          <Link
            href={PATH.ORDER + '/' + original.uid}
            className="cursor-pointer text-inherit hover:underline truncate block min-w-0"
          >
            {getValue()}
          </Link>
        </Tooltip>
      </Badge>
    </div>
    {!isReadOnly && (
      <div className="flex-shrink-0 ml-2">
        <TableActions order={original} />
      </div>
    )}
  </div>
)

interface Props {
  isReadOnly: boolean
}

export const useOrderColumns = ({ isReadOnly }: Props) => {
  const intl = useIntl()

  const columns = useMemo(
    (): ColumnDef<Order, any>[] => [
      {
        id: 'name',
        header: intl.formatMessage({ id: messages.name }),
        accessorKey: 'name',
        cell: props => <LinkNameCell {...props} isReadOnly={isReadOnly} />,
        size: 440,
        meta: { sticky: true },
        enableHiding: false
      },
      {
        id: 'orderNumber',
        header: intl.formatMessage({ id: messages.orderNumber }),
        accessorKey: 'orderNumber',
        size: 200,
        meta: { className: 'justify-end' }
      },
      {
        id: 'requestNumber',
        header: intl.formatMessage({ id: messages.requestNumber }),
        accessorKey: 'requestNumber',
        size: 200,
        meta: { className: 'justify-end' }
      },
      {
        id: 'contractNumber',
        header: intl.formatMessage({ id: messages.contractNumber }),
        accessorKey: 'contractNumber',
        size: 200,
        meta: { className: 'justify-end' }
      },
      {
        id: 'orderStatus',
        header: intl.formatMessage({ id: messages.orderStatus }),
        accessorFn: row => row?.orderStatus?.name,
        size: 150
      },
      {
        id: 'deliveryStatus',
        header: intl.formatMessage({ id: messages.deliveryStatus }),
        accessorKey: 'deliveryStatus',
        cell: ({ getValue }) => <span>{DeliveryStatusMapping[getValue()]}</span>
      },
      {
        id: 'supplier',
        header: intl.formatMessage({ id: messages.supplier }),
        accessorKey: 'supplier',
        size: 300
      },
      {
        id: 'procurementResponsible',
        header: intl.formatMessage({ id: messages.procurementResponsible }),
        accessorKey: 'procurementResponsible',
        size: 230
      },
      {
        id: 'requestor',
        header: intl.formatMessage({ id: messages.requestor }),
        accessorKey: 'requestor'
      },
      {
        id: 'notes',
        header: intl.formatMessage({ id: messages.notes }),
        accessorKey: 'notes',
        cell: ({ getValue }) => (
          <Fragment>
            {getValue() && (
              <Tooltip content={getValue()}>
                <InformationCircleIcon className="h-5 w-5 shrink-0" />
              </Tooltip>
            )}
          </Fragment>
        ),
        size: 90
      },
      {
        id: 'lastUpdateTime',
        header: intl.formatMessage({ id: messages.lastUpdateTime }),
        accessorKey: 'lastUpdateTime',
        cell: ({ getValue }) => (
          <FormattedDate
            value={getValue()}
            day="2-digit"
            month="long"
            year="numeric"
          />
        ),
        size: 200,
        meta: { className: 'justify-end' }
      },
      {
        id: 'lastUpdateBy',
        header: intl.formatMessage({ id: messages.lastUpdateBy }),
        accessorKey: 'lastUpdateBy',
        size: 200
      },
      {
        id: 'orderDate',
        header: intl.formatMessage({ id: messages.orderDate }),
        accessorKey: 'orderDate',
        cell: ({ getValue }) => (
          <FormattedDate
            value={getValue()}
            day="2-digit"
            month="long"
            year="numeric"
          />
        ),
        size: 170,
        meta: { className: 'justify-end' }
      }
    ],
    [intl, isReadOnly]
  )

  return columns
}
