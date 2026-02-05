'use client'

import { Search } from 'lucide-react'
import { useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { useGlobalSearchShortcut, useOpenGlobalSearch } from '@/modules/shared/globalSearch'

interface GlobalSearchTriggerProps {
    placeholder?: string
    className?: string
    size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
    sm: 'h-8 text-sm',
    md: 'h-9 text-sm',
    lg: 'h-10 text-base',
}

/**
 * Fake search input that triggers the global search modal
 * Looks like a real input field but opens modal on click
 */
export function GlobalSearchTrigger({
    placeholder,
    className,
    size = 'md',
}: GlobalSearchTriggerProps) {
    const { formatMessage: fm } = useIntl()
    const openGlobalSearch = useOpenGlobalSearch()
    const { shortcutDisplay } = useGlobalSearchShortcut({
        onToggle: () => {},
        enabled: false,
    })

    const defaultPlaceholder = fm({
        id: message.common.globalSearch.searchPlaceholder,
    })

    return (
        <button
            onClick={openGlobalSearch}
            className={cn(
                'flex w-full items-center gap-2 rounded-md border border-input bg-background px-3 text-left transition-colors',
                'hover:border-primary/50 hover:bg-accent/50',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                sizeClasses[size],
                className,
            )}
            type="button"
        >
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <span className="flex-1 truncate text-muted-foreground">
                {placeholder || defaultPlaceholder}
            </span>
            <Badge variant="outline" className="shrink-0 font-mono text-xs">
                {shortcutDisplay}
            </Badge>
        </button>
    )
}
