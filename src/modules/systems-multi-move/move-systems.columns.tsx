import { InformationCircleIcon } from '@heroicons/react/24/outline'
import type { ColumnDef, Row } from '@tanstack/react-table'
import type { HTMLProps } from 'react'
import { Fragment, useMemo } from 'react'

import { NewTabLink } from '@/components/decorators'
import { Tooltip } from '@/components/Tooltip'
import { Checkbox } from '@/components/ui/checkbox'
import { cn, truncateString } from '@/lib/utils'
import { PATH } from '@/types/constants/paths'
import type { SystemDetail } from '@/types/responses/systems'

import { IconCell } from '../systems/components/table/cells/IconCell'
import { SystemNameCell } from '../systems/components/table/cells/SystemNameCell'
import { useSubsystems } from '../systems/hooks/useSubsystems'
import type { ITEM_USAGE } from '../systems/types/constants'
import { SelectAllCheckbox } from './components/select-all.checkbox'
import { SubmitMoveButton } from './components/submit-move.button'
import { useSystemsMoveStore } from './store/useSystemsMoveStore'

// eslint-disable-next-line

interface SystemsColumnsProps {
  tableId: string
}

interface IndeterminateCheckboxProps extends HTMLProps<HTMLInputElement> {
  row: Row<SystemDetail>
  tableId: string
}

function IndeterminateCheckbox({
  className,
  checked,
  row,
  tableId,
  ...rest
}: IndeterminateCheckboxProps) {
  const {
    removeDestinationSystem,
    removeMovingSystem,
    setDestinationSystem,
    addMovingSystem
  } = useSystemsMoveStore()

  const { destinationSystemsTableId } = useSystemsMoveStore()

  const onChange = (checked: boolean) => {
    row.toggleSelected(undefined, { selectChildren: false })

    if (checked) {
      if (tableId === destinationSystemsTableId) {
        setDestinationSystem(row.original)
      } else {
        addMovingSystem(row.original)
      }
    } else {
      if (tableId === destinationSystemsTableId) {
        removeDestinationSystem()
      } else {
        removeMovingSystem(row.original.uid)
      }
    }
  }

  return (
    <Checkbox
      className={cn(className, !rest.disabled && 'cursor-pointer')}
      onCheckedChange={onChange}
      checked={checked}
      disabled={rest.disabled}
    />
  )
}

export const useMoveSystemsColumns = ({ tableId }: SystemsColumnsProps) => {
  const { setUid, pending } = useSubsystems(tableId)
  const { movingSystemsTableId, destinationSystemsTableId } =
    useSystemsMoveStore()
  const columns = useMemo(
    (): ColumnDef<SystemDetail, any>[] => [
      {
        id: 'icons',
        size: 41,
        meta: { sticky: true },
        cell: ({ row: { original } }) => (
          <div>
            <IconCell
              itemUsageUid={original.physicalItem?.itemUsage?.uid as ITEM_USAGE}
            />
          </div>
        )
      },
      {
        id: 'select',
        header: ({ table }) => {
          if (tableId === movingSystemsTableId) {
            return (
              <div className="pl-1">
                <SelectAllCheckbox table={table} />
              </div>
            )
          }
          return null
        },
        size: 41,
        meta: { sticky: true },

        enableHiding: false,
        cell: ({ row }) => (
          <IndeterminateCheckbox
            row={row}
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            tableId={tableId}
          />
        )
      },
      {
        header: 'Name',
        accessorFn: row => row.name,
        id: 'name',
        size: 440,
        enableHiding: false,
        cell: props => (
          <div className="flex justify-between w-full">
            <SystemNameCell
              {...props}
              hideButtons={true}
              setUid={setUid}
              tableId={tableId}
            />
            {props.row.getIsSelected() &&
              tableId === destinationSystemsTableId && <SubmitMoveButton />}
          </div>
        )
      },
      {
        header: 'System Code',
        accessorFn: row => row.systemCode,
        id: 'systemCode',
        size: 150
      },
      {
        header: 'System Type',
        accessorFn: row => row.systemType?.name,
        id: 'systemType',
        size: 150
      },
      {
        header: 'Control System Zone',
        accessorFn: row => row.zone?.name,
        id: 'zone',
        size: 150
      },
      {
        header: 'Location',
        accessorFn: row => row.location?.name,
        id: 'location',
        size: 150
      },
      {
        header: 'Responsible',
        accessorFn: row => row.responsible?.name,
        id: 'responsible',
        size: 150
      },
      {
        header: 'Description',
        accessorFn: row => row.description,
        id: 'description',
        size: 150,
        cell: ({ getValue }) => (
          <Fragment>
            {getValue() && (
              <Tooltip content={getValue()}>
                <InformationCircleIcon className="h-5 w-5 pr- shrink-0" />
              </Tooltip>
            )}
          </Fragment>
        )
      },
      {
        header: 'Importance',
        accessorFn: row => row.importance?.name,
        id: 'importance',
        size: 150
      },
      {
        header: 'Sub Systems Count',
        accessorFn: row => row.statistics?.subsystemsCount,
        id: 'subsystemsCount',
        size: 200
      },
      {
        header: 'Spare Parts Count',
        accessorFn: row => row.statistics?.sparePartsCount,
        id: 'sparePartsCount',
        size: 200
      },
      {
        header: 'Minimal Spare Parts Count',
        accessorFn: row => row.statistics?.minimalSpareParstCount,
        id: 'minimalSpareParstCount',
        size: 200
      },
      {
        header: 'Spare Parts Coverage',
        accessorFn: row => row.statistics?.sp_coverage,
        id: 'sp_coverage',
        size: 200
      },
      {
        header: 'Item Usage',
        accessorFn: row => row.physicalItem?.itemUsage?.name,
        id: 'itemUsage',
        size: 150
      },
      {
        header: 'Price',
        accessorFn: row => row.physicalItem?.price,
        id: 'price',
        size: 150,
        meta: { className: 'text-right' },
        cell: ({ getValue, row: { original } }) => (
          <span className="whitespace-nowrap">
            {getValue()}{' '}
            <span className="font-medium">
              {original.physicalItem?.currency}
            </span>
          </span>
        )
      },
      {
        header: 'Eun',
        accessorFn: row => row.physicalItem?.eun,
        id: 'eun',
        size: 150
      },
      {
        header: 'Serial Number',
        accessorFn: row => row.physicalItem?.serialNumber,
        id: 'serialNumber',
        size: 150
      },
      {
        header: 'Catalogue Name',
        accessorFn: row => row.physicalItem?.catalogueItem?.name,
        id: 'catalogueName',
        size: 300,
        cell: ({ getValue, row: { original } }) => (
          <NewTabLink
            href={
              PATH.CATALOGUE_ITEM +
              '/' +
              original.physicalItem?.catalogueItem?.uid
            }
            value={getValue()}
          />
        )
      },
      {
        header: 'Part Number',
        accessorFn: row => row.physicalItem?.catalogueItem?.catalogueNumber,
        id: 'partNumber',
        size: 200
      },
      {
        header: 'Catalogue Description',
        accessorFn: row => row.physicalItem?.catalogueItem?.description,
        id: 'catalogueDescription',
        size: 200,
        cell: ({ getValue }) => (
          <Fragment>
            {getValue() && (
              <Tooltip content={getValue()}>
                <InformationCircleIcon className="h-6 w-6 shrink-0" />
              </Tooltip>
            )}
          </Fragment>
        )
      },
      {
        header: 'Catalogue Category',
        accessorFn: row => row.physicalItem?.catalogueItem?.category?.name,
        id: 'catalogueCategory',
        cell: ({ getValue }) => (
          <Tooltip content={getValue()}>
            <div>{truncateString(getValue(), 17)}</div>
          </Tooltip>
        ),
        size: 170
      },
      {
        header: 'Supplier',
        accessorFn: row => row.physicalItem?.catalogueItem?.supplier?.name,
        id: 'supplier',

        size: 150
      },
      {
        header: 'Order',
        accessorFn: row => row.physicalItem?.orderUid,
        cell: ({ getValue, row: { original } }) => {
          if (!getValue()) return null
          return (
            <NewTabLink
              href={PATH.ORDER + '/' + getValue()}
              value={original.physicalItem?.orderNumber || 'Order ->'}
            />
          )
        },
        id: 'physicalItem.orderNumber',
        size: 150
      }
    ],
    [setUid, tableId, movingSystemsTableId, destinationSystemsTableId]
  )

  return { columns, pending }
}
