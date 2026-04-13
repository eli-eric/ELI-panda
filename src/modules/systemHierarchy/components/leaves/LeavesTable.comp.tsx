import type { Table } from '@tanstack/react-table'
import type { FC, ReactNode } from 'react'
import { useCallback, useRef } from 'react'

import { PaginationV2 as Pagination } from '@/modules/shared/table/PaginationV2'
import {
    PandaTableV2,
    type PandaTableV2Handle,
} from '@/modules/shared/table/pandaTableV2/PandaTableV2'

import type { SystemLeaf } from '../../types'
import { LEAVES_TABLE_ID } from '../../types/constants'

interface LeavesTableProps {
    data: SystemLeaf[]
    totalCount: number
    isLoading: boolean
    onRowClick: (uid: string) => void
    table: Table<SystemLeaf>
    toolbar?: ReactNode
    emptyState?: ReactNode
}

export const LeavesTableComponent: FC<LeavesTableProps> = ({
    data,
    totalCount,
    isLoading,
    onRowClick,
    table,
    toolbar,
    emptyState,
}) => {
    const tableRef = useRef<PandaTableV2Handle>(null)

    const handlePageChange = useCallback(() => {
        tableRef.current?.scrollToTop()
    }, [])

    return (
        <div className="flex flex-col h-full" data-testid="system-hierarchy-leaves-table">
            <div className="flex-1 min-h-0 flex flex-col">
                <PandaTableV2
                    ref={tableRef}
                    data={data}
                    table={table}
                    loading={isLoading}
                    tableId={LEAVES_TABLE_ID}
                    skeletonRowCount={25}
                    getRowProps={({ original: { uid } }) => ({
                        onClick: () => onRowClick(uid),
                        className: 'cursor-pointer hover:text-primary hover:bg-primary/10',
                    })}
                    settings={{
                        enableSorting: true,
                        enableColumnHiding: true,
                        enableColumnReordering: false,
                    }}
                    toolbar={toolbar}
                    emptyState={emptyState}
                    className="flex-1 min-h-0"
                />
            </div>
            <div className="shrink-0">
                <Pagination
                    tableId={LEAVES_TABLE_ID}
                    settings={{
                        enableQueryURL: true,
                        pageSizeDefault: 25,
                        total: totalCount,
                    }}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    )
}
