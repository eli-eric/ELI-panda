import type { FC, KeyboardEvent } from 'react'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import type { PandaTableSettings } from '@/modules/shared/table/pandaTable/PandaTable'
import { PandaTableV2 } from '@/modules/shared/table/pandaTableV2/PandaTableV2'
import { getFontBySystemLevel } from '@/utils/systemLevel'

import { useSystemDetail } from '../../hooks/queries/useSystemDetail'
import { useHierarchyNavigation } from '../../hooks/useHierarchyNavigation'
import type { SystemLeaf } from '../../types'
import { hasSpareParts } from '../../utils/predicates'
import { useSparePartsTabColumns } from './SparePartsTab.columns'
import type { SparePartEdge } from './SparePartsTab.types'

const SPARE_PARTS_TAB_TABLE_ID = 'systemHierarchySpareParts'

const TABLE_SETTINGS: PandaTableSettings<SparePartEdge> = {
    enableSorting: true,
    enableColumnHiding: true,
    enableColumnReordering: true,
}

const getCoverageColorClass = (sum: number | null, min: number | null): string => {
    if (!min) return 'text-gray-500 dark:text-gray-300'
    return (sum ?? 0) < min
        ? 'text-red-500 dark:text-red-500'
        : 'text-green-500 dark:text-green-500'
}

interface SparePartsTabProps {
    system: SystemLeaf
}

export const SparePartsTabContainer: FC<SparePartsTabProps> = ({ system }) => {
    const { formatMessage: fm } = useIntl()
    const { selectLeaf } = useHierarchyNavigation()
    const columns = useSparePartsTabColumns()

    const {
        sparePartsEdges,
        sparePartsCoverageSum,
        minimalSpareParstCount,
        isLoading,
        error,
        refetch,
    } = useSystemDetail(hasSpareParts(system) ? system.uid : null)

    const edges: SparePartEdge[] = sparePartsEdges

    const table = usePandaTable<SparePartEdge>({
        tableId: SPARE_PARTS_TAB_TABLE_ID,
        columns,
        data: edges,
        settings: TABLE_SETTINGS,
    })

    // Seed DnD reordering baseline on first mount only; don't overwrite persisted order.
    // Re-seed if column count drifts (columns added/removed between versions).
    useEffect(() => {
        const allIds = table.getAllLeafColumns().map(column => column.id)
        const current = table.getState().columnOrder
        if (current.length !== allIds.length) {
            table.setColumnOrder(allIds)
        }
    }, [table])

    if (!hasSpareParts(system)) {
        return (
            <div className="p-4 text-sm text-muted-foreground">
                {fm({ id: message.systemHierarchy.spareParts.noSpareParts })}
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="p-4 space-y-3">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-4 space-y-3">
                <p className="text-sm text-muted-foreground">
                    {fm({ id: message.common.errors.somethingWentWrong })}
                </p>
                <Button size="sm" variant="outline" onClick={() => refetch()}>
                    {fm({ id: message.common.buttons.retry })}
                </Button>
            </div>
        )
    }

    if (edges.length === 0) {
        return (
            <div className="p-4 text-sm text-muted-foreground">
                {fm({ id: message.systemHierarchy.spareParts.noSpareParts })}
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between shrink-0 px-4 pt-4 pb-2">
                <h3 className="text-sm font-semibold">
                    {fm({ id: message.systemHierarchy.tabs.spareParts })}
                </h3>
                <h3
                    className={cn(
                        'text-sm font-medium',
                        getCoverageColorClass(sparePartsCoverageSum, minimalSpareParstCount),
                    )}
                >
                    {fm(
                        { id: message.common.systemItem.sparePartsAvailable },
                        {
                            available: (sparePartsCoverageSum ?? 0).toFixed(2),
                            required: String(minimalSpareParstCount ?? 0),
                        },
                    )}
                </h3>
            </div>
            <div className="flex-1 min-h-0 flex flex-col">
                <PandaTableV2<SparePartEdge>
                    data={edges}
                    table={table}
                    tableId={SPARE_PARTS_TAB_TABLE_ID}
                    settings={TABLE_SETTINGS}
                    getRowProps={({ original }) => ({
                        onClick: () => selectLeaf(original.node.uid),
                        onKeyDown: (e: KeyboardEvent<HTMLTableRowElement>) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                selectLeaf(original.node.uid)
                            }
                        },
                        role: 'button',
                        tabIndex: 0,
                        className: cn(
                            'cursor-pointer hover:text-primary hover:bg-primary/10',
                            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                            original.node.physicalItem && 'font-bold',
                            getFontBySystemLevel(original.node.systemLevel ?? undefined),
                        ),
                    })}
                    className="flex-1 min-h-0"
                />
            </div>
        </div>
    )
}
