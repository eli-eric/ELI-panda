'use client'

import type { FC, KeyboardEvent, ReactNode } from 'react'
import { useCallback, useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

import { InlineFieldActions } from './InlineFieldActions.comp'
import { InlineFieldRow } from './InlineFieldRow.comp'
import { InlineFieldValue } from './InlineFieldValue.comp'
import type { InlineFieldEditableProps } from './types'

interface InlineFieldInputProps extends InlineFieldEditableProps {
    type?: 'text' | 'number'
    rightAction?: ReactNode
}

export const InlineFieldInput: FC<InlineFieldInputProps> = ({
    label,
    value: initialValue,
    onSave,
    disabled,
    isPending,
    placeholder,
    type = 'text',
    rightAction,
    className,
}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editValue, setEditValue] = useState(initialValue ?? '')
    const [isSaving, setIsSaving] = useState(false)
    // Optimistic local state for display
    const [optimisticValue, setOptimisticValue] = useState(initialValue)

    // Sync with props when they change (after server update)
    useEffect(() => {
        setEditValue(initialValue ?? '')
        setOptimisticValue(initialValue)
    }, [initialValue])

    const handleStartEdit = useCallback(() => {
        if (disabled) return
        setIsEditing(true)
        setEditValue(optimisticValue ?? '')
    }, [disabled, optimisticValue])

    const handleConfirm = useCallback(async () => {
        if (editValue === optimisticValue) {
            setIsEditing(false)
            return
        }
        // Optimistic update - immediately show new value
        setOptimisticValue(editValue)
        setIsEditing(false)
        setIsSaving(true)
        try {
            await onSave(editValue)
        } catch {
            // Revert on error
            setOptimisticValue(initialValue)
        } finally {
            setIsSaving(false)
        }
    }, [editValue, optimisticValue, initialValue, onSave])

    const handleCancel = useCallback(() => {
        setEditValue(optimisticValue ?? '')
        setIsEditing(false)
    }, [optimisticValue])

    const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                e.preventDefault()
                handleConfirm()
            } else if (e.key === 'Escape') {
                e.preventDefault()
                handleCancel()
            }
        },
        [handleConfirm, handleCancel],
    )

    const effectivePending = isPending || isSaving

    return (
        <InlineFieldRow label={label} disabled={disabled} className={className}>
            {isEditing ? (
                <div className="space-y-0">
                    <div className="flex items-center gap-2">
                        <Input
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            type={type}
                            autoFocus
                            disabled={effectivePending}
                            className={cn('flex-1')}
                        />
                        {rightAction}
                    </div>
                    <InlineFieldActions
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                        isPending={effectivePending}
                    />
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <div className="flex-1">
                        <InlineFieldValue
                            value={optimisticValue}
                            placeholder={placeholder}
                            onClick={handleStartEdit}
                            disabled={disabled}
                            isPending={effectivePending}
                        />
                    </div>
                    {rightAction}
                </div>
            )}
        </InlineFieldRow>
    )
}
