import { useId } from 'react'
import { Controller } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'

import { cn } from '@/lib/utils'
import type { FieldProps } from '@/types/form'

import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

//TODO:refactor checkboxes
interface CheckBoxProps {
  label: string
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  hidden?: boolean
  className?: string
  onChange?: (checked: boolean) => void
}

export const CheckBoxComponent = ({
  disabled,
  className,
  hidden,
  label,
  checked,
  defaultChecked,
  onChange
}: CheckBoxProps) => {
  const id = useId()

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Checkbox
        id={'checkbox' + id}
        onCheckedChange={onChange}
        checked={checked}
        hidden={hidden}
        disabled={disabled}
        defaultChecked={defaultChecked}
      />
      <Label htmlFor={'checkbox' + id}>{label}</Label>
    </div>
  )
}

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
        <div className={cn('flex items-center space-x-2', className)}>
          <Checkbox
            id={htmlFor}
            onCheckedChange={checked => {
              restProps.onChange &&
                restProps.onChange({ target: { checked } } as any)
              field.onChange(checked)
            }}
            checked={field.value || false}
            hidden={hidden}
            disabled={disabled}
            defaultChecked={restProps.defaultChecked}
          />
          <Label htmlFor={htmlFor}>{label}</Label>
        </div>
      )}
    />
  )
}

export default CheckBox
