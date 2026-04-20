import { FilePlus2, Pencil, Trash2 } from 'lucide-react'
import type { FC, ReactNode } from 'react'
import type { IntlShape } from 'react-intl'
import { FormattedDate, FormattedTime, useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import type {
    ChangeValue,
    FieldChangeEntry,
} from '@/modules/systemItem/types/responses'

import type { CatalogueHistoryEntry } from '../../hooks/queries/useCatalogueItemHistory'

interface Props {
    entries: CatalogueHistoryEntry[]
    isLoading: boolean
    error?: Error | null
}

const actionVisual = (action: string) => {
    switch (action) {
        case 'INSERT':
        case 'CREATE':
            return {
                icon: FilePlus2,
                iconClassName: 'text-emerald-500',
                badgeClassName: 'border-emerald-500/60 text-emerald-600',
            }
        case 'DELETE':
            return {
                icon: Trash2,
                iconClassName: 'text-destructive',
                badgeClassName: 'border-destructive/60 text-destructive',
            }
        default:
            return {
                icon: Pencil,
                iconClassName: 'text-primary',
                badgeClassName: 'border-primary/60 text-primary',
            }
    }
}

const formatChangeValue = (
    value: ChangeValue | null,
    fm: IntlShape['formatMessage'],
): string => {
    if (value === null || value === undefined)
        return fm({ id: message.systemHierarchy.history.diff.emptyValue })
    if (typeof value === 'object') return value.name
    if (typeof value === 'boolean') return String(value)
    return String(value)
}

const diffValues = { b: (chunks: ReactNode) => <strong>{chunks}</strong> }

const FieldDiff: FC<{ entry: FieldChangeEntry; fm: IntlShape['formatMessage'] }> = ({
    entry,
    fm,
}) => {
    const hasOld = entry.oldValue !== null && entry.oldValue !== undefined
    const hasNew = entry.newValue !== null && entry.newValue !== undefined

    if (!hasNew && hasOld) {
        return (
            <span>
                {fm(
                    { id: message.systemHierarchy.history.diff.cleared },
                    { ...diffValues, field: entry.field },
                )}
            </span>
        )
    }

    if (!hasOld && hasNew) {
        return (
            <span>
                {fm(
                    { id: message.systemHierarchy.history.diff.set },
                    {
                        ...diffValues,
                        field: entry.field,
                        newValue: formatChangeValue(entry.newValue, fm),
                    },
                )}
            </span>
        )
    }

    return (
        <span>
            {fm(
                { id: message.systemHierarchy.history.diff.changed },
                {
                    ...diffValues,
                    field: entry.field,
                    oldValue: formatChangeValue(entry.oldValue, fm),
                    newValue: formatChangeValue(entry.newValue, fm),
                },
            )}
        </span>
    )
}

export const HistoryList: FC<Props> = ({ entries, isLoading, error }) => {
    const { formatMessage: fm } = useIntl()

    if (isLoading) {
        return <div className="p-4 text-sm text-muted-foreground">Loading history...</div>
    }
    if (error) {
        return <div className="p-4 text-sm text-destructive">Failed to load history.</div>
    }
    if (entries.length === 0) {
        return <div className="p-4 text-sm text-muted-foreground">No history yet.</div>
    }
    return (
        <div className="h-full overflow-y-auto scrollbar-style px-4 pb-8 pt-3">
            <ul className="overflow-hidden rounded-lg border border-border/70 bg-card/40">
                {entries.map((entry, idx) => {
                    const visual = actionVisual(entry.action)
                    const Icon = visual.icon
                    return (
                        <li
                            key={`${entry.at}-${idx}`}
                            className="grid grid-cols-[auto_1fr_auto] gap-3 border-b border-border/60 px-3 py-2.5 last:border-b-0 hover:bg-accent/25"
                        >
                            <div className="mt-0.5 flex size-7 items-center justify-center rounded-md bg-muted/70">
                                <Icon className={cn('size-3.5', visual.iconClassName)} />
                            </div>
                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm font-medium leading-5 text-foreground">
                                        {entry.user?.fullName ?? 'System'}
                                    </span>
                                    <Badge
                                        variant="outline"
                                        className={cn(
                                            'h-5 rounded px-1.5 text-[10px] font-medium tracking-wide uppercase',
                                            visual.badgeClassName,
                                        )}
                                    >
                                        {entry.action}
                                    </Badge>
                                </div>
                                {entry.changes.length > 0 && (
                                    <p className="mt-0.5 flex flex-col gap-0.5 break-words pr-2 text-sm leading-5 text-muted-foreground">
                                        {entry.changes.map((e, i) => (
                                            <FieldDiff
                                                key={`${e.field}-${i}`}
                                                entry={e}
                                                fm={fm}
                                            />
                                        ))}
                                    </p>
                                )}
                            </div>
                            <time
                                dateTime={entry.at}
                                className="pt-0.5 text-right text-xs leading-5 text-muted-foreground whitespace-nowrap"
                            >
                                <FormattedDate
                                    value={entry.at}
                                    day="2-digit"
                                    month="short"
                                    year="numeric"
                                />
                                {' · '}
                                <FormattedTime value={entry.at} />
                            </time>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
