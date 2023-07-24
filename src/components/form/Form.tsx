import type { FieldValues, UseFormReturn } from 'react-hook-form'
import { FormProvider } from 'react-hook-form'

import { FormLeaveWarning } from '@/components/form/FormLeaveWarning'
import useFormNotification from '@/hooks/form/useFormNotification'

interface Props<T extends FieldValues> {
  onSubmit?: (data: T) => void
  children: React.ReactNode
  formMethods: UseFormReturn<T, any>

  enableLeaveWarning?: boolean
  className?: string
}
export const Form = <T extends FieldValues>({
  children,
  onSubmit,
  formMethods,
  enableLeaveWarning,
  className
}: Props<T>) => {
  const { handleSubmit, control, formState } = formMethods
  useFormNotification<T>({ control })

  return (
    <form onSubmit={onSubmit && handleSubmit(onSubmit)} className={className}>
      <FormProvider {...formMethods}>{children}</FormProvider>
      {enableLeaveWarning && <FormLeaveWarning formState={formState} />}
    </form>
  )
}
