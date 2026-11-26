import type { FC, ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { useInlineFieldDensity } from './InlineFieldDensity'

interface InlineFieldRowProps {
    label: string
    children: ReactNode
    disabled?: boolean
    className?: string
}

export const InlineFieldRow: FC<InlineFieldRowProps> = ({
    label,
    children,
    disabled,
    className,
}) => {
    const isCompact = useInlineFieldDensity() === 'compact'
    return (
        <div
            className={cn(
                'flex items-start',
                isCompact ? 'gap-2 py-1' : 'gap-4 py-2',
                disabled && 'opacity-60',
                className,
            )}
        >
            <div className={cn('shrink-0 pt-1.5', isCompact ? 'w-28' : 'w-40')}>
                <span
                    className={cn(
                        'font-medium text-muted-foreground',
                        isCompact ? 'text-xs' : 'text-sm',
                    )}
                >
                    {label}
                </span>
            </div>
            <div className="flex-1 min-w-0">{children}</div>
        </div>
    )
}
