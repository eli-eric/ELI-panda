import React from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

type Option = {
  value: string | number | readonly string[] | undefined
  code: string
  selected?: boolean | undefined
  disabled?: boolean | undefined
  name: string
}

interface Props<T extends FieldValues>
  extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  register: UseFormRegister<T>
  options: Option[]
  name: Path<T>
}

export const Select = <T extends FieldValues>({ register, options, name, ...rest }: Props<T>) => {
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
