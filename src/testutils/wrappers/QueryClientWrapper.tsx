import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { FC, PropsWithChildren } from 'react'

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
    const qc = client ?? createTestQueryClient()
    return <QueryClientProvider client={qc}>{children}</QueryClientProvider>
}
