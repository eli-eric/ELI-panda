import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { classNames } from '@/utils'

interface Props {
  name: string
  label: string
  onChange?: (v: any) => void
  isFilter?: boolean
}

export const RangeInput = ({ name, label, onChange, isFilter }: Props) => {
  const { control } = useFormContext()

  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const fieldValue = field.value
          return (
            <div className="w-full">
              <div className="flex pt-1 gap-14 w-full justify-between">
                <input
                  name={'min' + name}
                  type="number"
                  pattern="[0-9]*"
                  placeholder="Min"
                  className={classNames(
                    'form-field rounded-md border-gray-200 border-1 px-2 py-1 text-sm',
                    isFilter && field.value?.min && 'border-green-500'
                  )}
                  value={fieldValue?.min || ''}
                  onChange={e => {
                    const value = Number(e.target.value)
                    field.onChange({
                      min: value,
                      max: fieldValue?.max
                    })
                    onChange && onChange({ min: value || null, max: fieldValue?.max })
                  }}
                />
                <input
                  name={'max' + name}
                  type="number"
                  pattern="[0-9]*"
                  placeholder="Max"
                  onChange={e => {
                    const value = Number(e.target.value)
                    field.onChange({
                      min: fieldValue?.min,
                      max: value
                    })
                    onChange && onChange({ min: fieldValue?.min, max: value || null })
                  }}
                  className={classNames(
                    'form-field rounded-md border-gray-200 border-1 px-2 py-1 text-sm',
                    isFilter && fieldValue?.max && 'border-green-500'
                  )}
                  value={fieldValue?.max || ''}
                />
              </div>
            </div>
          )
        }}
      />
    </div>
  )
}
