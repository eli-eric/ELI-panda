import { memo, useMemo } from 'react'

import { Pagination } from '@/modules/shared/table/Pagination'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import type { PandaTableSettings } from '@/modules/shared/table/pandaTable/PandaTable'
import { PandaTableV2 } from '@/modules/shared/table/pandaTableV2/PandaTableV2'
import { SearchBar } from '@/modules/shared/table/SearchBar'
import { SystemFilterButtonContainer } from '@/modules/systems/components/filters/SystemsFilterButton.cont'
import { useSystems } from '@/modules/systems/hooks/useSystems'
import type { SystemDetail } from '@/types/responses/systems'

import { useSystemsItemsColumns } from './useSystemItemsColumns'

// Používáme standardní komponenty, abychom předešli problémům s typováním
const SearchBarComponent = SearchBar
const PandaTableComponent = PandaTableV2
const PaginationComponent = Pagination
const SystemFilterButtonComponent = SystemFilterButtonContainer

export const ItemsSelectTable = () => {
  const tableId = 'items-select-table'

  // Memoizujeme nastavení tabulky, aby nedocházelo k zbytečným re-renderům
  const settings = useMemo<PandaTableSettings<SystemDetail>>(
    () => ({
      enableMultiRowSelection: true,
      enableColumnHiding: true,
      enableColumnReordering: false,
      enableQueryURL: false,
      enableRowSelection: row => !!row.original.physicalItem?.uid
    }),
    []
  )

  const columns = useSystemsItemsColumns({ tableId })

  const { systems } = useSystems(tableId)

  const table = usePandaTable({
    tableId,
    settings,
    data: systems?.data,
    columns: columns.columns,
    getSubRows: original => original.subSystems ?? []
  })

  // Memoizujeme další props pro komponenty
  const paginationSettings = useMemo(
    () => ({
      enableQueryURL: settings?.enableQueryURL,
      pageSizeDefault: 50,
      total: systems?.totalCount
    }),
    [settings?.enableQueryURL, systems?.totalCount]
  )

  // Optimalizujeme renderování komponenty
  return (
    <div>
      <SearchBarComponent
        tableId={tableId}
        useQuery={false}
        left={
          <SystemFilterButtonComponent
            disabledFields={{ category: true }}
            tableId={tableId}
          />
        }
      />
      <PandaTableComponent
        data={systems?.data}
        className="overflow-y-auto relative h-[423px]"
        table={table}
        tableId={tableId}
        settings={settings}
      />
      <PaginationComponent tableId={tableId} settings={paginationSettings} />
    </div>
  )
}

// Export optimalizované komponenty
const MemoizedItemsSelectTable = memo(ItemsSelectTable)
export default MemoizedItemsSelectTable
