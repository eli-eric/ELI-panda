'use client'

import { Loader2 } from 'lucide-react'
import type { FC, ReactNode } from 'react'
import { useIntl } from 'react-intl'

import { cn } from '@/lib/utils'

interface InlineFieldValueProps {
    value: string | null
    placeholder?: string
    onClick?: () => void
    disabled?: boolean
    isPending?: boolean
    rightElement?: ReactNode
    className?: string
}

export const InlineFieldValue: FC<InlineFieldValueProps> = ({
    value,
    placeholder,
    onClick,
    disabled,
    isPending,
    rightElement,
    className,
}) => {
    const { formatMessage: fm } = useIntl()
    const displayPlaceholder = placeholder ?? fm({ id: 'systemHierarchy.fields.noneEntered' })

    const isClickable = onClick && !disabled && !isPending
    const isEmpty = !value || value.trim() === ''

    return (
        <div
            onClick={isClickable ? onClick : undefined}
            className={cn(
                'flex items-center justify-between gap-2 rounded-md bg-muted px-3 py-1.5 min-h-9 text-sm',
                isClickable && 'cursor-pointer hover:bg-muted/80 transition-colors',
                disabled && 'cursor-not-allowed',
                className,
            )}
        >
            <span className={cn('truncate', isEmpty && 'text-muted-foreground italic')}>
                {isEmpty ? displayPlaceholder : value}
            </span>
            <div className="flex items-center gap-1 shrink-0">
                {isPending && <Loader2 className="size-4 animate-spin text-primary" />}
                {rightElement}
            </div>
        </div>
    )
}
