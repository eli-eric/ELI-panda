import type { FC, PropsWithChildren } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export const FormWrapper: FC<PropsWithChildren> = ({ children }) => {
    const methods = useForm()
    return <FormProvider {...methods}>{children}</FormProvider>
}
