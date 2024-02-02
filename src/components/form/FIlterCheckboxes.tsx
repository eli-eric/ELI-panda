import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { CheckBoxComponent } from './CheckBox'

interface Props {
  name: string
  label: string
  onChange?: (v: any) => void
  isFilter?: boolean
  options?: string[]
}

export const FilterCheckboxes = ({ name, label, onChange, options }: Props) => {
  const { control } = useFormContext()

  return (
    <div className="flex flex-col">
      <span className="text-sm pb-1 font-medium text-gray-700 dark:text-gray-200">{label}</span>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field }) => {
          const fieldValue = field.value as string[] | undefined
          return (
            <div className="w-full">
              {options?.map(option => (
                <CheckBoxComponent
                  checked={fieldValue?.includes(option) || false}
                  defaultChecked={fieldValue?.includes(option) || false}
                  onChange={e => {
                    const value = e.target.checked
                      ? [...(fieldValue || []), option]
                      : fieldValue?.filter(item => item !== option)
                    field.onChange(value)
                    onChange && onChange(value)
                  }}
                  key={option}
                  className="pb-1"
                  label={option}
                />
              ))}
            </div>
          )
        }}
      />
    </div>
  )
}
