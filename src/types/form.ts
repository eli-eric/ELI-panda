import { FieldValues, UseFormRegister } from 'react-hook-form'

export type ModalButtons = {
  noButtons?: boolean
  goBack?: Button
  goNext?: Button
}

export type Button = {
  text: string
  loading?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
  onClick?: (data: unknown | undefined) => void
}

export interface FieldProps<T extends FieldValues> {
  register: UseFormRegister<T>
  name: string
  isError?: boolean
  padding?: boolean

  placeholder?: string
  disabled?: boolean
  rounded?:
    | 'rounded-l-md'
    | 'rounded-t-md'
    | 'rounded-r-md'
    | 'rounded-b-md'
    | 'rounded-md'
  label?: string

  type?: string
}

export type Option = {
  value: string | number | readonly string[] | undefined
  disabled?: boolean | undefined
  name?: string | undefined
  children?: JSX.Element
}
