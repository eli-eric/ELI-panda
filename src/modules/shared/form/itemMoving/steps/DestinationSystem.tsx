import type { ColumnDef } from '@tanstack/react-table'
import { type FC, useMemo } from 'react'

import { Pagination } from '@/modules/shared/table/Pagination'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import { PandaTableV2 } from '@/modules/shared/table/pandaTableV2/PandaTableV2'
import { IconCell } from '@/modules/systems/components/table/cells/IconCell'
import { SystemNameCell } from '@/modules/systems/components/table/cells/SystemNameCell'
import { useSubsystems } from '@/modules/systems/hooks/useSubsystems'
import { useSystems } from '@/modules/systems/hooks/useSystems'
import type { ITEM_USAGE } from '@/modules/systems/types/constants'
import type { SystemDetail } from '@/types/responses/systems'

export const DestinationSystem: FC = () => {
  const tableId = 'destionation-systems'

  const { setUid, pending } = useSubsystems(tableId)

  const { systems, queryKey } = useSystems(tableId)

  const columns = useMemo(
    (): ColumnDef<SystemDetail>[] => [
      {
        id: 'icon',
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
        header: 'Name',
        accessorFn: row => row.name,
        id: 'name',
        size: 480,
        meta: { sticky: true, className: 'sm:pr-[70px]' },
        enableHiding: false,
        cell: props => (
          <SystemNameCell
            {...props}
            setUid={setUid}
            canEdit={false}
            queryKey={queryKey}
            hideButtons={true}
            tableId={tableId}
            enableDragAndDrop={false}
          />
        )
      },
      {
        id: 'Code',
        accessorFn: row => row?.systemCode
      },
      {
        id: 'zone',
        accessorFn: row => row?.zone?.code,
        header: 'Zone'
      },
      {
        header: 'Location',
        id: 'location',
        accessorFn: row => row?.location?.code
      }
    ],
    [queryKey, setUid, tableId]
  )

  const table = usePandaTable<SystemDetail>({
    tableId,
    data: systems?.data || [],
    columns,
    getSubRows: row => row.subSystems || []
  })

  return (
    <div>
      <div className="h-[400px]">
        <PandaTableV2
          {...{
            tableId,
            data: systems?.data || [],
            columns,
            table
          }}
        />
      </div>
      <Pagination
        tableId={tableId}
        settings={{
          total: systems?.totalCount,
          enableQueryURL: false,
          pageSizeDefault: 50
        }}
      />
    </div>
  )
}
