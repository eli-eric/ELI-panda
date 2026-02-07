'use client'

import type { LucideIcon } from 'lucide-react'
import type { FC } from 'react'

import { Button } from '@/components/ui/button'

import { InlineFieldRow } from './InlineFieldRow.comp'
import type { InlineFieldBaseProps } from './types'

interface InlineFieldActionProps extends InlineFieldBaseProps {
    buttonLabel: string
    onClick: () => void
    icon?: LucideIcon
    isPending?: boolean
}

export const InlineFieldAction: FC<InlineFieldActionProps> = ({
    label,
    buttonLabel,
    onClick,
    icon: Icon,
    disabled,
    isPending,
    className,
}) => {
    return (
        <InlineFieldRow label={label} disabled={disabled} className={className}>
            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onClick}
                disabled={disabled || isPending}
            >
                {Icon && <Icon className="size-4 mr-1.5" />}
                {buttonLabel}
            </Button>
        </InlineFieldRow>
    )
}
