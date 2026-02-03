import { Edit, Loader2 } from 'lucide-react'
import type { FC, KeyboardEvent } from 'react'
import { useCallback, useState } from 'react'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

import { useAutoSave } from '../../hooks/useAutoSave'
import type { AutoSaveFieldProps } from './types'

interface AutoSaveInlineInputProps extends AutoSaveFieldProps {
    type?: string
    placeholder?: string
}

export const AutoSaveInlineInput: FC<AutoSaveInlineInputProps> = ({
    uid,
    fieldName,
    label,
    value: initialValue,
    disabled,
    onSave,
    type = 'text',
    placeholder,
}) => {
    const [isEditing, setIsEditing] = useState(false)
    const { value, setValue, save, isPending } = useAutoSave({
        uid,
        fieldName,
        initialValue,
        onSave,
    })

    const handleStartEdit = useCallback(() => {
        if (disabled) return
        setIsEditing(true)
    }, [disabled])

    const handleBlur = useCallback(async () => {
        setIsEditing(false)
        await save()
    }, [save])

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                setIsEditing(false)
                save()
            } else if (e.key === 'Escape') {
                setValue(initialValue ?? '')
                setIsEditing(false)
            }
        },
        [save, setValue, initialValue],
    )

    const baseClasses = cn(
        'flex justify-between items-center gap-2 text-xs px-2 py-1 rounded-md transition-all duration-200 border group w-full min-w-0',
        isEditing
            ? 'border-primary bg-background'
            : disabled
              ? 'border-muted/40 bg-muted/20 cursor-not-allowed'
              : 'border-dashed border-primary/40 hover:border-primary/60 cursor-pointer hover:bg-primary/5',
    )

    if (isEditing) {
        return (
            <div className="w-full">
                <Input
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    type={type}
                    className="w-full"
                    autoFocus
                />
            </div>
        )
    }

    return (
        <div
            className={baseClasses}
            onClick={handleStartEdit}
            aria-disabled={disabled}
        >
            <span className="font-medium text-muted-foreground flex items-center gap-1">
                {label}:
                {!disabled && (
                    <Edit className="size-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-primary/70" />
                )}
            </span>
            <div className="text-right max-w-[60%] flex-1 min-w-0 overflow-hidden flex items-center justify-end gap-1">
                {isPending && <Loader2 className="size-3 animate-spin text-primary" />}
                <span className="block w-full truncate text-foreground" title={value || 'N/A'}>
                    {value || 'N/A'}
                </span>
            </div>
        </div>
    )
}
