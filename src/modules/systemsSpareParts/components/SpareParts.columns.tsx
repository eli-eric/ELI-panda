import { InformationCircleIcon } from '@heroicons/react/24/outline'
import type { ColumnDef } from '@tanstack/react-table'
import { Fragment, useMemo } from 'react'

import { Tooltip } from '@/components/Tooltip'
import { SystemNameCell } from '@/modules/systems/components/table/cells/SystemNameCell'
import type { SystemDetail } from '@/modules/systems/types/responses'

interface SystemsColumnsProps {
  tableId: string
}

export const useSparePartsColumns = ({ tableId }: SystemsColumnsProps) => {
  const columns = useMemo(
    (): ColumnDef<SystemDetail, any>[] => [
      {
        header: 'Name',
        accessorFn: row => row.name,
        id: 'name',
        size: 400,
        meta: { sticky: true, className: 'sm:pr-[70px]' },
        enableHiding: false,
        cell: props => (
          <SystemNameCell {...props} hideButtons={true} tableId={tableId} />
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
      }
    ],
    [tableId]
  )

  return columns
}
