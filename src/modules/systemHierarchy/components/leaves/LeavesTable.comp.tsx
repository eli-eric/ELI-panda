import type { Table } from '@tanstack/react-table'
import type { FC, ReactNode } from 'react'
import { useCallback, useRef, useState } from 'react'
import { useIntl } from 'react-intl'

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { isUnderCovered } from '@/modules/shared/system/coverage'
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
    isInitialLoad: boolean
    onRowClick: (uid: string) => void
    table: Table<SystemLeaf>
    toolbar?: ReactNode
    emptyState?: ReactNode
    canEdit?: boolean
    onDeleteSystem?: (uid: string, name: string) => void
}

export const LeavesTableComponent: FC<LeavesTableProps> = ({
    data,
    totalCount,
    isLoading,
    isInitialLoad,
    onRowClick,
    table,
    toolbar,
    emptyState,
    canEdit = false,
    onDeleteSystem,
}) => {
    const { formatMessage: fm } = useIntl()
    const tableRef = useRef<PandaTableV2Handle>(null)
    const [contextSystem, setContextSystem] = useState<SystemLeaf | null>(null)

    const handlePageChange = useCallback(() => {
        tableRef.current?.scrollToTop()
    }, [])

    const tableContent = (
        <div
            className="flex flex-col h-full"
            data-testid="system-hierarchy-leaves-table"
            onContextMenuCapture={onDeleteSystem ? () => setContextSystem(null) : undefined}
        >
            <div className="flex-1 min-h-0 flex flex-col">
                <PandaTableV2
                    ref={tableRef}
                    data={isInitialLoad ? undefined : data}
                    table={table}
                    loading={isLoading}
                    tableId={LEAVES_TABLE_ID}
                    skeletonRowCount={25}
                    getRowProps={({ original }) => ({
                        onClick: () => onRowClick(original.uid),
                        onContextMenu: onDeleteSystem
                            ? () => setContextSystem(original)
                            : undefined,
                        className: cn(
                            'cursor-pointer hover:text-primary hover:bg-primary/10',
                            isUnderCovered(original.statistics) &&
                                'text-red-500 dark:text-red-500 font-bold',
                        ),
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

    // Only wrap in a context menu when there's an action — otherwise the trigger
    // would suppress the native right-click menu without offering anything.
    if (!onDeleteSystem) return tableContent

    return (
        <ContextMenu
            onOpenChange={open => {
                if (!open) setContextSystem(null)
            }}
        >
            <ContextMenuTrigger asChild>{tableContent}</ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem
                    disabled={!canEdit || !contextSystem}
                    className="text-destructive focus:text-destructive"
                    data-testid="context-delete-system"
                    onSelect={() =>
                        contextSystem && onDeleteSystem(contextSystem.uid, contextSystem.name)
                    }
                >
                    {fm({ id: message.systemHierarchy.delete.menuItem })}
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}
