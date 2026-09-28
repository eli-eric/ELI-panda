import { ArrowRight, TriangleAlert } from 'lucide-react'
import { useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'

import { displayWosValue } from '../../utils/wos-import'
import type { WosFieldRow } from '../hooks/useWosFieldRows'

const wosMessages = message.publication.wos

const WARNING_LABEL_IDS: Record<string, string> = {
    DATE_DAY_MISSING: wosMessages.warnings.dateDayMissing,
    VOLUME_NOT_NUMERIC: wosMessages.warnings.volumeNotNumeric,
    ISSUE_NOT_NUMERIC: wosMessages.warnings.issueNotNumeric,
}

/** Long values stay two lines tall; the full text lives in the tooltip. */
const ClampedValue = ({ text, className }: { text: string; className?: string }) => (
    <span title={text} className={cn('line-clamp-2 break-words', className)}>
        {text}
    </span>
)

interface Props {
    row: WosFieldRow
    label: string
    checked: boolean
    disabled: boolean
    onToggle: (checked: boolean) => void
}

export const WosFieldRowComponent = ({ row, label, checked, disabled, onToggle }: Props) => {
    const { formatMessage: fm } = useIntl()
    const emptyLabel = fm({ id: wosMessages.empty })
    const checkboxId = `wos-import-field-${row.field}`
    const importable = row.status === 'empty' || row.status === 'overwrite'
    // A warning-only row has no mapped value; show what WoS actually said.
    const incoming =
        row.status === 'warningOnly'
            ? (row.warnings.find(warning => warning.raw)?.raw ?? emptyLabel)
            : displayWosValue(row.incoming, emptyLabel)

    return (
        <li
            className={cn(
                'grid grid-cols-[1rem_minmax(8rem,12rem)_minmax(0,1fr)_1rem_minmax(0,1fr)] items-start gap-x-3 py-1.5 text-sm',
                row.status === 'overwrite' && 'bg-amber-50 dark:bg-amber-950/30',
                row.status === 'same' && 'text-muted-foreground',
            )}
            data-testid={`wos-field-row-${row.field}`}
        >
            {importable ? (
                <Checkbox
                    id={checkboxId}
                    aria-label={fm({ id: wosMessages.importField }, { field: label })}
                    checked={checked}
                    disabled={disabled}
                    onCheckedChange={value => onToggle(value === true)}
                />
            ) : (
                <span aria-hidden="true" />
            )}
            <Label htmlFor={importable ? checkboxId : undefined} className="leading-5">
                {label}
            </Label>
            <ClampedValue
                text={displayWosValue(row.current, emptyLabel)}
                className="text-muted-foreground"
            />
            <ArrowRight className="mt-0.5 size-4 text-muted-foreground" aria-hidden="true" />
            <div className="min-w-0 space-y-1">
                <ClampedValue
                    text={incoming}
                    className={cn(row.status === 'warningOnly' && 'line-through')}
                />
                <div className="flex flex-wrap gap-1">
                    {row.status === 'overwrite' && (
                        <Badge
                            variant="outline"
                            className="border-amber-600 text-amber-800 dark:text-amber-300"
                        >
                            <TriangleAlert aria-hidden="true" />
                            {fm({ id: wosMessages.overwrites })}
                        </Badge>
                    )}
                    {row.status === 'same' && (
                        <Badge variant="outline">{fm({ id: wosMessages.unchanged })}</Badge>
                    )}
                    {row.status === 'warningOnly' && (
                        <Badge variant="outline">{fm({ id: wosMessages.notImportable })}</Badge>
                    )}
                    {row.warnings.map(warning => (
                        <Badge
                            key={warning.code}
                            variant="outline"
                            className="border-amber-600 text-amber-800 dark:text-amber-300"
                            data-warning-code={warning.code}
                        >
                            <TriangleAlert aria-hidden="true" />
                            {fm({
                                id: WARNING_LABEL_IDS[warning.code] ?? wosMessages.warnings.other,
                            })}
                        </Badge>
                    ))}
                </div>
            </div>
        </li>
    )
}
