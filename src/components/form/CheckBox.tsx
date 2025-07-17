import { useId } from 'react'
import { Controller } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'

import type { FieldProps } from '@/types/form'

import { CheckBoxWithLabel } from '../ui/checkbox'

type InputProps = FieldProps & React.InputHTMLAttributes<HTMLInputElement>

const CheckBox = ({
  name,
  disabled,
  className,
  hidden,
  label,
  ...restProps
}: InputProps) => {
  const { control } = useFormContext()

  const id = useId()

  const htmlFor = `checkbox-${id}-${name}`

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <CheckBoxWithLabel
          id={htmlFor}
          label={label}
          checked={field.value}
          onChange={field.onChange}
          disabled={disabled}
          className={className}
          hidden={hidden}
          defaultChecked={restProps.defaultChecked}
        />
      )}
    />
  )
}

export default CheckBox
