'use client'

import { Check, Loader2, X } from 'lucide-react'
import type { FC } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface InlineFieldActionsProps {
    onConfirm: () => void
    onCancel: () => void
    isPending?: boolean
    className?: string
}

export const InlineFieldActions: FC<InlineFieldActionsProps> = ({
    onConfirm,
    onCancel,
    isPending,
    className,
}) => {
    return (
        <div className={cn('flex items-center gap-1 mt-1', className)}>
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={onConfirm}
                disabled={isPending}
            >
                {isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                ) : (
                    <Check className="size-4 text-green-600" />
                )}
            </Button>
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={onCancel}
                disabled={isPending}
            >
                <X className="size-4 text-destructive" />
            </Button>
        </div>
    )
}
