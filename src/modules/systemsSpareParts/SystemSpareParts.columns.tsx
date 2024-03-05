import { InformationCircleIcon } from '@heroicons/react/24/outline'
import type { ColumnDef } from '@tanstack/react-table'
import type { HTMLProps } from 'react'
import { Fragment, useMemo } from 'react'

import { NewTabLink } from '@/components/decorators'
import { Tooltip } from '@/components/Tooltip'
import { PATH } from '@/types/constants/paths'
import { classNames } from '@/utils'

import { IconCell } from '../systems/components/table/cells/IconCell'
import { useSubsystems } from '../systems/hooks/useSubsystems'
import type { SystemDetail } from '../systems/types/responses'
import { SpareNameCell } from './components/NameCell'

// eslint-disable-next-line

interface SystemsColumnsProps {
  tableId: string
}

function IndeterminateCheckbox({ className, ...rest }: HTMLProps<HTMLInputElement>) {
  return (
    <input
      type="checkbox"
      className={classNames(
        className,
        !rest.disabled && 'cursor-pointer',
        'focus:ring-primary-500 h-5 w-5 text-primary-600 dark:text-primary-600 rounded',
        !rest.checked && 'dark:bg-gray-700',
        rest.disabled && 'bg-gray-300 dark:bg-gray-500'
      )}
      {...rest}
    />
  )
}

export const useSystemsSparePartsColumns = ({ tableId }: SystemsColumnsProps) => {
  const { setUid, pending } = useSubsystems(tableId)
  const columns = useMemo(
    (): ColumnDef<SystemDetail, any>[] => [
      {
        id: 'icons',
        header: 'icon',
        size: 40,
        meta: { sticky: true },
        cell: IconCell
      },
      {
        id: 'select',
        header: 'sel',
        size: 40,
        meta: { sticky: true },
        enableHiding: false,
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              onChange={() => row.toggleSelected(undefined, { selectChildren: false })}
            />
          </div>
        )
      },
      {
        header: 'Name',
        accessorFn: row => row.name,
        id: 'name',
        size: 440,
        enableHiding: false,
        cell: props => <SpareNameCell {...props} setUid={setUid} tableId={tableId} />
      },
      { header: 'System Level', accessorFn: row => row.systemLevel, id: 'systemLevel' },
      { header: 'System Code', accessorFn: row => row.systemCode, id: 'systemCode', size: 150 },
      { header: 'System Alias', accessorFn: row => row.systemAlias, id: 'systemAlias', size: 150 },
      {
        header: 'System Type',
        accessorFn: row => row.systemType?.name,
        id: 'systemType',
        size: 150
      },
      { header: 'Control System Zone', accessorFn: row => row.zone?.name, id: 'zone', size: 150 },
      {
        header: 'Location',
        accessorFn: row => row.location?.name,
        id: 'location',
        size: 150
      },
      { header: 'Responsible', accessorFn: row => row.responsible?.name, id: 'responsible', size: 150 },
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
      { header: 'Importance', accessorFn: row => row.importance?.name, id: 'importance', size: 150 },
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
            {getValue()} <span className="font-medium">{original.physicalItem?.currency}</span>
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
          <NewTabLink href={PATH.CATALOGUE_ITEM + '/' + original.physicalItem?.catalogueItem?.uid} value={getValue()} />
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
    [setUid, tableId]
  )

  return { columns, pending }
}
