import { InformationCircleIcon } from '@heroicons/react/24/outline'
import type { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/router'
import { Fragment, useMemo } from 'react'
import { useIntl } from 'react-intl'

import { NewTabLink } from '@/components/decorators'
import { Tooltip } from '@/components/Tooltip'
import { message } from '@/i18n/src/messages'
import useOrderDetail from '@/modules/orderItem/hooks/useOrderDetail'
import type { ServiceLine } from '@/modules/orderItem/types/form'
import { PATH } from '@/types/constants/paths'

const messages = message.ordersPage.serviceLines.columns

export const useServiceLinesColumns = () => {
  const uid = useRouter().query.uid as string
  const { disabledEdit } = useOrderDetail()
  const { formatMessage } = useIntl()
  const columns = useMemo((): ColumnDef<ServiceLine, any>[] => {
    const cols: ColumnDef<ServiceLine, any>[] = [
      {
        header: formatMessage({ id: messages.name }),
        accessorKey: 'name',
        cell: ({ getValue }) => (
          <div className="flex items-center">
            <span>{getValue()}</span>
          </div>
        ),
        meta: { sticky: true, className: 'sm:pr-12' },
        size: 240,
        footer: ({ table: { getRowCount } }) => (
          <span>Total: {getRowCount()} line(s)</span>
        )
      },
      {
        header: formatMessage({ id: messages.serviceType }),
        accessorKey: 'serviceType',
        cell: ({ getValue }) => (
          <NewTabLink
            href={PATH.SERVICE + '/' + getValue().uid}
            value={getValue().name}
          />
        )
      },
      {
        header: 'Item',
        accessorKey: 'item',
        cell: ({ getValue, row: { original } }) => (
          <NewTabLink
            href={PATH.SYSTEM + '/' + original.item.uid}
            value={getValue().name}
          />
        )
      },
      {
        accessorKey: 'isDelivered',
        size: 90,
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
        )
      }
    ]
    return cols
  }, [formatMessage])

  return columns
}
