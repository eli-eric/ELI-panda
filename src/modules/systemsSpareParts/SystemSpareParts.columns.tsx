import { InformationCircleIcon } from '@heroicons/react/24/outline'
import type { ColumnDef, Row } from '@tanstack/react-table'
import type { Dispatch, HTMLProps, SetStateAction } from 'react'
import { Fragment, useMemo } from 'react'

import { NewTabLink } from '@/components/decorators'
import { Tooltip } from '@/components/Tooltip'
import { PATH } from '@/types/constants/paths'
import type { SystemDetail } from '@/types/responses/systems'
import { classNames } from '@/utils'

import { IconCell } from '../systems/components/table/cells/IconCell'
import { SystemNameCell } from '../systems/components/table/cells/SystemNameCell'
import { useSubsystems } from '../systems/hooks/useSubsystems'
import type { ITEM_USAGE } from '../systems/types/constants'

// eslint-disable-next-line

interface SystemsColumnsProps {
  tableId: string
  setSelectedUids: Dispatch<SetStateAction<string[]>>
}

interface IndeterminateCheckboxProps extends HTMLProps<HTMLInputElement> {
  setSelectedUids: Dispatch<SetStateAction<string[]>>
  row: Row<SystemDetail>
}

function IndeterminateCheckbox({
  className,
  setSelectedUids,
  checked,
  row,
  ...rest
}: IndeterminateCheckboxProps) {
  return (
    <input
      type="checkbox"
      className={classNames(
        className,
        !rest.disabled && 'cursor-pointer',
        'focus:ring-primary-500 h-5 w-5 text-primary-600 dark:text-primary-600 rounded',
        !checked && 'dark:bg-gray-700',
        rest.disabled && 'bg-gray-300 dark:bg-gray-500'
      )}
      onChange={() => {
        row.toggleSelected(undefined, { selectChildren: false })
        setSelectedUids(prev => {
          const index = prev.indexOf(row.original.uid)
          if (index > -1) {
            return [...prev.slice(0, index), ...prev.slice(index + 1)]
          } else {
            return [...prev, row.original.uid]
          }
        })
      }}
      checked={checked}
      {...rest}
    />
  )
}

export const useSystemsSparePartsColumns = ({
  tableId,
  setSelectedUids
}: SystemsColumnsProps) => {
  const { setUid, pending } = useSubsystems(tableId)
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
        header: 'sel',
        size: 41,
        meta: { sticky: true },
        enableHiding: false,
        cell: ({ row }) => (
          <IndeterminateCheckbox
            row={row}
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            setSelectedUids={setSelectedUids}
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
          <SystemNameCell
            {...props}
            hideButtons={true}
            setUid={setUid}
            tableId={tableId}
          />
        )
      },
      {
        header: 'System Level',
        accessorFn: row => row.systemLevel,
        id: 'systemLevel'
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
                <InformationCircleIcon className="h-5 w-5 pr- flex-shrink-0" />
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
        size: 150
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
                <InformationCircleIcon className="h-6 w-6 flex-shrink-0" />
              </Tooltip>
            )}
          </Fragment>
        )
      },
      {
        header: 'Catalogue Category',
        accessorFn: row => row.physicalItem?.catalogueItem?.category?.name,
        id: 'catalogueCategory',
        size: 170
      },
      {
        header: 'Supplier',
        accessorFn: row => row.physicalItem?.catalogueItem?.supplier?.name,
        id: 'supplier',
        size: 150
      }
    ],
    [setUid, tableId, setSelectedUids]
  )

  return { columns, pending }
}
