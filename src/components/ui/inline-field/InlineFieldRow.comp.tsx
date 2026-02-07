import type { FC, ReactNode } from 'react'

import { cn } from '@/lib/utils'

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
    return (
        <div
            className={cn(
                'flex items-start gap-4 py-2',
                disabled && 'opacity-60',
                className,
            )}
        >
            <div className="w-40 shrink-0 pt-1.5">
                <span className="text-sm font-medium text-muted-foreground">{label}</span>
            </div>
            <div className="flex-1 min-w-0">{children}</div>
        </div>
    )
}
