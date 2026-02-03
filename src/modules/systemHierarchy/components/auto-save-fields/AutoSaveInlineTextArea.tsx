import { Edit, Loader2 } from 'lucide-react'
import type { FC, KeyboardEvent } from 'react'
import { useCallback, useState } from 'react'
import { useIntl } from 'react-intl'

import { Textarea } from '@/components/ui/textarea'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'

import { useAutoSave } from '../../hooks/useAutoSave'
import type { AutoSaveFieldProps } from './types'

interface AutoSaveInlineTextAreaProps extends AutoSaveFieldProps {
    rows?: number
    placeholder?: string
}

export const AutoSaveInlineTextArea: FC<AutoSaveInlineTextAreaProps> = ({
    uid,
    fieldName,
    label,
    value: initialValue,
    disabled,
    onSave,
    rows = 3,
    placeholder,
}) => {
    const { formatMessage: fm } = useIntl()
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
            if (e.key === 'Escape') {
                setValue(initialValue ?? '')
                setIsEditing(false)
            } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                setIsEditing(false)
                save()
            }
        },
        [save, setValue, initialValue],
    )

    const displayValue = value || 'N/A'
    const shortValue =
        displayValue.length > 100 ? `${displayValue.substring(0, 100)}...` : displayValue

    if (isEditing) {
        return (
            <div className="w-full">
                <Textarea
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    rows={rows}
                    className="text-sm resize-none w-full"
                    autoFocus
                />
            </div>
        )
    }

    return (
        <div
            className={cn(
                'space-y-1 p-2 rounded-md border transition-all duration-200 group',
                disabled
                    ? 'border-muted/40 bg-muted/20 cursor-not-allowed'
                    : 'border-dashed border-primary/40 hover:border-primary/60 cursor-pointer hover:bg-primary/5',
            )}
            onClick={handleStartEdit}
            aria-disabled={disabled}
        >
            <div className="flex items-center justify-between">
                <span className="font-medium text-muted-foreground text-xs flex items-center gap-1">
                    {label}:
                    {!disabled && (
                        <Edit className="size-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-primary/70" />
                    )}
                    {isPending && <Loader2 className="size-3 animate-spin text-primary" />}
                </span>
            </div>
            <div className="text-sm text-foreground whitespace-pre-wrap break-words">
                {shortValue === 'N/A' ? (
                    <span className="text-muted-foreground italic">
                        {fm({ id: message.common.ui.clickToAdd })} {label.toLowerCase()}
                    </span>
                ) : (
                    shortValue
                )}
            </div>
        </div>
    )
}
