import { useId } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import type { FieldProps } from '@/types/form'
import { classNames } from '@/utils'

import { InputWrapper, Label } from './shared'
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
  const id = useId()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <InputWrapper hidden={hidden} className={className}>
          <Label htmlFor={id} label={label} />
          <div hidden={hidden} className="relative">
            <input
              {...field}
              id={id}
              hidden={hidden}
              type={'number'}
              step="0.001"
              disabled={disabled}
              placeholder={placeholder}
              className={classNames(
                'form-field',
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
