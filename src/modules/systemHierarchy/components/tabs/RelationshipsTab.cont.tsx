import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

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
}

const DIRECTION_LABELS: Record<
    string,
    { inbound: string; outbound: string }
> = {
    [RELATIONSHIP_TYPES.IS_COOLED_BY]: {
        inbound: 'systemHierarchy.relationships.cooledBy',
        outbound: 'systemHierarchy.relationships.cools',
    },
    [RELATIONSHIP_TYPES.IS_POWERED_BY]: {
        inbound: 'systemHierarchy.relationships.poweredBy',
        outbound: 'systemHierarchy.relationships.powers',
    },
    [RELATIONSHIP_TYPES.IS_CONTROLLED_BY]: {
        inbound: 'systemHierarchy.relationships.controlledBy',
        outbound: 'systemHierarchy.relationships.controls',
    },
    [RELATIONSHIP_TYPES.IS_SPARE_FOR]: {
        inbound: 'systemHierarchy.relationships.spareFor',
        outbound: 'systemHierarchy.relationships.hasSpare',
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
}> = ({ row, itemUsage, onNavigate }) => {
    const { formatMessage: fm } = useIntl()
    const color = getRelationshipColor(row.edge.relationship)
    const labelId = getRelationshipLabel(row.edge.relationship, row.direction)

    return (
        <div className="flex items-center gap-3 py-1.5">
            <span
                className="text-xs font-medium min-w-[100px] text-right"
                style={{ color }}
            >
                {fm({ id: labelId })}
            </span>
            <span className="text-muted-foreground text-xs">{'──→'}</span>
            <button
                type="button"
                onClick={() => onNavigate(row.node.uid)}
                className={cn(
                    'inline-flex items-center gap-1.5 rounded-full',
                    'bg-muted px-3 py-1 text-sm',
                    'cursor-pointer hover:bg-accent transition-colors',
                )}
            >
                <IconCell itemUsageUid={itemUsage} />
                <span className="font-medium">{row.node.name}</span>
                {row.node.systemCode && (
                    <span className="text-muted-foreground text-xs">
                        {'· '}
                        {row.node.systemCode}
                    </span>
                )}
            </button>
        </div>
    )
}

export const RelationshipsTabContainer: FC<RelationshipsTabProps> = ({ system }) => {
    const { formatMessage: fm } = useIntl()
    const { selectLeaf } = useHierarchyNavigation()
    const { inbound, outbound, relatedUids, hasRelationships, isLoading } =
        useSystemRelationships(system.uid)
    const { itemUsageMap } = useRelationshipItemUsage(relatedUids)

    if (isLoading) {
        return (
            <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-8 w-56" />
            </div>
        )
    }

    if (!hasRelationships) {
        return (
            <div className="p-4 text-sm text-muted-foreground">
                {fm({ id: message.systemHierarchy.relationships.noRelationships })}
            </div>
        )
    }

    return (
        <div className="p-4 space-y-6">
            {inbound.length > 0 && (
                <section>
                    <div className="flex items-center gap-2 mb-3">
                        <ArrowDownLeft className="h-4 w-4 text-muted-foreground" />
                        <h3 className="text-sm font-semibold text-muted-foreground">
                            {fm({ id: message.systemHierarchy.relationships.inbound })}
                        </h3>
                    </div>
                    <div className="space-y-1 ml-6">
                        {inbound.map(row => (
                            <RelationshipRowItem
                                key={row.edge.uid}
                                row={row}
                                itemUsage={itemUsageMap[row.node.uid]}
                                onNavigate={selectLeaf}
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
                    <div className="space-y-1 ml-6">
                        {outbound.map(row => (
                            <RelationshipRowItem
                                key={row.edge.uid}
                                row={row}
                                itemUsage={itemUsageMap[row.node.uid]}
                                onNavigate={selectLeaf}
                            />
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
