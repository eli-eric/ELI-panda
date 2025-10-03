import { Controller, useFormContext } from 'react-hook-form'

import { Input as ShadcnInput } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

interface InputAmountCurrencyProps {
  amountName: string
  currencyName: string
  label?: string
  required?: boolean
  defaultAmount?: number
  defaultCurrency?: string
}

export const InputAmountCurrency = ({
  amountName,
  currencyName,
  label,
  required,
  defaultAmount,
  defaultCurrency = 'EUR'
}: InputAmountCurrencyProps) => {
  const { control } = useFormContext()
  const currencyOptions = ['EUR', 'USD', 'CZK', 'HUF', 'RON', 'GBP']

  return (
    <div className="space-y-1 w-full">
      {label && <Label>{label}</Label>}
      <div className="relative flex items-center">
        <Controller
          name={amountName}
          control={control}
          defaultValue={defaultAmount || ''}
          render={({ field }) => (
            <ShadcnInput
              {...field}
              type="number"
              required={required}
              className="pr-20" // space for select
            />
          )}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <Controller
            name={currencyName}
            control={control}
            defaultValue={defaultCurrency}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-orange-500 sm:text-sm shadow-none"
                  style={{ minWidth: 60 }}
                >
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencyOptions.map(currency => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
    </div>
  )
}
