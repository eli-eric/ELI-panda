import { Edit } from 'lucide-react'
import * as React from 'react'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Input as ShadcnInput } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { FieldProps } from '@/types/form'

interface InlineEditInputWithActionsProps extends FieldProps {
    unit?: string
    type?: string
    step?: string
    placeholder?: string
    actions?: React.ReactNode
}

export const InlineEditInputWithActions = ({
    name,
    label,
    disabled,
    unit,
    type = 'text',
    step = '0.001',
    placeholder,
    actions,
}: InlineEditInputWithActionsProps) => {
    const { control } = useFormContext()
    const [isEditing, setIsEditing] = useState(false)
    const [editValue, setEditValue] = useState('')

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                const handleStartEdit = () => {
                    setEditValue(field.value || '')
                    setIsEditing(true)
                }

                const handleSave = () => {
                    field.onChange(editValue)
                    setIsEditing(false)
                }

                const handleCancel = () => {
                    setEditValue(field.value || '')
                    setIsEditing(false)
                }

                const handleKeyDown = (e: React.KeyboardEvent) => {
                    if (e.key === 'Enter') {
                        handleSave()
                    } else if (e.key === 'Escape') {
                        handleCancel()
                    }
                }

                const baseClasses = cn(
                    'flex justify-between items-center gap-2 text-xs px-2 py-1 rounded-md transition-all duration-200 border group w-full min-w-0',
                    isEditing
                        ? 'border-primary bg-background'
                        : disabled
                          ? 'border-muted/40 bg-muted/20 cursor-not-allowed'
                          : 'border-dashed border-primary hover:border-primary/60 cursor-pointer hover:bg-primary/5',
                )

                if (isEditing) {
                    return (
                        <div className="w-full">
                            <div className="relative flex items-center gap-2">
                                <div className="flex-1 relative">
                                    <ShadcnInput
                                        value={editValue}
                                        onChange={e => setEditValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        onBlur={() => {
                                            field.onChange(editValue)
                                            setIsEditing(false)
                                        }}
                                        placeholder={placeholder}
                                        type={type}
                                        step={step}
                                        className="w-full"
                                        autoFocus
                                    />
                                    {unit && (
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                            <span className="text-muted-foreground text-sm">
                                                {unit}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                {actions && (
                                    <div className="flex items-center gap-1">{actions}</div>
                                )}
                            </div>
                        </div>
                    )
                }

                return (
                    <div className="flex items-center gap-2 w-full">
                        <div
                            className={baseClasses}
                            onClick={!disabled ? handleStartEdit : undefined}
                            aria-disabled={disabled}
                        >
                            <span className="font-medium text-muted-foreground flex items-center gap-1">
                                {label}:
                                <Edit className="size-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-primary/70" />
                            </span>
                            <div className="text-right max-w-[60%] flex-1 min-w-0 overflow-hidden">
                                <span
                                    className="block w-full truncate text-foreground"
                                    title={field.value || 'Click to edit'}
                                >
                                    {field.value || 'N/A'} {unit && `[${unit}]`}
                                </span>
                                {error && (
                                    <div className="text-xs text-destructive">{error.message}</div>
                                )}
                            </div>
                        </div>
                        {actions && (
                            <div className="flex items-center gap-1 flex-shrink-0">{actions}</div>
                        )}
                    </div>
                )
            }}
        />
    )
}
