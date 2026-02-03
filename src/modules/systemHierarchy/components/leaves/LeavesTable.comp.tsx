import type { FC } from 'react'
import { Fragment, useCallback, useRef } from 'react'

import { PaginationV2 as Pagination } from '@/modules/shared/table/PaginationV2'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import {
    PandaTableV2,
    type PandaTableV2Handle,
} from '@/modules/shared/table/pandaTableV2/PandaTableV2'

import type { SystemLeaf } from '../../types'
import { LEAVES_TABLE_ID } from '../../types/constants'
import { useLeavesColumns } from './useLeavesColumns'

interface LeavesTableProps {
    data: SystemLeaf[]
    totalCount: number
    isLoading: boolean
    onRowClick: (uid: string) => void
}

export const LeavesTableComponent: FC<LeavesTableProps> = ({
    data,
    totalCount,
    isLoading,
    onRowClick,
}) => {
    const { columns } = useLeavesColumns()
    const tableRef = useRef<PandaTableV2Handle>(null)

    const table = usePandaTable({
        tableId: LEAVES_TABLE_ID,
        columns,
        data,
        settings: {
            enableSorting: true,
            enableColumnHiding: true,
            enableFiltering: true,
            manualFiltering: true,
            enableColumnReordering: false,
        },
    })

    const handlePageChange = useCallback(() => {
        tableRef.current?.scrollToTop()
    }, [])

    return (
        <Fragment>
            <PandaTableV2
                ref={tableRef}
                data={data}
                table={table}
                loading={isLoading}
                tableId={LEAVES_TABLE_ID}
                skeletonRowCount={20}
                getRowProps={({ original: { uid } }) => ({
                    onClick: () => onRowClick(uid),
                    className: 'cursor-pointer hover:text-primary hover:bg-primary/10',
                })}
                settings={{
                    enableSorting: true,
                    enableColumnHiding: true,
                    enableColumnReordering: false,
                }}
                className="relative overflow-scroll scrollbar-style"
            />
            <Pagination
                tableId={LEAVES_TABLE_ID}
                settings={{
                    enableQueryURL: false,
                    pageSizeDefault: 20,
                    total: totalCount,
                }}
                onPageChange={handlePageChange}
            />
        </Fragment>
    )
}
