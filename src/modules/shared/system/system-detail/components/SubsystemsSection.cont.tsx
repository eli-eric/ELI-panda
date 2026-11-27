import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { IconCell } from '@/modules/systems/components/table/cells/IconCell'
import type { ITEM_USAGE } from '@/modules/systems/types/constants'
import { getBadgeVariantBySystemLevel } from '@/utils/systemLevel'

import { useSystemSubsystems } from '../hooks/queries/useSystemSubsystems'

interface SubsystemsSectionProps {
    systemUid: string
    onSelectSystem?: (uid: string) => void
}

/** Direct children of a system (GET /system/:uid/subsystems). */
export const SubsystemsSection: FC<SubsystemsSectionProps> = ({ systemUid, onSelectSystem }) => {
    const { formatMessage: fm } = useIntl()
    const { data: subsystems = [], isLoading } = useSystemSubsystems(systemUid)

    if (isLoading) return <Skeleton className="h-16 w-full" />
    if (subsystems.length === 0) {
        return (
            <p className="text-sm text-muted-foreground">
                {fm({ id: message.systemHierarchy.subsystems.empty })}
            </p>
        )
    }

    return (
        <div className="space-y-0.5" data-testid="subsystems-section">
            {subsystems.map(subsystem => (
                <button
                    key={subsystem.uid}
                    type="button"
                    onClick={() => onSelectSystem?.(subsystem.uid)}
                    disabled={!onSelectSystem}
                    className={cn(
                        'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm',
                        'hover:bg-accent transition-colors',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                        onSelectSystem && 'cursor-pointer',
                    )}
                >
                    <IconCell itemUsageUid={subsystem.physicalItem?.itemUsage?.uid as ITEM_USAGE} />
                    <span className="font-medium truncate">{subsystem.name}</span>
                    {subsystem.systemCode && (
                        <span className="text-xs text-muted-foreground truncate">
                            {subsystem.systemCode}
                        </span>
                    )}
                    {subsystem.systemLevel && (
                        <Badge
                            variant="outline"
                            className={cn(
                                'ml-auto text-[10px] shrink-0',
                                getBadgeVariantBySystemLevel(subsystem.systemLevel),
                            )}
                        >
                            {fm({
                                id: message.systemHierarchy.systemLevels[subsystem.systemLevel],
                            })}
                        </Badge>
                    )}
                </button>
            ))}
        </div>
    )
}
