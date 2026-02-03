import { Loader2 } from 'lucide-react'
import type { FC } from 'react'
import { useCallback, useState } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface SelectOption {
    value: string
    label: string
}

interface AutoSaveInlineListboxProps {
    uid: string
    fieldName: string
    label: string
    value: string | null
    options: SelectOption[]
    disabled?: boolean
    onSave: (uid: string, fieldName: string, value: unknown) => Promise<unknown>
}

export const AutoSaveInlineListbox: FC<AutoSaveInlineListboxProps> = ({
    uid,
    fieldName,
    label,
    value,
    options,
    disabled,
    onSave,
}) => {
    const [isPending, setIsPending] = useState(false)

    const handleChange = useCallback(
        async (newValue: string) => {
            setIsPending(true)
            try {
                await onSave(uid, fieldName, newValue)
            } finally {
                setIsPending(false)
            }
        },
        [uid, fieldName, onSave],
    )

    return (
        <div
            className={cn(
                'flex justify-between items-center gap-2 text-xs px-2 py-1 rounded-md transition-all duration-200 border w-full min-w-0',
                disabled
                    ? 'border-muted/40 bg-muted/20'
                    : 'border-dashed border-primary/40 hover:border-primary/60',
            )}
        >
            <span className="font-medium text-muted-foreground flex items-center gap-1 shrink-0">
                {label}:
                {isPending && <Loader2 className="size-3 animate-spin text-primary" />}
            </span>
            <Select value={value ?? ''} onValueChange={handleChange} disabled={disabled}>
                <SelectTrigger className="h-7 text-xs border-none shadow-none px-1 w-auto min-w-[100px]">
                    <SelectValue placeholder="N/A" />
                </SelectTrigger>
                <SelectContent>
                    {options.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
