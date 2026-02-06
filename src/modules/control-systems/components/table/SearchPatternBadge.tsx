import { useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'

import type { SearchPattern } from '../../utils/searchPattern'

interface SearchPatternBadgeProps {
    pattern: SearchPattern | null
    className?: string
    variant?: 'default' | 'shadow'
}

export const SearchPatternBadge = ({
    pattern,
    className,
    variant = 'default',
}: SearchPatternBadgeProps) => {
    const { formatMessage: fm } = useIntl()

    if (!pattern) return null

    const config = {
        startsWith: {
            label: fm({ id: message.controlSystems.form.searchPatternStartsWith }),
            className: 'bg-muted/70 text-muted-foreground border-muted',
            shadowClassName: 'bg-muted/40 text-muted-foreground/60 border-muted/50',
        },
        contains: {
            label: fm({ id: message.controlSystems.form.searchPatternContains }),
            className: 'bg-lime-500/10 text-lime-700 dark:text-lime-400 border-lime-500/20',
            shadowClassName:
                'bg-lime-500/5 text-lime-600/70 dark:text-lime-400/70 border-lime-500/10',
        },
        endsWith: {
            label: fm({ id: message.controlSystems.form.searchPatternEndsWith }),
            className: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
            shadowClassName:
                'bg-blue-500/5 text-blue-600/70 dark:text-blue-400/70 border-blue-500/10',
        },
    }

    const { label, className: variantClassName, shadowClassName } = config[pattern]

    const badgeClassName = variant === 'shadow' ? shadowClassName : variantClassName

    return (
        <Badge
            variant="outline"
            className={cn(
                'text-xs px-2 py-0.5 font-normal pointer-events-none whitespace-nowrap',
                badgeClassName,
                className,
            )}
            role="status"
            aria-live="polite"
            aria-label={`Search pattern: ${label}`}
        >
            {label}
        </Badge>
    )
}
