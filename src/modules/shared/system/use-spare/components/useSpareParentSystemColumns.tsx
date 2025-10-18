import type { ColumnDef, Row } from '@tanstack/react-table'
import { Info } from 'lucide-react'
import type { HTMLProps } from 'react'
import { Fragment, useMemo } from 'react'

import { Tooltip } from '@/components/Tooltip'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { IconCell } from '@/modules/systems/components/table/cells/IconCell'
import { SystemNameCell } from '@/modules/systems/components/table/cells/SystemNameCell'
import { useSubsystems } from '@/modules/systems/hooks/useSubsystems'
import type { ITEM_USAGE } from '@/modules/systems/types/constants'
import type { SystemDetail } from '@/types/responses/systems'

interface SpareParentSystemColumnsProps {
  tableId: string
}

interface IndeterminateCheckboxProps extends HTMLProps<HTMLInputElement> {
  row: Row<SystemDetail>
}

function IndeterminateCheckbox({
  className,
  checked,
  row,
  ...rest
}: IndeterminateCheckboxProps) {
  const onChange = () => {
    row.toggleSelected(undefined, { selectChildren: false })
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

export const useSpareParentSystemColumns = ({
  tableId
}: SpareParentSystemColumnsProps) => {
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
                <Info className="h-5 w-5 pr- shrink-0" />
              </Tooltip>
            )}
          </Fragment>
        )
      },
      {
        header: 'Sub Systems Count',
        accessorFn: row => row.statistics?.subsystemsCount,
        id: 'subsystemsCount',
        size: 200
      }
    ],
    [setUid, tableId]
  )

  return { columns, pending }
}
