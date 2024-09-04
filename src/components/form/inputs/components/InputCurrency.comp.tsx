import { Controller, useFormContext } from 'react-hook-form'

import type { FieldProps } from '@/types/form'

type InputAmountProps = FieldProps & React.InputHTMLAttributes<HTMLInputElement>
export const InputCurrency = ({ name }: InputAmountProps) => {
  const currencyOptions = ['EUR', 'USD', 'CZK', 'HUF', 'RON', 'GBP']
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={currencyOptions[0]}
      render={({ field }) => (
        <div className="absolute inset-y-0 right-0 flex items-center">
          <label htmlFor="currency" className="sr-only">
            Currency
          </label>
          <select
            {...field}
            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm"
          >
            {currencyOptions.map(currency => (
              <option key={currency}>{currency}</option>
            ))}
          </select>
        </div>
      )}
    />
  )
}
