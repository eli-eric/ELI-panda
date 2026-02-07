'use client'

import type { FC, KeyboardEvent } from 'react'
import { useCallback, useEffect, useState } from 'react'

import { Textarea } from '@/components/ui/textarea'

import { InlineFieldActions } from './InlineFieldActions.comp'
import { InlineFieldRow } from './InlineFieldRow.comp'
import { InlineFieldValue } from './InlineFieldValue.comp'
import type { InlineFieldEditableProps } from './types'

type InlineFieldTextAreaProps = InlineFieldEditableProps

export const InlineFieldTextArea: FC<InlineFieldTextAreaProps> = ({
    label,
    value: initialValue,
    onSave,
    disabled,
    isPending,
    placeholder,
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
        (e: KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === 'Escape') {
                e.preventDefault()
                handleCancel()
            }
            // Note: Enter creates newline in textarea, so we don't handle confirm on Enter
        },
        [handleCancel],
    )

    const effectivePending = isPending || isSaving

    return (
        <InlineFieldRow label={label} disabled={disabled} className={className}>
            {isEditing ? (
                <div className="space-y-0">
                    <Textarea
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        disabled={effectivePending}
                        rows={3}
                    />
                    <InlineFieldActions
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                        isPending={effectivePending}
                    />
                </div>
            ) : (
                <InlineFieldValue
                    value={optimisticValue}
                    placeholder={placeholder}
                    onClick={handleStartEdit}
                    disabled={disabled}
                    isPending={effectivePending}
                    className="whitespace-pre-wrap min-h-9"
                />
            )}
        </InlineFieldRow>
    )
}
