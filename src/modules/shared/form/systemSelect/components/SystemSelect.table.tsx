import type { Row } from '@tanstack/react-table'
import { useEffect } from 'react'

import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import type { GetRowPropsReturnType } from '@/modules/shared/table/pandaTable/PandaTable'
import { PandaTableV2 } from '@/modules/shared/table/pandaTableV2/PandaTableV2'
import type { PageSizeOption } from '@/types/pagination'
import type { SystemDetail } from '@/types/responses/systems'

import { useSystemSelectColumns } from './SystemSelect.columns'

interface SystemSelectTableProps {
    tableId: string
    systems: SystemDetail[] | undefined
    selectedSystemUid?: string
    onSystemToggle: (system: SystemDetail) => void
    loading?: boolean
    getRowProps?: (row: Row<SystemDetail>) => GetRowPropsReturnType
    pageSizeDefault?: PageSizeOption
    enableQueryURL?: boolean
    className?: string
}

export const SystemSelectTable = ({
    tableId,
    systems,
    selectedSystemUid,
    onSystemToggle,
    loading,
    getRowProps,
    pageSizeDefault = 10,
    enableQueryURL = false,
    className,
}: SystemSelectTableProps) => {
    const columns = useSystemSelectColumns({
        tableId,
        selectedSystemUid,
        onSystemToggle,
    })

    const table = usePandaTable({
        tableId,
        columns,
        data: systems || [],
        getSubRows: (original: SystemDetail) => original.subSystems ?? [],
        settings: {
            enableSorting: false,
            enableQueryURL: false,
            enableColumnHiding: false,
            enableColumnReordering: false,
            manualSorting: false,
            defaultColumnOrder: ['selection', 'name', 'systemCode', 'systemType'],
        },
    })

    useEffect(() => {
        // Ensure column order is set on mount
        table.setColumnOrder(table.getAllLeafColumns().map(column => column.id))
    }, [table])

    return (
        <PandaTableV2
            table={table}
            loading={loading}
            tableId={tableId}
            getRowProps={getRowProps}
            data={systems}
            skeletonRowCount={pageSizeDefault}
            className={'relative overflow-y-scroll scrollbar-style text-sm'}
            settings={{
                enableQueryURL,
                defaultColumnOrder: ['selection', 'name', 'systemCode', 'systemType'],
                enableColumnHiding: false,
                enableColumnReordering: false,
                enableSorting: false,
                manualSorting: false,
            }}
        />
    )
}
