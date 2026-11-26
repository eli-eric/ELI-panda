import { TriangleAlert } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'

interface PropertyRowProps {
    name: string
    /** Effective (current) value — service value if overridden, otherwise catalogue value. */
    value: string | null
    unit?: string | null
    /** Original catalogue value, only set when the property is overridden by a service. */
    original?: string | null
    variant: 'tab' | 'sidebar'
}

const withUnit = (value: string, unit?: string | null) => (unit ? `${value} (${unit})` : value)

export const PropertyRow: FC<PropertyRowProps> = ({ name, value, unit, original, variant }) => {
    const { formatMessage: fm } = useIntl()

    const hasValue = value !== null && value !== undefined && value !== ''
    const displayValue = hasValue ? withUnit(value as string, unit) : 'N/A'
    const isOverridden = original !== null && original !== undefined && original !== ''
    const wasText = isOverridden
        ? fm(
              { id: message.systemHierarchy.physicalItem.properties.was },
              { value: withUnit(original as string, unit) },
          )
        : null

    return (
        <div className="flex justify-between items-start text-sm py-0.5 gap-2">
            <span className="text-muted-foreground text-xs shrink-0">{name}</span>
            <span className="text-xs font-medium text-right break-words min-w-0">
                <span className={cn(!hasValue && 'text-muted-foreground')}>{displayValue}</span>
                {wasText && (
                    <span className="ml-1.5 inline-flex items-center gap-0.5 text-muted-foreground font-normal">
                        {variant === 'tab' ? (
                            <>
                                <TriangleAlert className="size-3 shrink-0" />
                                <span className="line-through">{wasText}</span>
                            </>
                        ) : (
                            <span>({wasText})</span>
                        )}
                    </span>
                )}
            </span>
        </div>
    )
}
