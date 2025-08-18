import { Check, ChevronsUpDown } from 'lucide-react'
import * as React from 'react'
import { useMemo, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { useCodebook } from '@/hooks/fetch/useCodebook'
import { cn } from '@/lib/utils'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps } from '@/types/form'
import type { CodebookFilter, CodebookType } from '@/types/responses/codebook'

interface InlineEditComboboxProps extends FieldProps {
  codebook?: CODEBOOK
  codebookResponse?: CodebookType[]
  limit?: number
  filter?: CodebookFilter[]
  hasClientFilter?: boolean
  onSelect?: (item?: CodebookType | null) => void
}

export const InlineEditCombobox = ({
  name,
  label,
  disabled,
  codebook,
  limit = 10,
  filter,
  codebookResponse,
  hasClientFilter = false,
  onSelect
}: InlineEditComboboxProps) => {
  const { control } = useFormContext()
  const [isEditing, setIsEditing] = useState(false)
  const [query, setQuery] = useState('')

  const codebookResponseData = useMemo(
    () => codebookResponse && { data: codebookResponse, metadata: undefined },
    [codebookResponse]
  )

  const { data: response } = useCodebook(codebook, {
    limit,
    filter,
    searchText: hasClientFilter ? undefined : query
  })

  const options = useMemo(() => {
    const data = codebookResponseData || response
    if (!data) return { data: [], metadata: undefined }
    if (query === '' || !hasClientFilter) return data

    return {
      data: data.data.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      ),
      metadata: data.metadata
    }
  }, [hasClientFilter, query, codebookResponseData, response])

  // Always render; show non-interactive view when disabled

  const handleSelect = (field: any, item: CodebookType) => {
    field.onChange(item)
    onSelect?.(item)
    setIsEditing(false)
    setQuery('')
  }

  const baseClasses = cn(
    'flex justify-between items-center gap-2 text-xs px-2 py-1 rounded-md transition-all duration-200 border group w-full min-w-0',
    isEditing
      ? 'border-primary bg-background'
      : disabled
        ? 'border-muted/40 bg-muted/20 cursor-not-allowed'
        : 'border-dashed border-primary/40 hover:border-primary/60 cursor-pointer hover:bg-primary/5'
  )

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        if (disabled) {
          return (
            <div className={baseClasses} aria-disabled={true}>
              <span className="font-medium text-muted-foreground flex items-center gap-1">
                {label}:
              </span>
              <div className="text-right max-w-[60%] flex-1 min-w-0 overflow-hidden">
                <span className="block w-full truncate text-foreground">
                  {field.value?.name || 'N/A'}
                </span>
              </div>
            </div>
          )
        }

        return (
          <Popover
            open={isEditing}
            onOpenChange={newOpen => {
              if (newOpen) {
                setIsEditing(true)
              }
              if (!newOpen) {
                setIsEditing(false)
                setQuery('')
              }
            }}
          >
            <PopoverTrigger asChild>
              <button
                className={cn(baseClasses, 'border-primary cursor-pointer')}
              >
                <span className="font-medium text-muted-foreground flex items-center gap-1">
                  {label}:
                </span>
                <div className="text-right max-w-[60%] flex items-center gap-1 flex-1 min-w-0 overflow-hidden">
                  <span className="block w-full truncate text-foreground">
                    {field.value?.name || 'N/A'}
                  </span>
                  <ChevronsUpDown className="size-3 text-muted-foreground" />
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[var(--radix-popover-trigger-width)] p-0"
              align="start"
            >
              <Command>
                <CommandInput
                  placeholder={`Search ${label?.toLowerCase() || 'items'}...`}
                  value={query}
                  onValueChange={setQuery}
                />
                <CommandList>
                  <CommandEmpty>No items found.</CommandEmpty>
                  <CommandGroup>
                    {options?.data?.map(item => (
                      <CommandItem
                        key={item.uid}
                        value={item.name}
                        onSelect={() => handleSelect(field, item)}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            field.value?.uid === item.uid
                              ? 'opacity-100'
                              : 'opacity-0'
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
      }}
    />
  )
}
