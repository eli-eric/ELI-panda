import moment from 'moment'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Controller } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'

import type { FieldProps } from '@/types/form'
import { classNames } from '@/utils'
import { convertDate } from '@/utils/formatters'

import { ValidationIcon } from './Icons'

type InputProps = FieldProps & React.InputHTMLAttributes<HTMLInputElement>

const DateInput = ({ name, disabled, rounded = 'rounded-md', className, hidden, label, ...restProps }: InputProps) => {
  const {
    control,
    formState: { defaultValues }
  } = useFormContext()
  const [startDate, setStartDate] = useState(new Date())
  // set default value
  useEffect(() => {
    if (defaultValues && defaultValues[name]) {
      const defaultOption = moment(defaultValues[name]).toDate()
      setStartDate(defaultOption)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <div
          hidden={hidden}
          className={classNames(
            'block z-10 w-full appearance-none  placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm',
            className
          )}
        >
          {label && (
            <label hidden={hidden} className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {label}
            </label>
          )}
          <div hidden={hidden} className="relative">
            <DatePicker
              {...restProps}
              hidden={hidden}
              name={name}
              type="date"
              disabled={disabled}
              className={classNames(
                'block w-full appearance-none dark:bg-gray-900 dark:text-gray-200 border px-3 py-2 placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm',
                rounded,
                error ? 'border-red-500' : 'border-gray-300',
                disabled ? 'bg-gray-100' : ''
              )}
              selected={startDate}
              onChange={(date: Date) => {
                setStartDate(date)
                onChange(convertDate(date))
              }}
            />
            {error && <ValidationIcon />}
          </div>
        </div>
      )}
    />
  )
}

export default DateInput
