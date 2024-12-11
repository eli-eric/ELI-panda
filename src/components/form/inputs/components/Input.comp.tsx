import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useId, useState } from 'react'
import { Controller, useWatch } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { useDebounce, useIsFirstRender } from 'usehooks-ts'

import { Tooltip } from '@/components/Tooltip'
import type { FieldProps } from '@/types/form'
import { classNames } from '@/utils'

import { InputWrapper, Label } from '../shared'

export type InputProps = FieldProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    unit?: string
    onChange?: (value: string | number | readonly string[] | undefined) => void
    isFilter?: boolean
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
  isFilter,
  step = '0.001'
}: InputProps) => {
  const { control } = useFormContext()

  const [showPassword, setShowPassword] = useState(false)

  const inputValue = useWatch({
    control,
    name
  })

  const inputValueDebounced = useDebounce(inputValue, 500)
  const isFirstRender = useIsFirstRender()

  useEffect(() => {
    if (!isFirstRender && onChange) {
      onChange(inputValueDebounced)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValueDebounced])

  const toogleShowPassword = () => setShowPassword(!showPassword)

  const idHtml = useId()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field, fieldState: { error } }) => (
        <InputWrapper hidden={hidden} className={className}>
          <Label label={label} htmlFor={idHtml} />
          <div className="flex">
            <div hidden={hidden} className="relative flex w-full">
              <input
                {...field}
                step={step}
                value={field.value || ''}
                id={idHtml}
                hidden={hidden}
                type={
                  type === 'password'
                    ? showPassword
                      ? 'text'
                      : 'password'
                    : type
                }
                disabled={disabled}
                onChange={e => {
                  field.onChange(e.target.value)
                }}
                placeholder={placeholder}
                className={classNames(
                  'form-field',
                  rounded,
                  error ? 'border-red-499' : 'border-gray-300',
                  disabled ? 'bg-gray-100' : '',
                  isFilter ? field.value && 'border-2 border-lime-500' : ''
                )}
              />
              {type === 'password' && (
                <div className="absolute inset-y-0 right-0 cursor-pointer flex items-center pr-3">
                  {showPassword ? (
                    <Tooltip content="Hide password">
                      <EyeIcon
                        data-testid="toggle-password-visibility"
                        aria-label="Show password"
                        role="button"
                        className="text-gray-400 h-4 w-4 sm:text-sm cursor-pointer hover:text-gray-600 dark:text-gray-200"
                        onClick={toogleShowPassword}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip content="Show password">
                      <EyeSlashIcon
                        data-testid="toggle-password-visibility"
                        role="button"
                        aria-label="Hide password"
                        className="text-gray-400 h-4 w-4 sm:text-sm cursor-pointer hover:text-gray-600 dark:text-gray-200"
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
