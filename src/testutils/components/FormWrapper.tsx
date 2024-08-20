import type { PropsWithChildren } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

// Helper to wrap the component with react-hook-form context
export const FormWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const methods = useForm()
  return <FormProvider {...methods}>{children}</FormProvider>
}
