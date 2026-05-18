import { QueryClient, useQueryClient } from '@tanstack/react-query'
import { render, renderHook, screen } from '@testing-library/react'
import { useIntl } from 'react-intl'

import { AllProvidersWrapper } from '../AllProvidersWrapper'
import { createTestQueryClient,QueryClientWrapper } from '../QueryClientWrapper'
import { renderHookWithProviders, renderWithProviders } from '../renderWithProviders'

describe('createTestQueryClient', () => {
    it('returns a QueryClient with retry disabled', () => {
        const client = createTestQueryClient()
        expect(client).toBeInstanceOf(QueryClient)
        const queryDefaults = client.getDefaultOptions().queries!
        expect(queryDefaults.retry).toBe(false)
        expect(queryDefaults.staleTime).toBe(0)
        expect(client.getDefaultOptions().mutations?.retry).toBe(false)
    })
})

describe('QueryClientWrapper', () => {
    it('renders children inside QueryClientProvider with a fallback client', () => {
        const { result } = renderHook(() => useQueryClient(), {
            wrapper: ({ children }) => (
                <QueryClientWrapper>{children}</QueryClientWrapper>
            ),
        })
        expect(result.current).toBeInstanceOf(QueryClient)
    })

    it('honors the explicit client prop', () => {
        const custom = createTestQueryClient()
        const { result } = renderHook(() => useQueryClient(), {
            wrapper: ({ children }) => (
                <QueryClientWrapper client={custom}>{children}</QueryClientWrapper>
            ),
        })
        expect(result.current).toBe(custom)
    })
})

describe('AllProvidersWrapper', () => {
    it('provides Intl + QueryClient providers', () => {
        const { result } = renderHook(() => ({ intl: useIntl(), qc: useQueryClient() }), {
            wrapper: ({ children }) => (
                <AllProvidersWrapper>{children}</AllProvidersWrapper>
            ),
        })
        expect(result.current.intl.locale).toBe('en')
        expect(result.current.qc).toBeInstanceOf(QueryClient)
    })
})

describe('renderWithProviders', () => {
    it('renders UI inside wrapped providers', () => {
        renderWithProviders(<span>hello</span>)
        expect(screen.getByText('hello')).toBeInTheDocument()
    })
})

describe('renderHookWithProviders', () => {
    it('threads form context when withForm=true', () => {
        const { result } = renderHookWithProviders(() => useQueryClient(), {
            withForm: true,
        })
        expect(result.current).toBeInstanceOf(QueryClient)
    })
})

describe('Plain render without wrapper still works for non-provider components', () => {
    it('renders bare', () => {
        render(<span>bare</span>)
        expect(screen.getByText('bare')).toBeInTheDocument()
    })
})
