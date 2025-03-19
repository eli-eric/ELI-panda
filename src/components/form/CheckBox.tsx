import { useId } from 'react'
import { Controller } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'

import type { FieldProps } from '@/types/form'
import { cx } from '@/utils'

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
  checked,
  ...restProps
}: CheckBoxProps) => {
  const id = useId()

  return (
    <div className={cx('relative flex items-start', className)}>
      <div className="flex h-5 items-center">
        <input
          id={'checkbox' + id}
          onChange={e => {
            restProps.onChange && restProps.onChange(e)
          }}
          checked={checked}
          hidden={hidden}
          type="checkbox"
          disabled={disabled}
          className={cx(
            'focus:ring-primary-500 h-5 w-5 text-primary-600 dark:text-primary-600 rounded',
            !checked && 'dark:bg-gray-700'
          )}
        />
      </div>
      <div className="ml-3 text-sm">
        <label
          htmlFor={'checkbox' + id}
          className="font-medium text-gray-700 dark:text-gray-200"
        >
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
        <div className={cx('relative flex items-start', className)}>
          <div className="flex h-5 items-center">
            <input
              {...field}
              id={htmlFor}
              value={field.value || false}
              onChange={e => {
                restProps.onChange && restProps.onChange(e)
                field.onChange(e)
              }}
              checked={field.value || false}
              hidden={hidden}
              type="checkbox"
              disabled={disabled}
              placeholder={placeholder}
              className={cx(
                'focus:ring-primary-500 h-5 w-5 text-primary-600 dark:text-primary-600 rounded',
                !field.value && 'dark:bg-gray-700',
                disabled && 'cursor-not-allowed bg-neutral-200 '
              )}
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor={htmlFor}
              className="font-medium text-gray-700 dark:text-gray-200"
            >
              {label}
            </label>
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
