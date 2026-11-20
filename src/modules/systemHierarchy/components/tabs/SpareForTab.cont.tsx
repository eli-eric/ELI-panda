import { ArrowRight } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { SpareRelationshipDeleteButton } from '@/modules/shared/system/use-spare/components/spare-relationship-delete-button.comp'
import { IconCell } from '@/modules/systems/components/table/cells/IconCell'
import type { ITEM_USAGE } from '@/modules/systems/types/constants'
import { ROLE } from '@/types/constants/roles'

import { useSystemDetail } from '../../hooks/queries/useSystemDetail'
import { useHierarchyNavigation } from '../../hooks/useHierarchyNavigation'
import type { SystemLeaf } from '../../types'
import { hasSpareFor } from '../../utils/predicates'

interface SpareForTabProps {
    system: SystemLeaf
}

export const SpareForTabContainer: FC<SpareForTabProps> = ({ system }) => {
    const { formatMessage: fm } = useIntl()
    const { selectLeaf } = useHierarchyNavigation()
    const canEdit = !!usePermission([ROLE.SYSTEM_EDIT])
    const { sparePartsForSystems, isLoading, error, refetch } = useSystemDetail(
        hasSpareFor(system) ? system.uid : null,
    )

    if (!hasSpareFor(system)) {
        return (
            <div className="p-4 text-sm text-muted-foreground">
                {fm({ id: message.systemHierarchy.spareFor.noSpareFor })}
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="p-4 space-y-3">
                <Skeleton className="h-6 w-48" />
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

    if (sparePartsForSystems.length === 0) {
        return (
            <div className="p-4 text-sm text-muted-foreground">
                {fm({ id: message.systemHierarchy.spareFor.noSpareFor })}
            </div>
        )
    }

    return (
        <div className="p-4 space-y-1">
            <h3 className="text-sm font-semibold mb-3">
                {fm({ id: message.systemHierarchy.spareFor.title })}
            </h3>
            <div className="space-y-1">
                {sparePartsForSystems.map(row => (
                        <div
                            key={row.uid}
                            className={cn(
                                'flex items-center gap-2 rounded-md px-2 py-1.5',
                                'hover:bg-accent transition-colors',
                            )}
                        >
                            <button
                                type="button"
                                onClick={() => selectLeaf(row.uid)}
                                className={cn(
                                    'flex items-center gap-2 flex-1 min-w-0 text-left',
                                    'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded',
                                )}
                            >
                                <IconCell
                                    itemUsageUid={row.physicalItem?.itemUsage?.uid as ITEM_USAGE}
                                />
                                <span className="font-medium truncate">{row.name}</span>
                                {row.physicalItem?.eun && (
                                    <Badge variant="secondary" className="text-[10px] shrink-0">
                                        {row.physicalItem.eun}
                                    </Badge>
                                )}
                                <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0 ml-auto" />
                            </button>
                            <SpareRelationshipDeleteButton
                                currentSystemUid={system.uid}
                                relatedSystemUid={row.uid}
                                direction="outbound"
                                canEdit={canEdit}
                            />
                        </div>
                    ))}
            </div>
        </div>
    )
}
