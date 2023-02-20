import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

import { ValidationIcon } from './Icons'

export function Input({ register, name, ...rest }) {
  return <input {...register(name)} {...rest} />
}

interface InputWithErrorProps<T extends FieldValues> {
  register: UseFormRegister<T>
  name: string
  isError: boolean
  placeholder?: string
  type?: string
  disabled?: boolean
  rounded?:
    | 'rounded-l-md'
    | 'rounded-t-md'
    | 'rounded-r-md'
    | 'rounded-b-md'
    | 'rounded-md'
}
export const InputWithError = <T extends FieldValues>({
  register,
  name,
  isError,
  placeholder,
  disabled,
  rounded,
  type = 'text',
}: InputWithErrorProps<T>) => (
  <div className="block z-10 relative w-full appearance-none placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm">
    <Input
      register={register}
      name={name}
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      className={`block w-full appearance-none ${rounded} border ${
        !isError ? 'border-red-500' : 'border-gray-300'
      } px-3 py-2 placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm ${
        disabled ? 'bg-gray-100' : ''
      }`}
    />
    {!isError && <ValidationIcon />}
  </div>
)
