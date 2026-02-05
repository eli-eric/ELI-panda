import type { FC } from 'react'
import { useEffect, useMemo } from 'react'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import { cn } from '@/lib/utils'
import { FilterBadges } from '@/modules/shared/form/FilterBadges'
import { PaginationV2 as Pagination } from '@/modules/shared/table/PaginationV2'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import type { PandaTableSettings } from '@/modules/shared/table/pandaTable/PandaTable'
import { PandaTableV2 } from '@/modules/shared/table/pandaTableV2/PandaTableV2'
import { SearchBar } from '@/modules/shared/table/SearchBar'
import { getColorBySystemLevel, getFontBySystemLevel } from '@/modules/systemItem/utils'
import { SystemFilterButtonContainer } from '@/modules/systems/components/filters/SystemsFilterButton.cont'
import { useSystems } from '@/modules/systems/hooks/useSystems'
import type { SystemDetail } from '@/types/responses/systems'

import { useMoveSystemsColumns } from '../move-systems.columns'
import { useSystemsMoveStore } from '../store/useSystemsMoveStore'

interface MovingSystemsTableProps {
    tableId: string
    canSelectRow: (row: SystemDetail) => boolean
    tableHeading: string
}

export const MovingSystemsTable: FC<MovingSystemsTableProps> = ({
    tableId,
    canSelectRow,
    tableHeading,
}) => {
    const { systems, loading } = useSystems(tableId)

    const tableSettings: PandaTableSettings<SystemDetail> = useMemo(
        () => ({
            enableMultiRowSelection: true,
            enableColumnHiding: true,
            enableColumnReordering: false,
            enableQueryURL: false,
        }),
        [],
    )

    const { columns, pending } = useMoveSystemsColumns({ tableId })
    const { movingSystemsTableId } = useSystemsMoveStore()

    const table = usePandaTable<SystemDetail>({
        tableId: tableId,
        data: systems?.data,
        columns: columns,
        settings: {
            enableRowSelection: row => canSelectRow(row.original),
            ...tableSettings,
        },
        getSubRows: row => row.subSystems || [],
    })

    useEffect(() => {
        table.setColumnOrder(['icon', 'select'])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <TableLayoutContainer deps={[systems]} className="border-r-4 border-gray-400">
            <SearchBar
                tableId={tableId}
                useQuery={false}
                left={
                    <SystemFilterButtonContainer
                        panelSlide={tableId === movingSystemsTableId ? 'left' : 'right'}
                        tableId={tableId}
                        enableQueryURL={false}
                    />
                }
                right={
                    <div className="flex">
                        <FilterBadges enableQueryURL={false} tableId={tableId} />
                    </div>
                }
                onChange={() => table.resetExpanded()}
            />
            <PandaTableV2
                data={systems?.data}
                tableHeading={tableHeading}
                tableId={tableId}
                table={table}
                loading={loading || pending}
                className={'relative overflow-scroll scrollbar-style'}
                settings={tableSettings}
                getRowProps={({ original }) => ({
                    className: cn(
                        original?.physicalItem && 'font-bold text-gray-700 dark:text-gray-200',
                        getColorBySystemLevel(original?.systemLevel),
                        getFontBySystemLevel(original?.systemLevel),
                        original?.physicalItem && 'font-bold text-gray-700 dark:text-gray-200',
                        original?.statistics?.sp_coverage != null &&
                            original.statistics.sp_coverage < 1 &&
                            'text-red-500 dark:text-red-500 font-bold',
                    ),
                })}
            />
            <Pagination
                tableId={tableId}
                settings={{
                    enableQueryURL: false,
                    pageSizeDefault: 50,
                    total: systems?.totalCount,
                }}
            />
        </TableLayoutContainer>
    )
}
