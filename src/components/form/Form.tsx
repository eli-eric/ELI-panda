import type { FieldValues, UseFormReturn } from 'react-hook-form'
import { FormProvider } from 'react-hook-form'

import { useFormLeaveWarning } from '@/hooks/form/useFormLeaveWarning'
import useFormNotification from '@/hooks/form/useFormNotification'

interface Props<T extends FieldValues> {
  onSubmit?: (data: T) => void
  children: React.ReactNode
  formMethods: UseFormReturn<T, any>

  enableLeaveWarning?: boolean
}
export const Form = <T extends FieldValues>({ children, onSubmit, formMethods, enableLeaveWarning }: Props<T>) => {
  const { handleSubmit, control, formState } = formMethods
  useFormNotification<T>({ control })
  const LeaveModal = useFormLeaveWarning<T>({ formState })

  return (
    <form onSubmit={onSubmit && handleSubmit(onSubmit)}>
      <FormProvider {...formMethods}>{children}</FormProvider>
      {enableLeaveWarning && <LeaveModal />}
    </form>
  )
}
