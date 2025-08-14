import { InformationCircleIcon } from '@heroicons/react/24/outline'
import type { ColumnDef } from '@tanstack/react-table'
import { Edit, Trash2 } from 'lucide-react'
import { Fragment, useMemo } from 'react'
import { useIntl } from 'react-intl'

import { NewTabLink } from '@/components/decorators'
import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import type { ServiceLine } from '@/modules/orderItem/types/form'
import { PATH } from '@/types/constants/paths'
import { createMessageValues } from '@/utils/formatters'

import useOrderDetail from '../../hooks/useOrderDetail'
import { useServiceLine } from '../../hooks/useServiceLine'
import {
  DeliveredAllButton,
  PriceFooter,
  ServiceDeliveryAction
} from './components/service-lines.actions'
import { useServiceLineActions } from './components/service-lines.actions'
const messages = message.ordersPage.serviceLines.columns

//TODO: NA akci isDelivered se duplikuji service lines, need to fix this!!!!!!!!!!!!!

const ServiceLineActionButtons = ({ serviceLine }: { serviceLine: ServiceLine }) => {
  const { formatMessage } = useIntl()
  const { deleteServiceLine } = useServiceLine()
  const { openEditModal } = useServiceLineActions()
  
  const withWarning = useWarningModal(
    formatMessage(
      { id: message.ordersPage.serviceLines.deleteModal.message },
      createMessageValues({ name: serviceLine.name })
    )
  )

  const handleDelete = () => {
    withWarning(deleteServiceLine)(serviceLine.uuid)
  }

  return (
    <div className="flex items-center gap-1">
      <Tooltip content="Edit service line">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => openEditModal(serviceLine)}
          className="h-8 w-8 p-0 hover:bg-accent"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </Tooltip>
      <Tooltip content="Delete service line">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          className="h-8 w-8 p-0 hover:bg-accent hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </Tooltip>
    </div>
  )
}

export const useServiceLinesColumns = () => {
  const { formatMessage } = useIntl()
  const { disabledEdit } = useOrderDetail()
  const columns = useMemo((): ColumnDef<ServiceLine, any>[] => {
    const cols: ColumnDef<ServiceLine, any>[] = [
      {
        id: 'actions',
        header: '',
        cell: ({ row: { original } }) =>
          !disabledEdit ? (
            <ServiceLineActionButtons serviceLine={original} />
          ) : null,
        size: 100,
        enableSorting: false,
        enablePinning: false,
        enableColumnFilter: false,
        enableHiding: false
      },
      {
        header: formatMessage({ id: messages.name }),
        accessorKey: 'name',
        cell: ({ getValue }) => (
          <div className="flex items-center">
            <span title={getValue()} className="truncate">
              {getValue()}
            </span>
          </div>
        ),
        meta: { sticky: true },
        size: 340,
        footer: ({ table: { getRowCount } }) => (
          <span>Total: {getRowCount()} line(s)</span>
        )
      },
      {
        header: formatMessage({ id: messages.serviceType }),
        accessorFn: ({ serviceType }) => serviceType.name,
        size: 240,
        cell: ({ getValue, row: { original } }) => (
          <NewTabLink
            href={PATH.SERVICE + '/' + original.serviceType.uid}
            value={getValue()}
          />
        )
      },
      {
        header: 'Item',
        accessorFn: ({ item }) => item.name,
        size: 340,
        cell: ({ getValue, row: { original } }) => (
          <NewTabLink
            href={PATH.SYSTEM_ITEM + '/' + original.item.uid}
            value={getValue()}
          />
        )
      },
      {
        header: 'EUN',
        accessorKey: 'eun'
      },
      {
        accessorKey: 'isDelivered',
        header: () => {
          return (
            <div className="flex items-center justify-between px-2 w-full">
              <DeliveredAllButton />
            </div>
          )
        },
        size: 90,
        enablePinning: false,
        meta: {
          filter: { enableColumnFilter: false, type: 'boolean' }
        },
        cell: ({ getValue, row: { original } }) => (
          <ServiceDeliveryAction serviceLine={original} checked={getValue()} />
        ),
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
                <InformationCircleIcon className="h-6 w-6 shrink-0" />
              </Tooltip>
            )}
          </Fragment>
        ),
        id: 'notes',
        size: 120,
        enableSorting: false,
        enableColumnFilter: false
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
      }
    ]
    return cols
  }, [formatMessage, disabledEdit])

  return columns
}
