import React from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

import { FieldProps } from '@/types/form'

export type Option = {
  value: string | number | readonly string[] | undefined
  disabled?: boolean | undefined
  name?: string | undefined
  children?: JSX.Element
}

interface Props<T extends FieldValues>
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  register: UseFormRegister<T>
  options?: Option[]
  name: string
}

export const Select = <T extends FieldValues>({
  register,
  options,
  name,
  ...rest
}: Props<T>) => (
  <select
    {...register(name as Path<T>)}
    {...rest}
    defaultValue={options ? options[0].value : ''}
  >
    {options &&
      options.map((option, index) => (
        <option key={index} value={option.value} disabled={option.disabled}>
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

export const SelectWithError = <T extends FieldValues>({
  isError,
  options,
  rounded,
  label,
  padding,
  disabled,
  className,
  ...rest
}: SelectWithErrorProps<T>) => (
  <div
    className={`${
      padding && 'px-1'
    } block z-10 relative w-full appearance-none placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm`}
  >
    {label && (
      <label className="text-sm font-medium text-gray-700">{label}</label>
    )}
    <Select
      {...rest}
      options={options}
      disabled={disabled}
      className={`${className} block w-full ${
        disabled ? 'bg-gray-100' : ''
      } appearance-none ${rounded} border ${
        isError ? 'border-red-500' : 'border-gray-300'
      } px-3 py-2 placeholder-gray-400 mt-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm`}
    />
  </div>
)
