import type { ColumnDef } from '@tanstack/react-table'
import { Info } from 'lucide-react'
import { Fragment, useMemo } from 'react'
import { useIntl } from 'react-intl'

import { NewTabLink } from '@/components/decorators'
import { Tooltip } from '@/components/Tooltip'
import { DeliveryStatusBadge } from '@/components/ui/delivery-status-badge'
import { message } from '@/i18n/src/messages'
import type { ServiceLine } from '@/modules/orderItem/types/form'
import { PATH } from '@/types/constants/paths'

import {
  DeliveredAllButton,
  ServiceDeliveryAction,
  ServiceLineActionButtons as ServiceLineActions,
  ServiceLinePriceFooter
} from '../../actions'
import useOrderDetail from '../../hooks/useOrderDetail'
const messages = message.ordersPage.serviceLines.columns

//TODO: NA akci isDelivered se duplikuji service lines, need to fix this!!!!!!!!!!!!!

export const useServiceLinesColumns = () => {
  const { formatMessage } = useIntl()
  const { disabledEdit } = useOrderDetail()
  const columns = useMemo((): ColumnDef<ServiceLine, any>[] => {
    const cols: ColumnDef<ServiceLine, any>[] = [
      {
        accessorKey: 'isDelivered',
        header: () => {
          return (
            <div className="flex items-center justify-between px-2 w-full">
              <span>{formatMessage({ id: message.common.ui.status })}</span>
              <DeliveredAllButton />
            </div>
          )
        },
        size: 160,
        meta: {
          sticky: 'left'
        },
        cell: ({ getValue, row: { original } }) => (
          <div className="flex items-center gap-2">
            <DeliveryStatusBadge isDelivered={getValue() || false} />
            <ServiceDeliveryAction
              serviceLine={original}
              checked={getValue()}
            />
          </div>
        ),
        enablePinning: false,
        enableSorting: false,
        enableColumnFilter: false,
        footer: ({ table: { getRowCount } }) => (
          <span>
            {formatMessage(
              { id: message.ordersPage.serviceLines.totalLines },
              { count: getRowCount() }
            )}
          </span>
        )
      },
      {
        header: formatMessage({ id: messages.name }),
        accessorKey: 'name',
        cell: ({ getValue }) => (
          <div
            className="overflow-hidden text-ellipsis whitespace-nowrap"
            title={getValue()}
          >
            {getValue()}
          </div>
        ),
        enablePinning: false,
        size: 280
      },
      {
        header: formatMessage({ id: messages.serviceType }),
        accessorFn: ({ serviceType }) => serviceType.name,
        size: 240,
        enablePinning: false,
        cell: ({ getValue, row: { original } }) => (
          <div className="relative z-10">
            <NewTabLink
              href={PATH.SERVICE + '/' + original.serviceType.uid}
              value={getValue()}
            />
          </div>
        )
      },
      {
        header: formatMessage({ id: messages.item }),
        accessorFn: ({ item }) => item.name,
        size: 340,
        enablePinning: false,
        cell: ({ getValue, row: { original } }) => (
          <div className="relative z-10">
            <NewTabLink
              href={PATH.SYSTEM_ITEM + '/' + original.item.uid}
              value={getValue()}
            />
          </div>
        )
      },
      {
        header: formatMessage({
          id: message.ordersPage.orderLines.orderLinesTable.header.eun
        }),
        accessorKey: 'eun',
        enablePinning: false
      },
      {
        header: formatMessage({ id: messages.notes }),
        accessorKey: 'notes',
        cell: ({ getValue }) => (
          <Fragment>
            {getValue() && (
              <Tooltip content={getValue()}>
                <Info className="h-6 w-6 shrink-0" />
              </Tooltip>
            )}
          </Fragment>
        ),
        id: 'notes',
        size: 120,
        enablePinning: false,
        enableSorting: false,
        enableColumnFilter: false
      },
      {
        header: formatMessage({ id: messages.price }),
        accessorKey: 'price',
        enablePinning: false,
        cell: ({ getValue, row: { original } }) => (
          <span className="whitespace-nowrap">
            {getValue()}{' '}
            <span className="font-medium ">{original.currency}</span>
          </span>
        ),
        footer: props => (
          <ServiceLinePriceFooter rows={props.table.getRowModel().rows} />
        )
      },
      {
        id: 'actions',
        header: '',
        meta: {
          sticky: 'right',
          enableReorder: false
        },
        cell: ({ row: { original } }) =>
          !disabledEdit ? <ServiceLineActions serviceLine={original} /> : null,
        size: 100,
        enableSorting: false,
        enablePinning: false,
        enableColumnFilter: false,
        enableHiding: false
      }
    ]
    return cols
  }, [formatMessage, disabledEdit])

  return columns
}
