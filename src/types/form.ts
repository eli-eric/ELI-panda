export type ModalButtons = {
  noButtons?: boolean
  goBack?: Button
  goNext?: Button
  alternative?: Button
}

export type Button = {
  text: string
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
  onClick?: () => void
  testid?: string
}

export interface FieldProps {
  name: string

  placeholder?: string
  disabled?: boolean
  rounded?: 'rounded-l-md' | 'rounded-t-md' | 'rounded-r-md' | 'rounded-b-md' | 'rounded-md'
  label?: string
  customLabel?: string

  type?: string
}

export type Option = {
  value: string | number | readonly string[] | undefined
  disabled?: boolean | undefined
  name?: string | undefined
  children?: JSX.Element
}
