import { useId, useState } from 'react'
import { Controller } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'

import type { FieldProps } from '@/types/form'
import { classNames } from '@/utils'

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  defaultChecked?: boolean
  hidden?: boolean
}

export const CheckBoxComponent = ({
  disabled,
  className,
  hidden,
  label,
  defaultChecked,
  ...restProps
}: CheckBoxProps) => {
  const [checked, setChecked] = useState(defaultChecked)
  const id = useId()

  return (
    <div className={classNames('relative flex items-start', className)}>
      <div className="flex h-5 items-center">
        <input
          id={'checkbox' + id}
          onChange={e => {
            restProps.onChange && restProps.onChange(e)
            setChecked(e.target.checked)
          }}
          checked={checked}
          hidden={hidden}
          type="checkbox"
          disabled={disabled}
          className="h-5 w-5 rounded border-primary-300 dark:bg-gray-700 text-primary-600 focus:ring-primary-500  hover:cursor-pointer"
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={'checkbox' + id} className="font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
        <span className="text-gray-500">
          <span className="sr-only">{label}</span>
        </span>
      </div>
    </div>
  )
}

type InputProps = FieldProps & React.InputHTMLAttributes<HTMLInputElement>

const CheckBox = ({
  name,
  placeholder,
  disabled,
  className,
  hidden,
  label,
  defaultChecked,
  ...restProps
}: InputProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultChecked}
      render={({ field }) => (
        <div className={classNames('relative flex items-start', className)}>
          <div className="flex h-5 items-center">
            <input
              {...field}
              onChange={e => {
                restProps.onChange && restProps.onChange(e)
                field.onChange(e)
              }}
              checked={field.value}
              hidden={hidden}
              type="checkbox"
              disabled={disabled}
              placeholder={placeholder}
              className="h-5 w-5 rounded border-primary-300 text-primary-600 focus:ring-primary-500  hover:cursor-pointer"
            />
          </div>
          <div className="ml-3 text-sm">
            <label className="font-medium text-gray-700 dark:text-gray-200">{label}</label>
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
