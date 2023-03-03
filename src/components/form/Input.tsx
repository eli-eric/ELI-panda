import React from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

import { FieldProps } from '@/types/form'

import { ValidationIcon } from './Icons'

export function Input({ register, name, ...rest }) {
  return <input {...register(name)} {...rest} />
}

type InputWithErrorProps<T extends FieldValues> = FieldProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    register: UseFormRegister<T>
  }

export const InputWithError = <T extends FieldValues>({
  register,
  name,
  isError,
  placeholder,
  disabled,
  rounded,
  padding,
  type = 'text',
  className,
  label,
  ...restProps
}: InputWithErrorProps<T>) => (
  <div
    className={`${className} block z-10 relative w-full appearance-none placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm`}
  >
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
      } px-3 py-2 placeholder-gray-400  focus:border-primary-500 mt-2 focus:outline-none focus:ring-primary-500 sm:text-sm ${
        disabled ? 'bg-gray-100' : ''
      }`}
    />
    {isError && <ValidationIcon />}
  </div>
)

type TextAreaWithErrorProps<T extends FieldValues> = FieldProps &
  React.InputHTMLAttributes<HTMLTextAreaElement> & {
    register: UseFormRegister<T>
  }

export const TextareaWithError = <T extends FieldValues>({
  register,
  name,
  isError,
  placeholder,
  disabled,
  rounded,
  label,
  className,
  ...restProps
}: TextAreaWithErrorProps<T>) => (
  <div
    className={`${className} block z-10 relative w-full appearance-none placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm`}
  >
    {label && (
      <label className="text-sm font-medium text-gray-700">{label}</label>
    )}
    <textarea
      {...restProps}
      rows={3}
      disabled={disabled}
      placeholder={placeholder}
      className={`block w-full appearance-none ${rounded} border ${
        isError ? 'border-red-500' : 'border-gray-300'
      } px-3 py-2 placeholder-gray-400 mt-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm ${
        disabled ? 'bg-gray-100' : ''
      }`}
      {...register(name as Path<T>)}
    />
    {isError && <ValidationIcon />}
  </div>
)
