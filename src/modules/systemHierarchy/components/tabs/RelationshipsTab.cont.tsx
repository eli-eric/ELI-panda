import { ArrowDownLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { IconCell } from '@/modules/systems/components/table/cells/IconCell'
import type { ITEM_USAGE } from '@/modules/systems/types/constants'

import { useRelationshipItemUsage } from '../../hooks/queries/useRelationshipItemUsage'
import type { RelationshipRow } from '../../hooks/queries/useSystemRelationships'
import { useSystemRelationships } from '../../hooks/queries/useSystemRelationships'
import { useHierarchyNavigation } from '../../hooks/useHierarchyNavigation'
import type { SystemLeaf } from '../../types'
import { RELATIONSHIP_TYPES } from '../../types/graph'
import { RELATIONSHIP_COLORS } from '../../utils/graphColors'

interface RelationshipsTabProps {
    system: SystemLeaf
    compact?: boolean
}

const DIRECTION_LABELS: Record<string, { inbound: string; outbound: string }> = {
    [RELATIONSHIP_TYPES.IS_COOLED_BY]: {
        inbound: message.systemHierarchy.relationships.cools,
        outbound: message.systemHierarchy.relationships.cooledBy,
    },
    [RELATIONSHIP_TYPES.IS_POWERED_BY]: {
        inbound: message.systemHierarchy.relationships.powers,
        outbound: message.systemHierarchy.relationships.poweredBy,
    },
    [RELATIONSHIP_TYPES.IS_CONTROLLED_BY]: {
        inbound: message.systemHierarchy.relationships.controls,
        outbound: message.systemHierarchy.relationships.controlledBy,
    },
    [RELATIONSHIP_TYPES.IS_SPARE_FOR]: {
        inbound: message.systemHierarchy.relationships.hasSpare,
        outbound: message.systemHierarchy.relationships.spareFor,
    },
}

const getRelationshipLabel = (relationship: string, direction: 'inbound' | 'outbound'): string => {
    return DIRECTION_LABELS[relationship]?.[direction] ?? relationship
}

const getRelationshipColor = (relationship: string): string =>
    RELATIONSHIP_COLORS[relationship as keyof typeof RELATIONSHIP_COLORS] ?? '#94a3b8'

const RelationshipRowItem: FC<{
    row: RelationshipRow
    itemUsage?: ITEM_USAGE
    onNavigate: (uid: string) => void
    compact?: boolean
}> = ({ row, itemUsage, onNavigate, compact }) => {
    const { formatMessage: fm } = useIntl()
    const color = getRelationshipColor(row.edge.relationship)
    const labelId = getRelationshipLabel(row.edge.relationship, row.direction)

    return (
        <div className={cn('flex items-center py-1.5', compact ? 'gap-2' : 'gap-3')}>
            <span
                className={cn(
                    'text-xs font-medium text-right',
                    compact ? 'min-w-[72px]' : 'min-w-[100px]',
                )}
                style={{ color }}
            >
                {fm({ id: labelId })}
            </span>
            <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
            <button
                type="button"
                onClick={() => onNavigate(row.node.uid)}
                className={cn(
                    'inline-flex items-center gap-1.5 rounded-full min-w-0',
                    'bg-muted px-3 py-1 text-sm',
                    'cursor-pointer hover:bg-accent transition-colors',
                )}
            >
                <IconCell itemUsageUid={itemUsage} />
                <span className="font-medium truncate">{row.node.name}</span>
                {row.node.systemCode && (
                    <span className="text-muted-foreground text-xs truncate">
                        {'· '}
                        {row.node.systemCode}
                    </span>
                )}
            </button>
        </div>
    )
}

export const RelationshipsTabContainer: FC<RelationshipsTabProps> = ({ system, compact }) => {
    const { formatMessage: fm } = useIntl()
    const { selectLeaf } = useHierarchyNavigation()
    const { inbound, outbound, relatedUids, hasRelationships, isLoading, isError, refetch } =
        useSystemRelationships(system.uid)
    const { itemUsageMap } = useRelationshipItemUsage(relatedUids)

    const containerPadding = compact ? 'p-0' : 'p-4'
    const rowIndent = compact ? 'ml-0' : 'ml-6'

    if (isLoading) {
        return (
            <div className={cn(containerPadding, 'space-y-3')}>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-8 w-56" />
            </div>
        )
    }

    if (isError) {
        return (
            <div className={cn(containerPadding, 'space-y-3')}>
                <p className="text-sm text-muted-foreground">
                    {fm({ id: message.common.errors.somethingWentWrong })}
                </p>
                <Button size="sm" variant="outline" onClick={() => refetch()}>
                    {fm({ id: message.common.buttons.retry })}
                </Button>
            </div>
        )
    }

    if (!hasRelationships) {
        return (
            <div className={cn(containerPadding, 'text-sm text-muted-foreground')}>
                {fm({ id: message.systemHierarchy.relationships.noRelationships })}
            </div>
        )
    }

    return (
        <div className={cn(containerPadding, 'space-y-6')}>
            {inbound.length > 0 && (
                <section>
                    <div className="flex items-center gap-2 mb-3">
                        <ArrowDownLeft className="h-4 w-4 text-muted-foreground" />
                        <h3 className="text-sm font-semibold text-muted-foreground">
                            {fm({ id: message.systemHierarchy.relationships.inbound })}
                        </h3>
                    </div>
                    <div className={cn('space-y-1', rowIndent)}>
                        {inbound.map(row => (
                            <RelationshipRowItem
                                key={row.edge.uid}
                                row={row}
                                itemUsage={itemUsageMap[row.node.uid]}
                                onNavigate={selectLeaf}
                                compact={compact}
                            />
                        ))}
                    </div>
                </section>
            )}
            {outbound.length > 0 && (
                <section>
                    <div className="flex items-center gap-2 mb-3">
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                        <h3 className="text-sm font-semibold text-muted-foreground">
                            {fm({ id: message.systemHierarchy.relationships.outbound })}
                        </h3>
                    </div>
                    <div className={cn('space-y-1', rowIndent)}>
                        {outbound.map(row => (
                            <RelationshipRowItem
                                key={row.edge.uid}
                                row={row}
                                itemUsage={itemUsageMap[row.node.uid]}
                                onNavigate={selectLeaf}
                                compact={compact}
                            />
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
