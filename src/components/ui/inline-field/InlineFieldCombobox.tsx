'use client'

import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'
import type { FC } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
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
import { cn } from '@/lib/utils'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { CodebookFilter } from '@/types/responses/codebook'

import { InlineFieldRow } from './InlineFieldRow.comp'
import { InlineFieldValue } from './InlineFieldValue.comp'
import type { InlineFieldBaseProps } from './types'

interface InlineFieldComboboxProps extends InlineFieldBaseProps {
    value: string | null
    displayValue?: string | null
    codebook: CODEBOOK
    onSave: (uid: string, displayName?: string) => Promise<void>
    isPending?: boolean
    placeholder?: string
    filter?: CodebookFilter[]
}

export const InlineFieldCombobox: FC<InlineFieldComboboxProps> = ({
    label,
    value,
    displayValue,
    codebook,
    onSave,
    disabled,
    isPending,
    placeholder,
    filter,
    className,
}) => {
    const { formatMessage: fm } = useIntl()
    const [isOpen, setIsOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [searchText, setSearchText] = useState('')

    // Optimistic local state
    const [optimisticValue, setOptimisticValue] = useState(value)
    const [optimisticDisplayValue, setOptimisticDisplayValue] = useState(displayValue)

    // Sync with props when they change (after server update)
    useEffect(() => {
        setOptimisticValue(value)
        setOptimisticDisplayValue(displayValue)
    }, [value, displayValue])

    const { data, isLoading } = useCodebook(codebook, {
        filter,
        searchText: searchText || undefined,
        limit: 50,
    })

    const options = useMemo(() => data?.data ?? [], [data?.data])

    const handleSelect = useCallback(
        async (uid: string) => {
            if (uid === optimisticValue) {
                setIsOpen(false)
                return
            }
            const selected = options.find(opt => opt.uid === uid)
            if (!selected) return

            // Optimistic update - immediately show new value
            setOptimisticValue(selected.uid)
            setOptimisticDisplayValue(selected.name)
            setIsSaving(true)
            setIsOpen(false)
            setSearchText('')

            try {
                await onSave(selected.uid, selected.name)
            } catch {
                // Revert on error
                setOptimisticValue(value)
                setOptimisticDisplayValue(displayValue)
            } finally {
                setIsSaving(false)
            }
        },
        [optimisticValue, value, displayValue, options, onSave],
    )

    const effectivePending = isPending || isSaving

    if (disabled) {
        return (
            <InlineFieldRow label={label} disabled className={className}>
                <InlineFieldValue
                    value={optimisticDisplayValue ?? null}
                    placeholder={placeholder}
                    disabled
                />
            </InlineFieldRow>
        )
    }

    return (
        <InlineFieldRow label={label} className={className}>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        role="combobox"
                        aria-expanded={isOpen}
                        className="w-full justify-between !bg-muted hover:!bg-muted/80 !border-0 !shadow-none font-normal h-9 px-3 text-sm focus-visible:!ring-0"
                        disabled={effectivePending}
                    >
                        <span className={cn(!optimisticDisplayValue && 'text-muted-foreground')}>
                            {optimisticDisplayValue ?? placeholder ?? 'Select...'}
                        </span>
                        {effectivePending ? (
                            <Loader2 className="ml-2 size-4 shrink-0 animate-spin" />
                        ) : (
                            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0" align="start">
                    <Command shouldFilter={false}>
                        <CommandInput
                            placeholder="Search..."
                            value={searchText}
                            onValueChange={setSearchText}
                        />
                        <CommandList>
                            {isLoading ? (
                                <div className="flex items-center justify-center py-6">
                                    <Loader2 className="size-4 animate-spin" />
                                </div>
                            ) : (
                                <>
                                    <CommandEmpty>
                                        {fm({ id: 'common.errors.noResults' })}
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {options.map(option => (
                                            <CommandItem
                                                key={option.uid}
                                                value={option.uid}
                                                onSelect={handleSelect}
                                            >
                                                <Check
                                                    className={cn(
                                                        'mr-2 size-4',
                                                        optimisticValue === option.uid
                                                            ? 'opacity-100'
                                                            : 'opacity-0',
                                                    )}
                                                />
                                                {option.name}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </InlineFieldRow>
    )
}
