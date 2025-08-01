import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Switch as ShadcnSwitch } from '@/components/ui/switch'

interface Props {
  enabled: boolean
  onChange?: (enabled: boolean) => void
  className?: string
}

export const Toggle = ({ enabled, onChange, className }: Props) => (
  <ShadcnSwitch
    checked={enabled}
    onCheckedChange={onChange}
    className={className}
  />
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
          {label && (
            <span className="mr-2 text-sm font-medium text-gray-900 dark:text-gray-200 pb-1">
              {label}
            </span>
          )}
          <ShadcnSwitch
            checked={field.value}
            onCheckedChange={checked => {
              field.onChange(checked)
              onChange?.(checked)
            }}
            className={className}
          />
        </label>
      )}
    />
  )
}
