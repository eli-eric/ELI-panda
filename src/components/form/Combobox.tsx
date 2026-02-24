'use client'

import { Check, ChevronsUpDown, Plus, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { useMemo, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
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
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useCodebook } from '@/hooks/fetch/useCodebook'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps } from '@/types/form'
import type { CodebookFilter, CodebookType } from '@/types/responses/codebook'

import useAddCodebookValue from './shared/useAddCodebookValue'

const messages = message.common

type ComboboxPropsT = FieldProps & {
    codebook?: CODEBOOK
    codebookResponse?: CodebookType[]
    position?: 'top' | 'bottom'
    limit?: number
    showAddButton?: boolean
    filter?: CodebookFilter[]
    customLabel?: string
    onClickIcon?: () => void
    onSelect?: (item?: CodebookType | null) => void
    hasClientFilter?: boolean
    className?: string
}

const Combobox = ({
    codebook,
    hasClientFilter = false,
    name,
    placeholder,
    customLabel,
    label,
    disabled,
    className,
    limit = 10,
    filter,
    position = 'bottom',
    codebookResponse,
    showAddButton = false,
    onSelect,
}: ComboboxPropsT) => {
    const { control, setValue } = useFormContext()
    const { formatMessage: fm } = useIntl()

    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState<string>('')

    const codebookResponseData = useMemo(
        () => codebookResponse && { data: codebookResponse, metadata: undefined },
        [codebookResponse],
    )

    const { data: response } = useCodebook(codebook, {
        limit,
        filter,
        searchText: hasClientFilter ? undefined : query,
    })

    const options = useMemo(() => {
        const data = codebookResponseData || response
        if (!data) return { data: [], metadata: undefined }
        if (query === '' || !hasClientFilter) return data

        return {
            data: data.data.filter(item => item.name.toLowerCase().includes(query.toLowerCase())),
            metadata: codebookResponseData?.metadata,
        }
    }, [hasClientFilter, query, codebookResponseData, response])

    const { openFormModal } = useAddCodebookValue(options?.metadata)
    const { data: session } = useSession()

    const hasAddPermission =
        showAddButton &&
        options?.metadata?.roleEdit &&
        session?.user?.roles?.includes(options.metadata.roleEdit)

    const handleClear = field => {
        setQuery('')
        field.onChange(null)
        setValue(name, null)
        onSelect && onSelect(null)
    }

    const handleSelect = (field, item: CodebookType | null) => {
        field.onChange(item)
        onSelect && onSelect(item)
        setOpen(false)
    }

    return (
        <>
            <Controller
                name={name}
                control={control}
                defaultValue={null}
                render={({ field, fieldState: { error } }) => (
                    <div className={cn('space-y-1 w-full', className)}>
                        {(label || customLabel) && (
                            <Label>{customLabel ? customLabel : label}</Label>
                        )}

                        <div className="flex gap-2 min-w-0">
                            <div className="relative flex-1 min-w-0 overflow-hidden">
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            aria-invalid={error ? 'true' : 'false'}
                                            onClick={() => {
                                                setOpen(!open)
                                            }}
                                            className={cn(
                                                'w-full justify-between overflow-hidden',
                                                !field.value && 'text-muted-foreground',
                                                error && 'border-destructive',
                                                field.value && !disabled && 'pr-12',
                                            )}
                                            disabled={disabled}
                                        >
                                            <span className="truncate text-left min-w-0 flex-1">
                                                {field.value?.name ||
                                                    placeholder ||
                                                    'Select option...'}
                                            </span>
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className={cn(
                                            'w-[var(--radix-popover-trigger-width)] p-0',
                                            position === 'top' && 'mb-2',
                                        )}
                                        side={position === 'top' ? 'top' : 'bottom'}
                                    >
                                        <Command>
                                            <CommandInput
                                                placeholder={`Search ${label || customLabel || 'items'}...`}
                                                value={query}
                                                onValueChange={setQuery}
                                            />
                                            <CommandList>
                                                <CommandEmpty>
                                                    {fm({ id: messages.noResults })}
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    {options?.data?.map(item => (
                                                        <CommandItem
                                                            key={item.uid}
                                                            value={item.name}
                                                            onSelect={() =>
                                                                handleSelect(field, item)
                                                            }
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    'mr-2 h-4 w-4',
                                                                    field.value?.uid === item.uid
                                                                        ? 'opacity-100'
                                                                        : 'opacity-0',
                                                                )}
                                                            />
                                                            {item.name}
                                                        </CommandItem>
                                                    ))}
                                                    {field.value && (
                                                        <CommandItem
                                                            value=""
                                                            onSelect={() => handleClear(field)}
                                                            className="text-muted-foreground"
                                                        >
                                                            {fm({
                                                                id: message.common.ui
                                                                    .clearSelection,
                                                            })}
                                                        </CommandItem>
                                                    )}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>

                                {field.value && !disabled && (
                                    <button
                                        type="button"
                                        className="absolute right-8 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 cursor-pointer"
                                        onClick={() => handleClear(field)}
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>

                            {hasAddPermission && (
                                <Button
                                    type="button"
                                    variant="default"
                                    size="icon"
                                    onClick={() => openFormModal()}
                                    disabled={disabled}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                        {error && (
                            <p className="text-sm text-destructive">
                                {error.message}
                            </p>
                        )}
                    </div>
                )}
            />
        </>
    )
}
export default Combobox
