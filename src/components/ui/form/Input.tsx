import React from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

import { ValidationIcon } from './Icons'

export function Input({ register, name, ...rest }) {
  return <input {...register(name)} {...rest} />
}

interface InputWithErrorProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<T>
  name: string
  isError?: boolean
  placeholder?: string
  type?: string
  disabled?: boolean
  rounded?:
    | 'rounded-l-md'
    | 'rounded-t-md'
    | 'rounded-r-md'
    | 'rounded-b-md'
    | 'rounded-md'
  label?: string
}
export const InputWithError = <T extends FieldValues>({
  register,
  name,
  isError,
  placeholder,
  disabled,
  rounded,
  type = 'text',
  label,
  ...restProps
}: InputWithErrorProps<T>) => (
  <div className="block z-10 relative w-full appearance-none placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm">
    {label && (
      <label className="text-sm font-medium text-gray-700">{label}</label>
    )}
    <Input
      {...restProps}
      register={register}
      name={name}
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      className={`block w-full appearance-none ${rounded} border ${
        isError ? 'border-red-500' : 'border-gray-300'
      } px-3 py-2 placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm ${
        disabled ? 'bg-gray-100' : ''
      }`}
    />
    {isError && <ValidationIcon />}
  </div>
)

interface TextAreaWithErrorProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  register: UseFormRegister<T>
  name: string
  isError?: boolean
  placeholder?: string
  type?: string
  disabled?: boolean
  rounded?:
    | 'rounded-l-md'
    | 'rounded-t-md'
    | 'rounded-r-md'
    | 'rounded-b-md'
    | 'rounded-md'
  label?: string
}

export const TextareaWithError = <T extends FieldValues>({
  register,
  name,
  isError,
  placeholder,
  disabled,
  rounded,
  ...restProps
}: TextAreaWithErrorProps<T>) => (
  <div className="block z-10 relative w-full appearance-none placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm">
    <textarea
      {...restProps}
      rows={4}
      disabled={disabled}
      placeholder={placeholder}
      className={`h-44 block w-full appearance-none ${rounded} border ${
        isError ? 'border-red-500' : 'border-gray-300'
      } px-3 py-2 placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm ${
        disabled ? 'bg-gray-100' : ''
      }`}
      {...register(name as Path<T>)}
    />
    {isError && <ValidationIcon />}
  </div>
)
