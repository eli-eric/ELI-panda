import type { QueryClient } from '@tanstack/react-query'
import type { FC, PropsWithChildren } from 'react'
import type { UseFormProps } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import { IntlProvider } from 'react-intl'

import { messages } from '@/i18n/src/messages'

import { QueryClientWrapper } from './QueryClientWrapper'

interface Props extends PropsWithChildren {
    locale?: 'en' | 'cs'
    queryClient?: QueryClient
    withForm?: boolean
    formProps?: UseFormProps
}

const FormWrapperInner: FC<PropsWithChildren<{ formProps?: UseFormProps }>> = ({
    children,
    formProps,
}) => {
    const methods = useForm(formProps)
    return <FormProvider {...methods}>{children}</FormProvider>
}

/**
 * One-stop-shop wrapper for integration tests.
 * Combines IntlProvider + QueryClientProvider + optional FormProvider.
 */
export const AllProvidersWrapper: FC<Props> = ({
    children,
    locale = 'en',
    queryClient,
    withForm = false,
    formProps,
}) => {
    const body = withForm ? (
        <FormWrapperInner formProps={formProps}>{children}</FormWrapperInner>
    ) : (
        children
    )

    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <QueryClientWrapper client={queryClient}>{body}</QueryClientWrapper>
        </IntlProvider>
    )
}
