import { memo, useMemo } from 'react'

import { PaginationV2 as Pagination } from '@/modules/shared/table/PaginationV2'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import type { PandaTableSettings } from '@/modules/shared/table/pandaTable/PandaTable'
import { PandaTableV2 } from '@/modules/shared/table/pandaTableV2/PandaTableV2'
import { SearchBar } from '@/modules/shared/table/SearchBar'
import { useSystems } from '@/modules/systems/hooks/useSystems'
import type { SystemDetail } from '@/types/responses/systems'

import { SystemFilterButtonV2 } from './SystemFilterButtonV2'
import { useSpareParentSystemColumns } from './useSpareParentSystemColumns'

export const SpareParentSystemSelectTable = () => {
    const tableId = 'spare-parent-system-select-table'

    const settings = useMemo<PandaTableSettings<SystemDetail>>(
        () => ({
            enableMultiRowSelection: false,
            enableColumnHiding: true,
            enableColumnReordering: false,
            enableQueryURL: false,
            enableRowSelection: row => !row.original.physicalItem?.uid,
        }),
        [],
    )

    const columns = useSpareParentSystemColumns({ tableId })

    const { systems } = useSystems(tableId)

    const table = usePandaTable({
        tableId,
        settings,
        data: systems?.data,
        columns: columns.columns,
        getSubRows: original => original.subSystems ?? [],
        getRowId: original => original.uid,
    })

    const paginationSettings = useMemo(
        () => ({
            enableQueryURL: settings?.enableQueryURL,
            pageSizeDefault: 50,
            total: systems?.totalCount,
        }),
        [settings?.enableQueryURL, systems?.totalCount],
    )

    return (
        <div>
            <SearchBar
                tableId={tableId}
                useQuery={settings?.enableQueryURL}
                left={
                    <SystemFilterButtonV2
                        tableId={tableId}
                        enableQueryURL={settings?.enableQueryURL}
                    />
                }
            />
            <PandaTableV2
                data={systems?.data}
                className="overflow-y-auto relative h-[423px]"
                table={table}
                tableId={tableId}
                settings={settings}
            />
            <Pagination tableId={tableId} settings={paginationSettings} />
        </div>
    )
}

const MemoizedSpareParentSystemSelectTable = memo(SpareParentSystemSelectTable)
export default MemoizedSpareParentSystemSelectTable
