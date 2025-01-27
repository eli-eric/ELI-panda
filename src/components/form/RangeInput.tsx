import React, { useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { cx } from '@/utils'

interface Props {
  name: string
  label?: string
  onChange?: (v: any) => void
  required?: boolean
  placeholder?: { min: string; max: string }
  isFilter?: boolean
  disabled?: boolean
}

export const RangeInput = ({
  name,
  label,
  onChange,
  isFilter,
  disabled,
  placeholder
}: Props) => {
  const { control, watch, setError, clearErrors } = useFormContext()

  const inputValues = watch(name)

  useEffect(() => {
    if (inputValues) {
      clearErrors(name)
      const handler = setTimeout(() => {
        onChange &&
          onChange({
            min: inputValues.min !== '' ? inputValues.min : null,
            max: inputValues.max !== '' ? inputValues.max : null
          })
      }, 500)
      return () => clearTimeout(handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValues, clearErrors, name, setError])

  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </span>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          const fieldValue = field.value || {}
          return (
            <div className="w-full">
              <div className="flex pt-1 gap-14 w-full justify-between">
                <input
                  name={'min' + name}
                  type="number"
                  pattern="[0-9]*"
                  placeholder={placeholder?.min || 'Min'}
                  className={cx(
                    'form-field rounded-md border-gray-200 border-1 px-2 py-1 text-sm',
                    isFilter && fieldValue?.min && 'border-green-500',
                    error && 'border-red-500',
                    disabled && 'bg-gray-100 cursor-not-allowed'
                  )}
                  value={fieldValue.min ?? ''}
                  onChange={e => {
                    const value =
                      e.target.value === '' ? '' : Number(e.target.value)
                    field.onChange({
                      min: value,
                      max: fieldValue?.max
                    })
                  }}
                />
                <input
                  name={'max' + name}
                  type="number"
                  pattern="[0-9]*"
                  placeholder={placeholder?.max || 'Max'}
                  onChange={e => {
                    const value =
                      e.target.value === '' ? '' : Number(e.target.value)
                    field.onChange({
                      min: fieldValue?.min,
                      max: value
                    })
                  }}
                  className={cx(
                    'form-field rounded-md border-gray-200 border-1 px-2 py-1 text-sm',
                    isFilter && fieldValue?.max && 'border-green-500',
                    error && 'border-red-500',
                    disabled && 'bg-gray-100 cursor-not-allowed'
                  )}
                  value={fieldValue.max ?? ''}
                />
              </div>
            </div>
          )
        }}
      />
    </div>
  )
}
