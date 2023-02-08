import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

type Option = {
  value: string | number | readonly string[] | undefined
  code: string
  selected?: boolean | undefined
  disabled?: boolean | undefined
  name: string
}

interface Props extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  register: UseFormRegister<FieldValues>
  options: Option[]
  name: string
}

export function Select({ register, options, name, ...rest }: Props) {
  return (
    <select {...register(name)} {...rest}>
      {options.map((option, index) => (
        <option key={index} value={option.value} selected={option.selected} disabled={option.disabled}>
          {option.name}
        </option>
      ))}
    </select>
  )
}
