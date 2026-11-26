import { ArrowRight } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { usePermission } from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { SpareRelationshipDeleteButton } from '@/modules/shared/system/use-spare/components/spare-relationship-delete-button.comp'
import { IconCell } from '@/modules/systems/components/table/cells/IconCell'
import type { ITEM_USAGE } from '@/modules/systems/types/constants'
import { ROLE } from '@/types/constants/roles'

import { useSystemSpareParts } from '../hooks/queries/useSystemSpareParts'
import type { SpareRelation } from '../types'
import { SparePartActions } from './SparePartActions.comp'

export type SpareRelationsMode = 'spareParts' | 'spareFor'

const getCoverageColorClass = (sum: number | null, min: number | null): string => {
    if (!min) return 'text-muted-foreground'
    return (sum ?? 0) < min ? 'text-red-500' : 'text-green-600 dark:text-green-500'
}

interface SpareRelationRowProps {
    relation: SpareRelation
    mode: SpareRelationsMode
    currentSystemUid: string
    canEdit: boolean
    onSelectSystem?: (uid: string) => void
}

const SpareRelationRow: FC<SpareRelationRowProps> = ({
    relation,
    mode,
    currentSystemUid,
    canEdit,
    onSelectSystem,
}) => {
    const { system, coverage } = relation
    return (
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent transition-colors">
            <button
                type="button"
                onClick={() => onSelectSystem?.(system.uid)}
                disabled={!onSelectSystem}
                className={cn(
                    'flex items-center gap-2 flex-1 min-w-0 text-left rounded',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                    onSelectSystem && 'cursor-pointer',
                )}
            >
                <IconCell itemUsageUid={system.physicalItem?.itemUsage?.uid as ITEM_USAGE} />
                <span className="font-medium truncate">{system.name}</span>
                {mode === 'spareParts' && (
                    <Badge variant="secondary" className="text-[10px] shrink-0">
                        {Number(coverage ?? 0).toFixed(2)}
                    </Badge>
                )}
                {system.physicalItem?.eun && (
                    <Badge variant="outline" className="text-[10px] shrink-0">
                        {system.physicalItem.eun}
                    </Badge>
                )}
                {mode === 'spareFor' && (
                    <ArrowRight className="size-3 text-muted-foreground shrink-0 ml-auto" />
                )}
            </button>
            {mode === 'spareParts' ? (
                <SparePartActions
                    node={system}
                    currentSystemUid={currentSystemUid}
                    canEdit={canEdit}
                />
            ) : (
                <SpareRelationshipDeleteButton
                    currentSystemUid={currentSystemUid}
                    relatedSystemUid={system.uid}
                    direction="outbound"
                    canEdit={canEdit}
                />
            )}
        </div>
    )
}

interface SpareRelationsSectionProps {
    systemUid: string
    mode: SpareRelationsMode
    onSelectSystem?: (uid: string) => void
    showHeader?: boolean
}

/**
 * Spare parts of a system (`spareParts`, inbound IS_SPARE_FOR, with coverage) or
 * the systems it is a spare for (`spareFor`, outbound). Shared by the explorer tabs
 * and the Edit System sheet.
 */
export const SpareRelationsSection: FC<SpareRelationsSectionProps> = ({
    systemUid,
    mode,
    onSelectSystem,
    showHeader = true,
}) => {
    const { formatMessage: fm } = useIntl()
    const canEdit = !!usePermission([ROLE.SYSTEM_EDIT])
    const { data, isLoading, error, refetch } = useSystemSpareParts(systemUid)

    if (isLoading) {
        return (
            <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                    {fm({ id: message.common.errors.somethingWentWrong })}
                </p>
                <Button size="sm" variant="outline" onClick={() => refetch()}>
                    {fm({ id: message.common.buttons.retry })}
                </Button>
            </div>
        )
    }

    const relations = (mode === 'spareParts' ? data?.spareParts : data?.spareFor) ?? []
    if (relations.length === 0) {
        return (
            <p className="text-sm text-muted-foreground">
                {fm({
                    id:
                        mode === 'spareParts'
                            ? message.systemHierarchy.spareParts.noSpareParts
                            : message.systemHierarchy.spareFor.noSpareFor,
                })}
            </p>
        )
    }

    return (
        <div className="space-y-1" data-testid={`spare-relations-${mode}`}>
            {showHeader && (
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold">
                        {fm({
                            id:
                                mode === 'spareParts'
                                    ? message.systemHierarchy.tabs.spareParts
                                    : message.systemHierarchy.spareFor.title,
                        })}
                    </h3>
                    {mode === 'spareParts' && (
                        <span
                            className={cn(
                                'text-sm font-medium',
                                getCoverageColorClass(
                                    data?.sparePartsCoverageSum ?? null,
                                    data?.minimalSpareParstCount ?? null,
                                ),
                            )}
                        >
                            {fm(
                                { id: message.common.systemItem.sparePartsAvailable },
                                {
                                    available: (data?.sparePartsCoverageSum ?? 0).toFixed(2),
                                    required: String(data?.minimalSpareParstCount ?? 0),
                                },
                            )}
                        </span>
                    )}
                </div>
            )}
            {relations.map(relation => (
                <SpareRelationRow
                    key={relation.system.uid}
                    relation={relation}
                    mode={mode}
                    currentSystemUid={systemUid}
                    canEdit={canEdit}
                    onSelectSystem={onSelectSystem}
                />
            ))}
        </div>
    )
}
