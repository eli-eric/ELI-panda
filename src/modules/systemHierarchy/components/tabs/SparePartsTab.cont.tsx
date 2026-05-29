import type { FC, KeyboardEvent } from 'react'
import { useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { IconCell } from '@/modules/systems/components/table/cells/IconCell'
import type { ITEM_USAGE } from '@/modules/systems/types/constants'
import { ROLE } from '@/types/constants/roles'

import { useSystemDetail } from '../../hooks/queries/useSystemDetail'
import { useHierarchyNavigation } from '../../hooks/useHierarchyNavigation'
import type { SystemLeaf } from '../../types'
import { hasSpareParts } from '../../utils/predicates'
import { SparePartActions } from './SparePartActions.comp'

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
    const canEdit = !!usePermission([ROLE.SYSTEM_EDIT])

    const {
        sparePartsEdges,
        sparePartsCoverageSum,
        minimalSpareParstCount,
        isLoading,
        error,
        refetch,
    } = useSystemDetail(hasSpareParts(system) ? system.uid : null)

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

    if (sparePartsEdges.length === 0) {
        return (
            <div className="p-4 text-sm text-muted-foreground">
                {fm({ id: message.systemHierarchy.spareParts.noSpareParts })}
            </div>
        )
    }

    return (
        <div className="p-4 space-y-1">
            <div className="flex items-center justify-between mb-3">
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
            <div className="space-y-1">
                {sparePartsEdges.map(edge => {
                    const { node, coverage } = edge
                    const handleNavigate = () => selectLeaf(node.uid)
                    return (
                        <div
                            key={node.uid}
                            className={cn(
                                'flex items-center gap-2 rounded-md px-2 py-1.5',
                                'hover:bg-accent transition-colors',
                            )}
                        >
                            <button
                                type="button"
                                onClick={handleNavigate}
                                onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault()
                                        handleNavigate()
                                    }
                                }}
                                className={cn(
                                    'flex items-center gap-2 flex-1 min-w-0 text-left',
                                    'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded',
                                )}
                            >
                                <IconCell
                                    itemUsageUid={node.physicalItem?.itemUsage?.uid as ITEM_USAGE}
                                />
                                <span className="font-medium truncate">{node.name}</span>
                                <Badge variant="secondary" className="text-[10px] shrink-0">
                                    {Number(coverage ?? 0).toFixed(2)}
                                </Badge>
                                {node.physicalItem?.eun && (
                                    <Badge variant="outline" className="text-[10px] shrink-0">
                                        {node.physicalItem.eun}
                                    </Badge>
                                )}
                            </button>
                            <SparePartActions
                                node={node}
                                currentSystemUid={system.uid}
                                canEdit={canEdit}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
