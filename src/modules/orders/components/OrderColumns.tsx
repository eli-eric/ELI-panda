import { InformationCircleIcon } from '@heroicons/react/24/outline'
import type { CellContext, ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { Fragment, useMemo } from 'react'
import { FormattedDate, useIntl } from 'react-intl'

import { LinkDecorator } from '@/components/decorators'
import { Tooltip } from '@/components/Tooltip'
import { message } from '@/i18n/src/messages'
import { PATH } from '@/types/constants/paths'
import type { Order } from '@/types/responses/orders'

import { DeliveryStatusMapping } from '../types'
import { NameCell } from './cells/NameCell'

const messages = message.ordersPage.ordersTable.header

const LinkNameCell = ({
  getValue,
  row: { original }
}: CellContext<Order, any>) => (
  <div className="flex items-center">
    <Link href={PATH.ORDER + '/' + original.uid} legacyBehavior>
      <a target={'_blank'} rel="noreferrer">
        <LinkDecorator>
          <span>{getValue()}</span>
        </LinkDecorator>
      </a>
    </Link>
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
        cell: isReadOnly ? LinkNameCell : NameCell,
        size: 300,
        meta: { sticky: true, className: 'sm:pr-8' },
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
                <InformationCircleIcon className="h-5 w-5 pr- shrink-0" />
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
