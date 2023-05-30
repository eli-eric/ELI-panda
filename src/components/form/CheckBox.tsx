import type { FieldValues, Path, UseFormRegister } from 'react-hook-form'

import { classNames } from '@/helpers'
import type { FieldProps } from '@/types/form'

type InputProps<T extends FieldValues> = FieldProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    register: UseFormRegister<T>
  }

const CheckBox = <T extends FieldValues>({
  register,
  name,
  isError,
  placeholder,
  disabled,
  className,
  hidden,
  label,
  ...restProps
}: InputProps<T>) => (
  <div className={classNames('relative flex items-start', className)}>
    <div className="flex h-5 items-center">
      <input
        {...register(name as Path<T>)}
        {...restProps}
        hidden={hidden}
        type="checkbox"
        disabled={disabled}
        placeholder={placeholder}
        className="h-4 w-4 rounded border-primary-300 text-primary-600 focus:ring-primary-500"
      />
    </div>
    <div className="ml-3 text-sm">
      <label className="font-medium text-gray-700">{label}</label>
      <span className="text-gray-500">
        <span className="sr-only">{label}</span>
      </span>
    </div>
  </div>
)

export default CheckBox
