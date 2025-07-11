import { useId } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { cn } from '@/lib/utils'
import type { FieldProps } from '@/types/form'

import { InputWrapper, Label } from '../shared'

type InputProps = FieldProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    unit?: string
    onChange?: (value: string | number | readonly string[] | undefined) => void
    isFilter?: boolean
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
  defaultValue
}: InputProps) => {
  const { control } = useFormContext()
  const idHtml = useId()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field, fieldState: { error } }) => (
        <InputWrapper hidden={hidden} className={className}>
          <Label htmlFor={idHtml} label={label} />
          <div className="flex">
            <div hidden={hidden} className="relative flex w-full">
              <input
                {...field}
                data-testid={name}
                type="date"
                id={idHtml}
                hidden={hidden}
                disabled={disabled}
                onChange={e => {
                  if (onChange) {
                    field.onChange(onChange(e.target.value))
                  } else {
                    field.onChange(e.target.value)
                  }
                }}
                placeholder={placeholder}
                className={cn(
                  'form-field',
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
