import { Switch as SwitchHUI } from '@headlessui/react'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { cn } from '@/lib/utils'

interface Props {
  enabled: boolean
  onChange?: (enabled: boolean) => void
  className?: string
}

export const Toggle = ({ enabled, onChange, className }: Props) => (
  <SwitchHUI
    checked={enabled}
    onChange={onChange}
    className={cn(
      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2',
      enabled ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-500',
      className
    )}
  >
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-gray-800 shadow ring-0 transition duration-200 ease-in-out',
        enabled ? 'translate-x-5' : 'translate-x-0'
      )}
    />
  </SwitchHUI>
)

export const useToggle = (initialState = false) => {
  const [enabled, setEnabled] = useState(initialState)

  const toggle = () => setEnabled(!enabled)

  return { enabled, toggle, Toggle }
}

interface SwitchProps {
  name: string
  defaultValue?: boolean
  className?: string
  label?: string
  onChange?: (value: boolean) => void
}

export const Switch = ({
  name,
  defaultValue = true,
  className,
  label,
  onChange
}: SwitchProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <label className="flex flex-col items-center">
          <span className="mr-2 text-sm font-medium text-gray-900 dark:text-gray-200 pb-1">
            {label}
          </span>
          <SwitchHUI
            {...field}
            onChange={e => {
              field.onChange(e)
              onChange?.(e)
            }}
            className={cn(
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2',
              field.value ? 'bg-primary-500' : 'bg-gray-200',
              className
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-gray-800 shadow ring-0 transition duration-200 ease-in-out',
                field.value ? 'translate-x-5' : 'translate-x-0'
              )}
            />
          </SwitchHUI>
        </label>
      )}
    />
  )
}
