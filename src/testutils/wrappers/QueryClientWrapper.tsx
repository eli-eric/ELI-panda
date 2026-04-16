import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { FC, PropsWithChildren } from 'react'
import { useState } from 'react'

export const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: { retry: false, gcTime: 0, staleTime: 0 },
            mutations: { retry: false },
        },
    })

interface Props extends PropsWithChildren {
    client?: QueryClient
}

export const QueryClientWrapper: FC<Props> = ({ children, client }) => {
    // Keep the QueryClient stable across re-renders (StrictMode double-mount,
    // parent prop changes). Only the explicit `client` prop overrides it.
    const [fallbackClient] = useState(() => createTestQueryClient())
    const qc = client ?? fallbackClient
    return <QueryClientProvider client={qc}>{children}</QueryClientProvider>
}
