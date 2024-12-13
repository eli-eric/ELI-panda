import { Controller, useFormContext } from 'react-hook-form'

import { InputWrapper, Label } from '@/components/form/inputs/shared'
import { classNames } from '@/utils'

type Props = {
  name: string
  options: RadioSelectOption[]
  defaultValue: string
  onChange?: (value: string) => void
}

export type RadioSelectOption = {
  label: string
  value: string
  disabled?: boolean
}

export const RadioSelect = ({
  name,
  options,
  defaultValue,
  onChange
}: Props) => {
  const { control } = useFormContext()
  const idHtml = name

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <InputWrapper>
          <Label label="Media Type" />
          <div className="flex space-x-2 pt-2">
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  {...field}
                  id={`${idHtml}-${index}`}
                  type="radio"
                  value={option.value}
                  disabled={option.disabled}
                  checked={field.value === option.value}
                  onChange={e => {
                    field.onChange(e.target.value)
                    onChange?.(e.target.value)
                  }}
                  className={classNames(
                    'form-radio h-4 w-4 text-primary-600 border-gray-300',
                    option.disabled && 'cursor-not-allowed bg-gray-100'
                  )}
                />
                <label htmlFor={`${idHtml}-${index}`}>{option.label}</label>
              </div>
            ))}
          </div>
        </InputWrapper>
      )}
    />
  )
}
