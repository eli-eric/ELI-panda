import { Fragment, useId } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import type { FieldProps } from '@/types/form'
import { classNames } from '@/utils'

import { ValidationIcon } from '../../Icons'
import { InputWrapper, Label } from '../shared'

type TextAreaWithErrorProps = FieldProps &
  React.InputHTMLAttributes<HTMLTextAreaElement>

export const TextArea = ({
  name,
  placeholder,
  disabled,
  rounded,
  label,
  className,
  isFilter,
  defaultValue
}: TextAreaWithErrorProps) => {
  const { control } = useFormContext()
  const id = useId()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field, fieldState: { error } }) => (
        <InputWrapper className={className}>
          <Fragment>
            <Label htmlFor={id} label={label} />
            <textarea
              {...field}
              value={field.value || ''}
              id={id}
              rows={3}
              disabled={disabled}
              placeholder={placeholder}
              className={classNames(
                'form-field',
                rounded,
                error ? 'border-red-500' : 'border-gray-300',
                disabled ? 'bg-gray-100' : '',
                isFilter ? field.value && 'border-2 border-lime-500' : ''
              )}
            />
            {error && <ValidationIcon data-testid="validation-icon" />}
          </Fragment>
        </InputWrapper>
      )}
    />
  )
}
