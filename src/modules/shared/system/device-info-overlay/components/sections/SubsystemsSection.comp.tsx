import {
    type ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type PaginationState,
    type SortingState,
    useReactTable,
} from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { ExternalLink } from 'lucide-react'
import { type FC, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'

import { Disclosure } from '@/components/ui'
import { Badge } from '@/components/ui/badge'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { useSystemStore } from '@/modules/shared/system/device-info-overlay/store/useShowDeviceStore'
import { fuzzyFilter } from '@/modules/shared/table/pandaTable/utils'
import type { TableSystem } from '@/modules/systemItem/components/subsystems/types'
import { IconCell } from '@/modules/systems/components/table/cells/IconCell'
import type { ITEM_USAGE } from '@/modules/systems/types/constants'
import type { SystemLevel } from '@/types/gql/graphql'

interface SubsystemsSectionProps {
    systemDetail: any
    withDirtyProtection?: <T extends any[]>(callback: (...args: T) => void) => (...args: T) => void
}

export const SubsystemsSection: FC<SubsystemsSectionProps> = ({
    systemDetail,
    withDirtyProtection,
}) => {
    const { formatMessage: fm } = useIntl()
    const { setUID } = useSystemStore()
    const [sorting, setSorting] = useState<SortingState>([])
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })
    const [globalFilter, setGlobalFilter] = useState('')

    const handleSystemRedirect = (uid: string) => {
        if (withDirtyProtection) {
            withDirtyProtection(() => setUID(uid))()
        } else {
            setUID(uid)
        }
    }

    const columns = useMemo((): ColumnDef<TableSystem, any>[] => {
        return [
            {
                id: 'subsystem',
                accessorFn: row => row.name,
                header: fm({ id: message.common.systemOverlay.subsystem }),
                cell: ({ row }) => row.original,
            },
        ]
    }, [fm])

    const table = useReactTable({
        data: systemDetail?.subSystems || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        onGlobalFilterChange: setGlobalFilter,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            sorting,
            pagination,
            globalFilter,
        },
    })

    const getSystemLevelColors = (systemLevel: SystemLevel | null | undefined) => {
        if (systemLevel === 'KEY_SYSTEMS') {
            return 'text-orange-600 dark:text-orange-400'
        }
        if (systemLevel === 'TECHNOLOGY_UNIT') {
            return 'text-lime-600 dark:text-lime-400'
        }
        // Default link color for other system levels
        return 'text-link'
    }

    if (!systemDetail?.subSystems || systemDetail.subSystems.length === 0) {
        return null
    }

    const totalPages = table.getPageCount()
    const currentPage = table.getState().pagination.pageIndex + 1

    return (
        <Disclosure
            title={`Subsystems (${systemDetail.subSystems.length})`}
            defaultOpen={false}
            className="w-full border rounded-md overflow-hidden shadow-md"
            buttonClassName="bg-blue-50 dark:bg-blue-900/20"
            panelClassName="px-3 py-3 space-y-2"
            transparentButton={false}
        >
            {/* Search/Filter */}
            <div className="mb-3">
                <input
                    type="text"
                    placeholder={fm({
                        id: message.common.systemOverlay.filterSubsystems,
                    })}
                    value={globalFilter}
                    onChange={e => setGlobalFilter(e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            {/* Subsystems List */}
            <div className="space-y-1">
                {table.getRowModel().rows.map(row => {
                    const subsystem = row.original
                    const { physicalItem, name, uid, sp_coverage, systemLevel } = subsystem

                    return (
                        <button
                            key={uid}
                            onClick={() => handleSystemRedirect(uid)}
                            className="flex justify-between text-xs px-2 py-1 rounded-md transition-all duration-200 hover:bg-link/5 hover:border-link/20 border border-transparent cursor-pointer group w-full"
                        >
                            <div className="flex items-center space-x-2 flex-1 min-w-0">
                                <div className={cn('w-4 h-4 shrink-0 rounded-sm')}>
                                    <IconCell
                                        itemUsageUid={physicalItem?.itemUsage?.uid as ITEM_USAGE}
                                    />
                                </div>
                                <span
                                    className={cn(
                                        'font-medium transition-colors truncate',
                                        physicalItem && 'font-bold',
                                        getSystemLevelColors(systemLevel as SystemLevel),
                                    )}
                                >
                                    {name}
                                </span>
                                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-link/70 shrink-0" />
                            </div>

                            {/* Spare Parts Coverage Badge */}
                            {sp_coverage !== null && sp_coverage !== undefined && (
                                <div className="flex items-center space-x-1">
                                    <Badge
                                        className={`text-[10px] ${
                                            sp_coverage < 1
                                                ? 'bg-red-100 dark:bg-red-600 text-red-800 dark:text-red-100'
                                                : 'bg-green-100 dark:bg-green-600 text-green-800 dark:text-green-100'
                                        }`}
                                    >
                                        {fm(
                                            { id: message.common.systemOverlay.coveragePercent },
                                            { percent: (sp_coverage * 100).toFixed(1) },
                                        )}
                                    </Badge>
                                </div>
                            )}
                        </button>
                    )
                })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        {fm(
                            { id: message.common.systemOverlay.showingSubsystems },
                            {
                                shown: table.getRowModel().rows.length,
                                total: table.getFilteredRowModel().rows.length,
                            },
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>

                        <div className="flex items-center space-x-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                                if (
                                    page === 1 ||
                                    page === totalPages ||
                                    (page >= currentPage - 1 && page <= currentPage + 1)
                                ) {
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => table.setPageIndex(page - 1)}
                                            className={`px-2 py-1 text-xs rounded ${
                                                page === currentPage
                                                    ? 'bg-blue-500 text-white'
                                                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    )
                                } else if (page === currentPage - 2 || page === currentPage + 2) {
                                    return (
                                        <MoreHorizontal
                                            key={page}
                                            className="h-4 w-4 text-gray-400 dark:text-gray-500"
                                        />
                                    )
                                }
                                return null
                            })}
                        </div>

                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}
        </Disclosure>
    )
}
