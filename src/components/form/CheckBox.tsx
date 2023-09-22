import { Controller } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'

import type { FieldProps } from '@/types/form'
import { classNames } from '@/utils'

type InputProps = FieldProps & React.InputHTMLAttributes<HTMLInputElement>

const CheckBox = ({ name, placeholder, disabled, className, hidden, label, ...restProps }: InputProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={classNames('relative flex items-start', className)}>
          <div className="flex h-5 items-center">
            <input
              {...field}
              {...restProps}
              defaultValue={undefined}
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
      )}
    />
  )
}

export default CheckBox
