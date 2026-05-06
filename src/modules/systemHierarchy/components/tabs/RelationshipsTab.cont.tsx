import { ArrowDownLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { IconCell } from '@/modules/systems/components/table/cells/IconCell'
import type { ITEM_USAGE } from '@/modules/systems/types/constants'
import { ROLE } from '@/types/constants/roles'

import { useRelationshipItemUsage } from '../../hooks/queries/useRelationshipItemUsage'
import type { RelationshipRow } from '../../hooks/queries/useSystemRelationships'
import { useSystemRelationships } from '../../hooks/queries/useSystemRelationships'
import { useHierarchyNavigation } from '../../hooks/useHierarchyNavigation'
import type { SystemLeaf } from '../../types'
import { getRelationshipDirectionLabel, RELATIONSHIP_COLORS } from '../../types/graph'
import { DeleteRelationshipButton } from '../relationships/DeleteRelationshipButton.comp'

interface RelationshipsTabProps {
    system: SystemLeaf
    compact?: boolean
}

const getRelationshipLabel = (relationship: string, direction: 'inbound' | 'outbound'): string =>
    getRelationshipDirectionLabel(relationship, direction) ?? relationship

const getRelationshipColor = (relationship: string): string =>
    RELATIONSHIP_COLORS[relationship as keyof typeof RELATIONSHIP_COLORS] ?? '#94a3b8'

const RelationshipRowItem: FC<{
    row: RelationshipRow
    itemUsage?: ITEM_USAGE
    onNavigate: (uid: string) => void
    compact?: boolean
    canEdit?: boolean
    currentSystemUid: string
}> = ({ row, itemUsage, onNavigate, compact, canEdit, currentSystemUid }) => {
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
            {canEdit && (
                <div className="ml-auto shrink-0">
                    <DeleteRelationshipButton
                        currentSystemUid={currentSystemUid}
                        relatedSystemUid={row.node.uid}
                        relationshipType={row.edge.relationship}
                        direction={row.direction}
                    />
                </div>
            )}
        </div>
    )
}

export const RelationshipsTabContainer: FC<RelationshipsTabProps> = ({ system, compact }) => {
    const { formatMessage: fm } = useIntl()
    const { selectLeaf } = useHierarchyNavigation()
    const canEdit = usePermission([ROLE.SYSTEM_EDIT])
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
                                canEdit={canEdit}
                                currentSystemUid={system.uid}
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
                                canEdit={canEdit}
                                currentSystemUid={system.uid}
                            />
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
