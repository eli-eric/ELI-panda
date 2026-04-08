import type { Table } from '@tanstack/react-table'
import { type FC, Fragment, type PropsWithChildren } from 'react'

import EmptyResults from '@/components/empty-section/EmptyResults'
import { PaginationV2 } from '@/components/table/PaginationV2.comp'
import { cn } from '@/lib/utils'

import { ColumnVisibilityDropdown } from '../../ColumnVisibilityDropdown.comp'

interface Props {
    table: Table<any>
    isLoading?: boolean
    isRefetching?: boolean
    isEmpty?: boolean
    tableHeading?: string
    className?: string
    enableColumnHiding?: boolean
    tableContainerRef?: any
    enablePagination?: boolean
    itemsTotalCount?: number
    toolbar?: React.ReactNode
    emptyState?: React.ReactNode
}

export const TableContainer: FC<PropsWithChildren<Props>> = ({
    children,
    table,
    tableHeading,
    className,
    enableColumnHiding,
    tableContainerRef,
    enablePagination,
    itemsTotalCount,
    isLoading,
    isRefetching,
    isEmpty,
    toolbar,
    emptyState,
}) => {
    return (
        <Fragment>
            {tableHeading && (
                <div
                    id="table-heading"
                    className="items-center w-full py-[2px] px-4 text-center shadow-sm text-primary bg-background border-b border-border"
                >
                    <span>{tableHeading}</span>
                </div>
            )}
            {toolbar}
            {enableColumnHiding && !toolbar && (
                <div id="column-hiding" className="flex justify-end px-4 py-1.5 border-b border-border">
                    <ColumnVisibilityDropdown table={table} />
                </div>
            )}
            <div
                ref={tableContainerRef}
                className={cn(
                    'overflow-auto relative h-full min-w-full text-sm border-t',
                    className,
                )}
            >
                <table className={cn('min-w-full', isRefetching && 'opacity-60 animate-pulse')}>
                    {children}
                </table>
                {isEmpty && !isLoading && (emptyState ?? <EmptyResults />)}
            </div>
            {enablePagination && (
                <PaginationV2
                    pagination={{
                        page: table.getState().pagination.pageIndex + 1,
                        pageSize: 50,
                    }}
                    goToPreviousPage={() => table.previousPage()}
                    goToNextPage={() => table.nextPage()}
                    goToPage={() => {}}
                    setPageSize={() => {}}
                    resetPagination={() => {}}
                    totalPages={table.getPageCount()}
                    isFirstPage={!table.getCanPreviousPage()}
                    isLastPage={!table.getCanNextPage()}
                    fromItem={
                        itemsTotalCount === 0 ? 0 : table.getState().pagination.pageIndex * 50 + 1
                    }
                    toItem={Math.min(
                        (table.getState().pagination.pageIndex + 1) * 50,
                        itemsTotalCount || 0,
                    )}
                    total={itemsTotalCount || 0}
                    showPageSizeSelector={false}
                />
            )}
        </Fragment>
    )
}
