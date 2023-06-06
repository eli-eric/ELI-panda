import React from 'react'
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form'

import { classNames } from '@/helpers'
import type { FieldProps } from '@/types/form'

export type Option = {
  value: string | number | readonly string[] | undefined
  disabled?: boolean | undefined
  name?: string | undefined
  children?: JSX.Element
}

interface Props<T extends FieldValues>
  extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  register: UseFormRegister<T>
  options?: Option[]
  name: string
}

export const Select = <T extends FieldValues>({ register, options, name, ...rest }: Props<T>) => (
  <select {...register(name as Path<T>)} {...rest}>
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
)

type SelectWithErrorProps<T extends FieldValues> = FieldProps &
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    options?: Option[]
    register: UseFormRegister<T>
  }

//TODO: refactor all usage with ListBox
export const SelectWithError = <T extends FieldValues>({
  isError,
  options,
  rounded,
  label,
  disabled,
  className,
  ...rest
}: SelectWithErrorProps<T>) => (
  <div
    className={classNames(
      'block z-10 relative w-full appearance-none placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm',
      className
    )}
  >
    {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
    <Select
      {...rest}
      options={options}
      disabled={disabled}
      className={classNames(
        'w-full block appearance-none borde px-3 py-2 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm',
        rounded,
        disabled ? 'bg-gray-100' : '',
        isError ? 'border-red-500' : 'border-gray-300'
      )}
    />
  </div>
)
