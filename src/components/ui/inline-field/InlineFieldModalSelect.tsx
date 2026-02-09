'use client'

import { Table2, X } from 'lucide-react'
import type { FC } from 'react'
import { useCallback, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

import { InlineFieldRow } from './InlineFieldRow.comp'
import { InlineFieldValue } from './InlineFieldValue.comp'
import type { InlineFieldBaseProps } from './types'

interface SelectedValue {
    uid: string
    name: string
}

interface InlineFieldModalSelectProps extends InlineFieldBaseProps {
    value: string | null
    displayValue?: string | null
    onOpenModal: (onSelect: (selected: SelectedValue | null) => void) => void
    onSave: (uid: string | null) => Promise<void>
    isPending?: boolean
    placeholder?: string
}

export const InlineFieldModalSelect: FC<InlineFieldModalSelectProps> = ({
    label,
    value,
    displayValue,
    onOpenModal,
    onSave,
    disabled,
    isPending,
    placeholder,
    className,
}) => {
    const [isSaving, setIsSaving] = useState(false)
    // Optimistic local state
    const [optimisticValue, setOptimisticValue] = useState(value)
    const [optimisticDisplayValue, setOptimisticDisplayValue] = useState(displayValue)

    // Sync with props when they change
    useEffect(() => {
        setOptimisticValue(value)
        setOptimisticDisplayValue(displayValue)
    }, [value, displayValue])

    const handleSelect = useCallback(
        async (selected: SelectedValue | null) => {
            if (!selected) return
            if (selected.uid === optimisticValue) return

            // Optimistic update
            setOptimisticValue(selected.uid)
            setOptimisticDisplayValue(selected.name)
            setIsSaving(true)

            try {
                await onSave(selected.uid)
            } catch {
                // Revert on error
                setOptimisticValue(value)
                setOptimisticDisplayValue(displayValue)
            } finally {
                setIsSaving(false)
            }
        },
        [optimisticValue, value, displayValue, onSave],
    )

    const handleClear = useCallback(
        async (e: React.MouseEvent) => {
            e.stopPropagation()

            // Optimistic update
            const prevValue = optimisticValue
            const prevDisplayValue = optimisticDisplayValue
            setOptimisticValue(null)
            setOptimisticDisplayValue(null)
            setIsSaving(true)

            try {
                await onSave(null)
            } catch {
                // Revert on error
                setOptimisticValue(prevValue)
                setOptimisticDisplayValue(prevDisplayValue)
            } finally {
                setIsSaving(false)
            }
        },
        [optimisticValue, optimisticDisplayValue, onSave],
    )

    const handleOpenModal = useCallback(() => {
        onOpenModal(handleSelect)
    }, [onOpenModal, handleSelect])

    const effectivePending = isPending || isSaving

    const rightElement = (
        <div className="flex items-center gap-1">
            {optimisticValue && !disabled && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-6 hover:bg-destructive/10"
                    onClick={handleClear}
                    disabled={effectivePending}
                >
                    <X className="size-3.5 text-muted-foreground hover:text-destructive" />
                </Button>
            )}
            <Table2 className="size-4 text-muted-foreground" />
        </div>
    )

    return (
        <InlineFieldRow label={label} disabled={disabled} className={className}>
            <InlineFieldValue
                value={optimisticDisplayValue ?? null}
                placeholder={placeholder}
                onClick={disabled ? undefined : handleOpenModal}
                disabled={disabled}
                isPending={effectivePending}
                rightElement={rightElement}
            />
        </InlineFieldRow>
    )
}
