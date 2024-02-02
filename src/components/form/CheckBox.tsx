import { useId, useState } from 'react'
import { Controller } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'

import type { FieldProps } from '@/types/form'
import { classNames } from '@/utils'

//TODO:refactor checkboxes
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
  checked: _checked,
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
          checked={_checked || checked}
          hidden={hidden}
          type="checkbox"
          disabled={disabled}
          className={classNames(
            'focus:ring-primary-500 h-5 w-5 text-primary-600 dark:text-primary-600 rounded',
            !_checked && !checked && 'dark:bg-gray-700'
          )}
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
              className={classNames(
                'focus:ring-primary-500 h-5 w-5 text-primary-600 dark:text-primary-600 rounded',
                !field.value && 'dark:bg-gray-700'
              )}
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
