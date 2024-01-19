import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import React, { Fragment, useEffect, useState } from 'react'
import { Controller, useWatch } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { useDebounce } from 'usehooks-ts'

import type { FieldProps } from '@/types/form'
import { classNames } from '@/utils'

import { Tooltip } from '../Tooltip'
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
    onChange?: (value: string | number | readonly string[] | undefined) => void
    fieldClassName?: string
  }
export const Input = ({
  name,
  placeholder,
  disabled,
  rounded,
  type = 'text',
  className,
  children,
  hidden,
  label,
  onChange,
  unit,
  defaultValue,
  id,
  fieldClassName
}: InputProps) => {
  const { control } = useFormContext()

  const [showPassword, setShowPassword] = useState(false)

  const inputValue = useWatch({
    control,
    name
  })

  const inputValueDebounced = useDebounce(inputValue, 500)

  useEffect(() => {
    if (onChange) {
      onChange(inputValueDebounced)
    }
  }, [inputValueDebounced])

  const toogleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field, fieldState: { error } }) => (
        <InputWrapper hidden={hidden} className={className}>
          <Label label={label} />
          <div className="flex">
            <div hidden={hidden} className="relative flex w-full">
              <input
                {...field}
                id={id}
                hidden={hidden}
                step="0.001"
                type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                disabled={disabled}
                onChange={e => {
                  field.onChange(e.target.value)
                }}
                placeholder={placeholder}
                className={classNames(
                  'block w-full appearance-none border px-3 py-2 placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm',
                  rounded,
                  error ? 'border-red-500' : 'border-gray-300',
                  disabled ? 'bg-gray-100' : '',
                  fieldClassName
                )}
              />
              {type === 'password' && (
                <div className="absolute inset-y-0 right-0 cursor-pointer flex items-center pr-3">
                  {showPassword ? (
                    <Tooltip content="Hide password">
                      <EyeIcon
                        className="text-gray-400 h-4 w-4 sm:text-sm cursor-pointer hover:text-gray-600"
                        onClick={toogleShowPassword}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip content="Show password">
                      <EyeSlashIcon
                        className="text-gray-400 h-4 w-4 sm:text-sm cursor-pointer hover:text-gray-600"
                        onClick={toogleShowPassword}
                      />
                    </Tooltip>
                  )}
                </div>
              )}

              {unit && (
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-400 sm:text-sm">{unit}</span>
                </div>
              )}
              {/* {isError && <ValidationIcon />} */}
            </div>
            {children}
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

export const InputAmount = ({
  name,
  placeholder,
  disabled,
  rounded,
  className,
  hidden,
  label,
  children
}: InputAmountProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
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
            {children}
          </div>
        </InputWrapper>
      )}
    />
  )
}

export const InputCurrency = ({ name }: InputAmountProps) => {
  const currencyOptions = ['EUR', 'USD', 'CZK', 'HUF', 'RON', 'GBP']
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={currencyOptions[0]}
      render={({ field }) => (
        <div className="absolute inset-y-0 right-0 flex items-center">
          <label htmlFor="currency" className="sr-only">
            Currency
          </label>
          <select
            {...field}
            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm"
          >
            {currencyOptions.map(currency => (
              <option key={currency}>{currency}</option>
            ))}
          </select>
        </div>
      )}
    />
  )
}

export const InputDate = ({
  name,
  placeholder,
  disabled,
  rounded,
  className,
  hidden,
  label,
  onChange,
  defaultValue,
  id
}: InputProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field, fieldState: { error } }) => (
        <InputWrapper hidden={hidden} className={className}>
          <Label label={label} />
          <div className="flex">
            <div hidden={hidden} className="relative flex w-full">
              <input
                {...field}
                type="date"
                id={id}
                hidden={hidden}
                step="0.001"
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
            </div>
          </div>
        </InputWrapper>
      )}
    />
  )
}
