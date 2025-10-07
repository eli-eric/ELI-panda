import * as SelectPrimitive from '@radix-ui/react-select'
import { ChevronsDown } from 'lucide-react'
import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue
} from '@/components/ui/select'
import { useCodebook } from '@/hooks/fetch/useCodebook'
import { cn } from '@/lib/utils'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps } from '@/types/form'
import type { CodebookType } from '@/types/responses/codebook'

interface InlineEditListboxProps extends FieldProps {
  codebook?: CODEBOOK
  allowEmptyOption?: boolean
  emptyOption?: string
  customOptions?: string[] | any[]
  codebookResponse?: CodebookType[]
  defaultValue?: CodebookType[] | string | null
  onClick?: () => void
}

export const InlineEditListbox = ({
  name,
  label,
  disabled,
  codebook,
  allowEmptyOption = false,
  emptyOption = 'None',
  customOptions,
  codebookResponse,
  defaultValue = null
}: InlineEditListboxProps) => {
  const { control, setValue, getValues } = useFormContext()
  const [isEditing, setIsEditing] = useState(false)

  const { data: codebookOptions } = useCodebook(codebook)

  // Set default value on component mount if not already set
  useEffect(() => {
    if (defaultValue && name) {
      const currentValue = getValues(name)
      if (currentValue === undefined) {
        setValue(name, defaultValue)
      }
    }
  }, [defaultValue, name, setValue, getValues])

  const options = useMemo(() => {
    const targetOptions: CodebookType[] = []

    // Add valid codebook options first
    if (codebookOptions?.data) {
      targetOptions.push(
        ...codebookOptions.data.filter(
          item => item.uid && item.uid.trim() !== ''
        )
      )
    }
    if (codebookResponse) {
      targetOptions.push(
        ...codebookResponse.filter(item => item.uid && item.uid.trim() !== '')
      )
    }

    // Add custom options
    if (customOptions) {
      targetOptions.push(
        ...customOptions.map(item => ({ uid: item, name: item }))
      )
    }

    // Add empty option at the end if allowed
    if (allowEmptyOption) {
      targetOptions.push({ uid: '__empty__', name: emptyOption })
    }

    return targetOptions
  }, [
    allowEmptyOption,
    emptyOption,
    codebookOptions,
    customOptions,
    codebookResponse
  ])

  const handleChange = (value: string) => {
    if (value === '' || value === '__empty__') {
      return null
    }

    if (customOptions) {
      return value
    }

    // Find the full object for non-custom options
    const selectedOption = options.find(option => option.uid === value)
    return selectedOption || null
  }

  // Always render; show non-interactive view when disabled

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
      defaultValue={defaultValue}
      render={({ field }) => {
        const currentValue = (() => {
          if (!field.value) return allowEmptyOption ? '__empty__' : ''
          return typeof field.value === 'string'
            ? field.value
            : field.value?.uid || ''
        })()

        if (disabled) {
          return (
            <div className={baseClasses} aria-disabled={true}>
              <span className="font-medium text-muted-foreground flex items-center gap-1">
                {label}:
              </span>
              <div className="text-right max-w-[60%] flex-1 min-w-0 overflow-hidden">
                <span className="block w-full truncate text-foreground">
                  {(() => {
                    if (!field.value)
                      return allowEmptyOption ? emptyOption : 'N/A'
                    return typeof field.value === 'string'
                      ? field.value
                      : field.value?.name || 'N/A'
                  })()}
                </span>
              </div>
            </div>
          )
        }

        return (
          <div>
            <Select
              value={currentValue}
              onValueChange={value => {
                const processedValue = handleChange(value)
                field.onChange(processedValue)
              }}
              open={isEditing}
              onOpenChange={setIsEditing}
            >
              <SelectPrimitive.Trigger
                data-slot="select-trigger"
                className={cn(baseClasses, 'border-primary cursor-pointer')}
              >
                <span className="font-medium text-muted-foreground flex items-center gap-1">
                  {label}:
                </span>
                <div className="text-right max-w-[60%] flex items-center gap-1 flex-1 min-w-0 overflow-hidden">
                  <span className="block w-full truncate text-foreground">
                    <SelectValue
                      placeholder={
                        customOptions && allowEmptyOption
                          ? emptyOption
                          : 'Select an option'
                      }
                    />
                  </span>
                  <SelectPrimitive.Icon asChild>
                    <ChevronsDown className="size-3 text-muted-foreground" />
                  </SelectPrimitive.Icon>
                </div>
              </SelectPrimitive.Trigger>

              <SelectContent className="w-[var(--radix-select-trigger-width)]">
                {options
                  ?.filter(item => item.uid && item.uid.trim() !== '')
                  .map(item => (
                    <SelectItem
                      key={item.uid || crypto.randomUUID()}
                      value={item.uid}
                    >
                      {item.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        )
      }}
    />
  )
}
