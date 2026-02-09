'use client'

import type { FC } from 'react'
import { useCallback, useEffect, useState } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import { InlineFieldRow } from './InlineFieldRow.comp'
import { InlineFieldValue } from './InlineFieldValue.comp'
import type { InlineFieldBaseProps, SelectOption } from './types'

interface InlineFieldSelectProps extends InlineFieldBaseProps {
    value: string | null
    options: SelectOption[]
    onSave: (value: string) => Promise<void>
    isPending?: boolean
    placeholder?: string
}

export const InlineFieldSelect: FC<InlineFieldSelectProps> = ({
    label,
    value,
    options,
    onSave,
    disabled,
    isPending,
    placeholder,
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    // Optimistic local state
    const [optimisticValue, setOptimisticValue] = useState(value)

    // Sync with props when they change (after server update)
    useEffect(() => {
        setOptimisticValue(value)
    }, [value])

    const selectedOption = options.find(opt => opt.value === optimisticValue)
    const displayValue = selectedOption?.label ?? null

    const handleSelect = useCallback(
        async (newValue: string) => {
            if (newValue === optimisticValue) {
                setIsOpen(false)
                return
            }
            // Optimistic update - immediately show new value
            setOptimisticValue(newValue)
            setIsSaving(true)
            try {
                await onSave(newValue)
            } catch {
                // Revert on error
                setOptimisticValue(value)
            } finally {
                setIsSaving(false)
                setIsOpen(false)
            }
        },
        [optimisticValue, value, onSave],
    )

    const effectivePending = isPending || isSaving

    if (disabled) {
        return (
            <InlineFieldRow label={label} disabled className={className}>
                <InlineFieldValue value={displayValue} placeholder={placeholder} disabled />
            </InlineFieldRow>
        )
    }

    return (
        <InlineFieldRow label={label} className={className}>
            <Select
                value={optimisticValue ?? undefined}
                onValueChange={handleSelect}
                open={isOpen}
                onOpenChange={setIsOpen}
                disabled={effectivePending}
            >
                <SelectTrigger className="w-full !bg-muted hover:!bg-muted/80 !border-0 !shadow-none h-9 focus-visible:!ring-0">
                    <SelectValue placeholder={placeholder ?? 'Select...'} />
                </SelectTrigger>
                <SelectContent>
                    {options.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </InlineFieldRow>
    )
}
