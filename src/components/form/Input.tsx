import React, { Fragment } from 'react'
import type { FieldValues, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'

import { classNames } from '@/helpers'
import type { FieldProps } from '@/types/form'

import { ValidationIcon } from './Icons'

const InputWrapper = ({
  hidden,
  className,
  children
}: {
  hidden?: boolean
  className?: string
  children: React.ReactNode
}) => (
  <div
    hidden={hidden}
    className={classNames(
      'block w-full appearance-none placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm',
      className
    )}
  >
    {children}
  </div>
)
const Label = ({ label }: { label?: string }) =>
  label ? <label className="text-sm font-medium text-gray-700">{label}</label> : null

export type InputProps = FieldProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    unit?: string
    onChange?: (value: string) => void
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
  onChange,
  unit
}: InputProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={''}
      render={({ field, fieldState: { error } }) => (
        <InputWrapper hidden={hidden} className={className}>
          <Label label={label} />
          <div hidden={hidden} className="relative">
            <input
              {...field}
              hidden={hidden}
              step="0.001"
              type={type}
              disabled={disabled}
              onChange={e => {
                if (onChange) {
                  field.onChange(onChange(e.target.value))
                } else {
                  field.onChange(e.target.value)
                }
              }}
              placeholder={placeholder}
              className={classNames(
                'block w-full appearance-none border px-3 py-2 placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm',
                rounded,
                error ? 'border-red-500' : 'border-gray-300',
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
        </InputWrapper>
      )}
    />
  )
}

type TextAreaWithErrorProps = FieldProps & React.InputHTMLAttributes<HTMLTextAreaElement>

export const TextArea = ({ name, placeholder, disabled, rounded, label, className }: TextAreaWithErrorProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={''}
      render={({ field, fieldState: { error } }) => (
        <InputWrapper className={className}>
          <Fragment>
            <Label label={label} />
            <textarea
              {...field}
              rows={3}
              disabled={disabled}
              placeholder={placeholder}
              className={classNames(
                'block w-full appearance-none px-3 py-2 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm border',
                rounded,
                error ? 'border-red-500' : 'border-gray-300',
                disabled ? 'bg-gray-100' : ''
              )}
            />
            {error && <ValidationIcon />}
          </Fragment>
        </InputWrapper>
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
  className,
  hidden,
  label
}: InputAmountProps) => {
  const currencyOptions = ['EUR', 'USD', 'CZK', 'HUF', 'RON', 'GBP']
  const { control, register } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={''}
      render={({ field, fieldState: { error } }) => (
        <InputWrapper hidden={hidden} className={className}>
          <Label label={label} />
          <div hidden={hidden} className="relative">
            <input
              {...field}
              hidden={hidden}
              type={'number'}
              step="0.001"
              disabled={disabled}
              placeholder={placeholder}
              className={classNames(
                'block w-full appearance-none border px-3 py-2 placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm',
                rounded,
                error ? 'border-red-500' : 'border-gray-300',
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
        </InputWrapper>
      )}
    />
  )
}
