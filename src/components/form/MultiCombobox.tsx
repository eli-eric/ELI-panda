'use client'

import { Check, ChevronsUpDown, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
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
import type { CodebookType } from '@/types/responses/codebook'

const messages = message.common

type MultiComboboxProps = FieldProps & {
    codebook?: CODEBOOK
    codebookResponse?: CodebookType[]
    limit?: number
    className?: string
    /** Rendered under the control, for counting rules the reader needs to know. */
    description?: string
}

/**
 * Selects several codebook entries into a `string[]` of UIDs.
 *
 * Combobox and Listbox both bind a single codebook object; a plural UID list had
 * no shared control, and checkbox walls do not scale to codebooks with hundreds
 * of entries. A UID that no longer resolves is still listed, so an entry that
 * was removed from the codebook is visible and removable rather than silently
 * dropped from a saved record.
 */
const MultiCombobox = ({
    codebook,
    codebookResponse,
    name,
    label,
    customLabel,
    placeholder,
    disabled,
    className,
    description,
    limit = 100,
}: MultiComboboxProps) => {
    const { control } = useFormContext()
    const { formatMessage: fm } = useIntl()
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')

    const { data: response } = useCodebook(codebookResponse ? undefined : codebook, { limit })
    const options = useMemo(
        () => codebookResponse ?? response?.data ?? [],
        [codebookResponse, response],
    )

    const nameByUid = useMemo(() => {
        const lookup = new Map<string, string>()
        options.forEach(option => lookup.set(option.uid, option.name))
        return lookup
    }, [options])

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={[]}
            render={({ field, fieldState: { error } }) => {
                const selected: string[] = Array.isArray(field.value) ? field.value : []

                const toggle = (uid: string) =>
                    field.onChange(
                        selected.includes(uid)
                            ? selected.filter(value => value !== uid)
                            : [...selected, uid],
                    )

                return (
                    <div className={cn('space-y-1 w-full', className)}>
                        {(label || customLabel) && <Label>{customLabel ?? label}</Label>}

                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    aria-invalid={error ? 'true' : 'false'}
                                    disabled={disabled}
                                    data-testid={`${name}-trigger`}
                                    className={cn(
                                        'w-full justify-between',
                                        !selected.length && 'text-muted-foreground',
                                        error && 'border-destructive',
                                    )}
                                >
                                    <span className="truncate text-left min-w-0 flex-1">
                                        {selected.length
                                            ? fm(
                                                  { id: messages.ui.selectedCount },
                                                  {
                                                      count: selected.length,
                                                  },
                                              )
                                            : (placeholder ??
                                              fm({ id: messages.ui.selectOptions }))}
                                    </span>
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                                <Command>
                                    <CommandInput
                                        value={query}
                                        onValueChange={setQuery}
                                        placeholder={fm({ id: messages.ui.search })}
                                    />
                                    <CommandList>
                                        <CommandEmpty>
                                            {fm({ id: messages.noResults })}
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {options.map(option => (
                                                <CommandItem
                                                    key={option.uid}
                                                    value={option.name}
                                                    onSelect={() => toggle(option.uid)}
                                                >
                                                    <Check
                                                        className={cn(
                                                            'mr-2 h-4 w-4',
                                                            selected.includes(option.uid)
                                                                ? 'opacity-100'
                                                                : 'opacity-0',
                                                        )}
                                                    />
                                                    {option.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>

                        {selected.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                                {selected.map(uid => (
                                    <Badge key={uid} variant="secondary" className="gap-1">
                                        {nameByUid.get(uid) ??
                                            fm({ id: messages.ui.unavailableReference }, { uid })}
                                        {!disabled && (
                                            <button
                                                type="button"
                                                onClick={() => toggle(uid)}
                                                aria-label={fm({ id: messages.ui.removeSelection })}
                                                className="hover:text-destructive"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        )}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {description && (
                            <p className="text-xs text-muted-foreground">{description}</p>
                        )}
                    </div>
                )
            }}
        />
    )
}

export default MultiCombobox
