import React from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

export type Option = {
  value: string | number | readonly string[] | undefined
  disabled?: boolean | undefined
  name?: string
}

interface Props<T extends FieldValues>
  extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  register: UseFormRegister<T>
  options: Option[]
  name: string
}

export const Select = <T extends FieldValues>({ register, options, name, ...rest }: Props<T>) => {
  return (
    <select {...register(name as Path<T>)} {...rest} defaultValue={options[0].value}>
      {options.map((option, index) => (
        <option key={index} value={option.value} disabled={option.disabled}>
          {option.name ? option.name : option.value}
        </option>
      ))}
    </select>
  )
}

interface SelectWithErrorProps<T extends FieldValues> {
  register: UseFormRegister<T>
  name: string
  isError: boolean

  options: Option[]

  rounded?: 'rounded-l-md' | 'rounded-t-md' | 'rounded-r-md' | 'rounded-b-md' | 'rounded-md'
}

export const SelectWithError = <T extends FieldValues>({
  register,
  name,
  isError,
  options,
  rounded
}: SelectWithErrorProps<T>) => (
  <div className="block relative w-full appearance-none placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm">
    <Select
      register={register}
      name={name}
      options={options}
      className={`block w-full appearance-none ${rounded} border ${
        !isError ? 'border-red-500' : 'border-gray-300'
      } px-3 py-2 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm`}
    />
  </div>
)
