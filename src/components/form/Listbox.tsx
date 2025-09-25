import React, { useEffect, useMemo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useCodebook } from '@/hooks/fetch/useCodebook'
import { cn } from '@/lib/utils'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps } from '@/types/form'
import type { CodebookType } from '@/types/responses/codebook'

export type ListboxPropsT = FieldProps & {
  codebook?: CODEBOOK
  position?: 'top' | 'bottom'
  allowEmptyOption?: boolean
  emptyOption?: string
  optionsSize?: 'sm' | 'md' | 'lg'
  customOptions?: string[] | any[]
  unit?: string
  customLabel?: string
  codebookResponse?: CodebookType[]
  onChange?: (value: any) => void
  className?: string
  defaultValue?: CodebookType[] | string | null
  onClickIcon?: () => void
  children?: React.ReactNode
  onClick?: () => void
  isFilter?: boolean
}

const Listbox = ({
  codebook,
  defaultValue = null,
  name,
  label,
  disabled,
  allowEmptyOption = false,
  emptyOption = 'None',
  className,
  customOptions,
  customLabel,
  codebookResponse,
  placeholder,
  onChange,
  children,
  onClick,
  isFilter
}: ListboxPropsT) => {
  const { control, setValue, getValues } = useFormContext()
  const intl = useIntl()

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
        ...customOptions.map(item =>
          typeof item === 'object' && item !== null && 'uid' in item && 'name' in item
            ? item
            : { uid: item, name: item }
        )
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

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => {
        const currentValue = (() => {
          if (!field.value) return allowEmptyOption ? '__empty__' : ''
          return typeof field.value === 'string'
            ? field.value
            : field.value?.uid || ''
        })()

        return (
          <div className={cn('space-y-1 w-full', className)}>
            {(customLabel || label) && (
              <Label>
                {customLabel ? customLabel : intl.formatMessage({ id: label })}
              </Label>
            )}

            <Select
              value={currentValue}
              onValueChange={value => {
                const processedValue = handleChange(value)
                field.onChange(processedValue)
                onChange && onChange(processedValue)
              }}
              disabled={disabled}
            >
              <SelectTrigger
                className={cn(
                  'w-full',
                  error && 'border-destructive',
                  isFilter && field.value && 'border-2 border-lime-500'
                )}
                onClick={onClick}
                aria-invalid={error ? 'true' : 'false'}
              >
                <SelectValue
                  placeholder={
                    placeholder ||
                    (customOptions && allowEmptyOption
                      ? emptyOption
                      : 'Select an option')
                  }
                />
              </SelectTrigger>

              <SelectContent>
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

            {error && (
              <p className="text-sm text-destructive">{error.message}</p>
            )}

            {children}
          </div>
        )
      }}
    />
  )
}

export default Listbox
