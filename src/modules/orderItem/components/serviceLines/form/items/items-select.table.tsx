import { Pagination } from '@/modules/shared/table/Pagination'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import type { PandaTableSettings } from '@/modules/shared/table/pandaTable/PandaTable'
import { PandaTableV2 } from '@/modules/shared/table/pandaTableV2/PandaTableV2'
import { SearchBar } from '@/modules/shared/table/SearchBar'
import { useSystems } from '@/modules/systems/hooks/useSystems'
import type { SystemDetail } from '@/types/responses/systems'

import { useSystemsItemsColumns } from './useSystemItemsColumns'

export const ItemsSelectTable = () => {
  const tableId = 'items-select-table'

  const settings: PandaTableSettings<SystemDetail> = {
    enableMultiRowSelection: true,
    enableColumnHiding: false,
    enableColumnReordering: false,
    enableQueryURL: false,
    enableRowSelection: row => !!row.original.physicalItem?.uid
  }

  const columns = useSystemsItemsColumns({ tableId })

  const { systems } = useSystems(tableId)
  const table = usePandaTable({
    tableId,
    settings,
    data: systems?.data,
    columns: columns.columns,
    getSubRows: original => original.subSystems ?? []
  })

  return (
    <div>
      <SearchBar tableId={tableId} useQuery={false} />
      <PandaTableV2
        data={systems?.data}
        className="overflow-y-auto relative h-[423px]"
        table={table}
        tableId={tableId}
        settings={settings}
      />
      <Pagination
        tableId={tableId}
        settings={{
          enableQueryURL: settings?.enableQueryURL,
          pageSizeDefault: 50,
          total: systems?.totalCount
        }}
      />
    </div>
  )
}
