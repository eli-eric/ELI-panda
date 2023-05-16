import React from 'react'
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form'

import { classNames } from '@/helpers'
import type { FieldProps } from '@/types/form'

import { ValidationIcon } from './Icons'

type InputProps<T extends FieldValues> = FieldProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    register: UseFormRegister<T>
  }

export const Input = <T extends FieldValues>({
  register,
  name,
  isError,
  placeholder,
  disabled,
  rounded,
  type = 'text',
  className,
  hidden,
  label,
  ...restProps
}: InputProps<T>) => (
  <div
    hidden={hidden}
    className={classNames(
      'block w-full appearance-none placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm',
      className
    )}
  >
    {label && (
      <label hidden={hidden} className="text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    <div hidden={hidden} className="relative">
      <input
        {...register(name as Path<T>)}
        {...restProps}
        hidden={hidden}
        name={name}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        className={classNames(
          'block w-full appearance-none border px-3 py-2 placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm',
          rounded,
          isError ? 'border-red-500' : 'border-gray-300',
          disabled ? 'bg-gray-100' : ''
        )}
      />

      {isError && <ValidationIcon />}
    </div>
  </div>
)

type TextAreaWithErrorProps<T extends FieldValues> = FieldProps &
  React.InputHTMLAttributes<HTMLTextAreaElement> & {
    register: UseFormRegister<T>
  }

export const TextArea = <T extends FieldValues>({
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
    className={classNames(
      'block relative w-full appearance-none placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm',
      className
    )}
  >
    {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
    <textarea
      {...restProps}
      rows={3}
      disabled={disabled}
      placeholder={placeholder}
      className={classNames(
        'block w-full appearance-none px-3 py-2 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm border',
        rounded,
        isError ? 'border-red-500' : 'border-gray-300',
        disabled ? 'bg-gray-100' : ''
      )}
      {...register(name as Path<T>)}
    />
    {isError && <ValidationIcon />}
  </div>
)

export const InputAmount = <T extends FieldValues>({
  register,
  name,
  isError,
  placeholder,
  disabled,
  rounded,
  type = 'number',
  className,
  hidden,
  label,
  ...restProps
}: InputProps<T>) => {
  const currencyOptions = ['EUR', 'USD', 'CZK', 'HUF', 'RON', 'GBP']

  return (
    <div
      hidden={hidden}
      className={classNames(
        'block z-10 w-full appearance-none placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm',
        className
      )}
    >
      {label && (
        <label hidden={hidden} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div hidden={hidden} className="relative">
        <input
          {...register(name as Path<T>)}
          {...restProps}
          hidden={hidden}
          name={name}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          className={classNames(
            'block w-full appearance-none border px-3 py-2 placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm',
            rounded,
            isError ? 'border-red-500' : 'border-gray-300',
            disabled ? 'bg-gray-100' : ''
          )}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <label htmlFor="currency" className="sr-only">
            Currency
          </label>
          <select
            id="currency"
            {...register('currency' as Path<T>)}
            name="currency"
            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm"
          >
            {currencyOptions.map(currency => (
              <option key={currency}>{currency}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
