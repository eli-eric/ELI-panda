import { Listbox as HUIListbox } from '@headlessui/react'
import { TableCellsIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import type { FieldProps } from '@/types/form'
import type { CodebookType } from '@/types/responses/codebook'
import { cx } from '@/utils'

import { FormXMarkIcon } from './components/FormXMarkIcon'

export type ListboxPropsT = FieldProps & {
  onChange?: (value: any) => void
  className?: string
  defaultValue?: CodebookType[] | string | null
  onClick?: () => void
  isFilter?: boolean
}

export const ModalSelect = ({
  defaultValue = null,
  name,
  label,
  disabled,
  className,
  placeholder = 'Click here to select',
  onChange,
  onClick,
  isFilter
}: ListboxPropsT) => {
  const { control, setValue } = useFormContext()

  const handleChange = (value: any) => (value?.uid === '' ? null : value)

  const handleClear = () => {
    setValue(name, null)
    onChange && onChange(null)
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => {
        const value =
          typeof field.value === 'string' ? field.value : field.value?.name

        return (
          <HUIListbox
            as="div"
            {...field}
            onChange={v => {
              field.onChange(handleChange(v))
              onChange && onChange(v)
            }}
            disabled={disabled}
            className={cx('relative flex flex-col w-full h-min', className)}
          >
            {label && (
              <HUIListbox.Label className="block text-sm font-medium text-gray-900 dark:text-gray-200">
                {label}
              </HUIListbox.Label>
            )}
            <div>
              <HUIListbox.Button
                type="button"
                className={cx(
                  'form-field-combo h-[38px] rounded-md relative',
                  field.value && !disabled ? '' : '',
                  error ? 'border-red-500' : 'border-gray-300',
                  disabled ? 'bg-gray-100' : '',
                  isFilter ? field.value && 'border-2 border-lime-500' : ''
                )}
              >
                <div onClick={onClick}>
                  <div className="h-full w-full pr-12 ml-3 text-left">
                    <span className="block truncate">{value}</span>
                    {placeholder && !value && (
                      <span className="block truncate text-gray-400">
                        {placeholder}
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <TableCellsIcon
                      onClick={onClick}
                      className="h-4 w-4 text-gray-500 dark:text-gray-200"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                {!disabled && value && <FormXMarkIcon onClick={handleClear} />}
              </HUIListbox.Button>
            </div>
          </HUIListbox>
        )
      }}
    />
  )
}
