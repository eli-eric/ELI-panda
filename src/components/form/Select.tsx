import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { classNames } from '@/helpers'
import type { FieldProps } from '@/types/form'

export type Option = {
  value: string | number | readonly string[] | undefined
  disabled?: boolean | undefined
  name?: string | undefined
  children?: JSX.Element
}

export type SelectWithErrorProps = FieldProps &
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    options?: Option[]
    unit?: string
  }

//TODO: refactor all usage with ListBox
export const SelectWithError = ({
  options,
  rounded,
  label,
  disabled,
  className,
  name,
  unit,
  ...rest
}: SelectWithErrorProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState }) => (
        <div
          className={classNames(
            'block z-10 relative w-full appearance-none placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm',
            className
          )}
        >
          {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
          <select
            {...field}
            {...rest}
            disabled={disabled}
            className={classNames(
              'w-full block appearance-none borde px-3 py-2 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm',
              rounded,
              disabled ? 'bg-gray-100' : '',
              formState.errors?.[name] ? 'border-red-500' : 'border-gray-300'
            )}
          >
            {options &&
              options.map((option, index) => (
                <option
                  key={index}
                  value={option.value}
                  disabled={option.disabled}
                  className="relative cursor-default select-none py-2 pl-3 pr-9"
                >
                  {option.name ? option.name : option.value}
                </option>
              ))}
          </select>
          {unit && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-gray-500 sm:text-sm">{unit}</span>
            </div>
          )}
        </div>
      )}
    />
  )
}
