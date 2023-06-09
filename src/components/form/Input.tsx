import React from 'react'
import type { FieldValues, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'

import { classNames } from '@/helpers'
import type { FieldProps } from '@/types/form'

import { ValidationIcon } from './Icons'

export type InputProps = FieldProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    unit?: string
  }

export const Input = ({
  name,
  placeholder,
  disabled,
  rounded,
  type = 'text',
  className,
  hidden,
  label,
  unit,
  ...restProps
}: InputProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={''}
      render={({ field, formState }) => (
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
              {...field}
              {...restProps}
              hidden={hidden}
              step="0.001"
              type={type}
              disabled={disabled}
              placeholder={placeholder}
              className={classNames(
                'block w-full appearance-none border px-3 py-2 placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm',
                rounded,
                formState.errors?.[name] ? 'border-red-500' : 'border-gray-300',
                disabled ? 'bg-gray-100' : ''
              )}
            />

            {unit && (
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-400 sm:text-sm">{unit}</span>
              </div>
            )}
            {/* {isError && <ValidationIcon />} */}
          </div>
        </div>
      )}
    />
  )
}

type TextAreaWithErrorProps = FieldProps & React.InputHTMLAttributes<HTMLTextAreaElement>

export const TextArea = ({
  name,
  placeholder,
  disabled,
  rounded,
  label,
  className,
  ...restProps
}: TextAreaWithErrorProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={''}
      render={({ field, formState }) => (
        <div
          className={classNames(
            'block relative w-full appearance-none placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm',
            className
          )}
        >
          {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
          <textarea
            {...field}
            {...restProps}
            rows={3}
            disabled={disabled}
            placeholder={placeholder}
            className={classNames(
              'block w-full appearance-none px-3 py-2 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm border',
              rounded,
              formState.errors?.[name] ? 'border-red-500' : 'border-gray-300',
              disabled ? 'bg-gray-100' : ''
            )}
          />
          {formState.errors?.[name] && <ValidationIcon />}
        </div>
      )}
    />
  )
}

type InputAmountProps = FieldProps & React.InputHTMLAttributes<HTMLInputElement>

export const InputAmount = <T extends FieldValues>({
  name,
  placeholder,
  disabled,
  rounded,
  type = 'number',
  className,
  hidden,
  label,
  ...restProps
}: InputAmountProps) => {
  const currencyOptions = ['EUR', 'USD', 'CZK', 'HUF', 'RON', 'GBP']
  const { control, register } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={''}
      render={({ field, formState }) => (
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
              {...field}
              {...restProps}
              hidden={hidden}
              name={name}
              type={type}
              step="0.001"
              disabled={disabled}
              placeholder={placeholder}
              className={classNames(
                'block w-full appearance-none border px-3 py-2 placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm',
                rounded,
                formState.errors?.[name] ? 'border-red-500' : 'border-gray-300',
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
      )}
    />
  )
}
