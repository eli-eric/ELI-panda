import type { QueryClient } from '@tanstack/react-query'
import type { RenderOptions, RenderResult } from '@testing-library/react'
import { render, renderHook } from '@testing-library/react'
import type { ReactElement } from 'react'
import type { UseFormProps } from 'react-hook-form'

import { AllProvidersWrapper } from './AllProvidersWrapper'
import { QueryClientWrapper } from './QueryClientWrapper'

interface ProviderOptions {
    locale?: 'en' | 'cs'
    queryClient?: QueryClient
    withForm?: boolean
    formProps?: UseFormProps
}

type RenderWithProvidersOptions = ProviderOptions & Omit<RenderOptions, 'wrapper'>

/**
 * Render a component wrapped in Intl + QueryClient (+ optional Form) providers.
 * Use for integration tests of container / form components.
 */
export const renderWithProviders = (
    ui: ReactElement,
    { locale, queryClient, withForm, formProps, ...rtlOptions }: RenderWithProvidersOptions = {},
): RenderResult =>
    render(ui, {
        wrapper: ({ children }) => (
            <AllProvidersWrapper
                locale={locale}
                queryClient={queryClient}
                withForm={withForm}
                formProps={formProps}
            >
                {children}
            </AllProvidersWrapper>
        ),
        ...rtlOptions,
    })

/**
 * renderHook wrapped in QueryClientProvider (only — no Intl/Form overhead).
 * Use for query/mutation hook tests.
 */
export const renderHookWithQuery = <TResult, TProps>(
    hook: (props: TProps) => TResult,
    options?: { queryClient?: QueryClient; initialProps?: TProps },
) =>
    renderHook(hook, {
        wrapper: ({ children }) => (
            <QueryClientWrapper client={options?.queryClient}>{children}</QueryClientWrapper>
        ),
        initialProps: options?.initialProps,
    })

/**
 * renderHook wrapped in all providers (Intl + QueryClient + optional Form).
 * Use for hooks that need i18n or form context.
 */
export const renderHookWithProviders = <TResult, TProps>(
    hook: (props: TProps) => TResult,
    options?: ProviderOptions & { initialProps?: TProps },
) =>
    renderHook(hook, {
        wrapper: ({ children }) => (
            <AllProvidersWrapper
                locale={options?.locale}
                queryClient={options?.queryClient}
                withForm={options?.withForm}
                formProps={options?.formProps}
            >
                {children}
            </AllProvidersWrapper>
        ),
        initialProps: options?.initialProps,
    })
