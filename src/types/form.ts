import {
  FieldValues,
  FormState,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'
export type ModalButtons = {
  noButtons?: boolean
  goBack?: Button
  goNext?: Button
}

export type Button = {
  text: string
  loading?: boolean
  onClick: (data: unknown | undefined) => void
}

export interface FormChildrenProps<T extends FieldValues = FieldValues> {
  register: UseFormRegister<T>
  formState: FormState<T>
  handleSubmit: UseFormHandleSubmit<T>
  onSubmit: (data: any) => void
  onCancel: () => void
}
