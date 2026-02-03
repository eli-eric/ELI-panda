import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'
import type { FC } from 'react'
import { useCallback, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useCodebook } from '@/hooks/fetch/useCodebook'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { CodebookType } from '@/types/responses/codebook'

interface AutoSaveInlineComboboxProps {
    uid: string
    fieldName: string
    label: string
    value: CodebookType | null
    codebook: CODEBOOK
    disabled?: boolean
    onSave: (uid: string, fieldName: string, value: unknown) => Promise<unknown>
    isPending?: boolean
}

export const AutoSaveInlineCombobox: FC<AutoSaveInlineComboboxProps> = ({
    uid,
    fieldName,
    label,
    value,
    codebook,
    disabled,
    onSave,
    isPending,
}) => {
    const { formatMessage: fm } = useIntl()
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')

    const { data: response } = useCodebook(codebook, {
        limit: 10,
        searchText: query,
    })

    const options = useMemo(() => response?.data ?? [], [response])

    const handleSelect = useCallback(
        async (item: CodebookType) => {
            setIsOpen(false)
            setQuery('')
            await onSave(uid, fieldName, item)
        },
        [uid, fieldName, onSave],
    )

    const baseClasses = cn(
        'flex justify-between items-center gap-2 text-xs px-2 py-1 rounded-md transition-all duration-200 border group w-full min-w-0',
        isOpen
            ? 'border-primary bg-background'
            : disabled
              ? 'border-muted/40 bg-muted/20 cursor-not-allowed'
              : 'border-dashed border-primary/40 hover:border-primary/60 cursor-pointer hover:bg-primary/5',
    )

    if (disabled) {
        return (
            <div className={baseClasses} aria-disabled={true}>
                <span className="font-medium text-muted-foreground">{label}:</span>
                <span className="truncate text-foreground">{value?.name ?? 'N/A'}</span>
            </div>
        )
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <button className={cn(baseClasses, 'cursor-pointer')}>
                    <span className="font-medium text-muted-foreground flex items-center gap-1">
                        {label}:
                        {isPending && <Loader2 className="size-3 animate-spin text-primary" />}
                    </span>
                    <div className="text-right max-w-[60%] flex items-center gap-1 flex-1 min-w-0 overflow-hidden">
                        <span className="block w-full truncate text-foreground">
                            {value?.name ?? 'N/A'}
                        </span>
                        <ChevronsUpDown className="size-3 text-muted-foreground" />
                    </div>
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                <Command>
                    <CommandInput
                        placeholder={`${fm({ id: message.common.ui.search })} ${label.toLowerCase()}...`}
                        value={query}
                        onValueChange={setQuery}
                    />
                    <CommandList>
                        <CommandEmpty>{fm({ id: message.common.ui.noItemsFound })}</CommandEmpty>
                        <CommandGroup>
                            {options.map(item => (
                                <CommandItem
                                    key={item.uid}
                                    value={item.name}
                                    onSelect={() => handleSelect(item)}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            value?.uid === item.uid ? 'opacity-100' : 'opacity-0',
                                        )}
                                    />
                                    <div className="flex flex-col">
                                        <span>{item.name}</span>
                                        {item.code && (
                                            <span className="text-xs text-muted-foreground">
                                                {item.code}
                                            </span>
                                        )}
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
