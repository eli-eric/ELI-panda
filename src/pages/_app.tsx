import '../app/globals.css'

import { HydrationBoundary, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { lazy, Suspense, useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { IntlProvider } from 'react-intl'
import { messages } from 'src/i18n/src'

import { EnvironmentWarning } from '@/components/environment/EnvironmentWarning'
import { NewLayout } from '@/components/layout/NewLayout'
import { Toaster as SonnerToaster } from '@/components/ui/sonner'
import { WarningModal } from '@/components/WarningModal'
import { useDarkModeStore } from '@/store/useDarkModeStore'
import { getQueryClient } from '@/utils/queryClient'

const ReactQueryDevtoolsProduction = lazy(() =>
    import('@tanstack/react-query-devtools/build/modern/production.js').then(d => ({
        default: d.ReactQueryDevtools,
    })),
)

const ModalProvider = lazy(() =>
    import('@/components/overlays/ModalProvider').then(d => ({
        default: d.ModalProvider,
    })),
)

const DynamicModalProvider = lazy(() =>
    import('@/components/overlays/DynamicModalProvider').then(d => ({
        default: d.DynamicModalProvider,
    })),
)

const GlobalSearchCommandContainer = lazy(() =>
    import('@/modules/shared/globalSearch/components/GlobalSearchCommand.cont').then(d => ({
        default: d.GlobalSearchCommandContainer,
    })),
)

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
    const [queryClient] = useState(() => getQueryClient())

    const setStoredTheme = useDarkModeStore(state => state.setStoredTheme)

    useEffect(() => {
        setStoredTheme()
    }, [setStoredTheme])

    // Extract key from pageProps if it exists to avoid React warning
    const { key, ...componentProps } = pageProps as any

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={componentProps.dehydratedState}>
                <SessionProvider session={session} refetchOnWindowFocus={false}>
                    <IntlProvider locale={'en'} messages={messages.en}>
                        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                            <EnvironmentWarning />
                            <SonnerToaster />
                            <DndProvider backend={HTML5Backend}>
                                <NewLayout>{<Component {...componentProps} key={key} />}</NewLayout>
                                <Suspense fallback={null}>
                                    <ModalProvider />
                                    <DynamicModalProvider />
                                    <GlobalSearchCommandContainer />
                                </Suspense>
                                <WarningModal />
                            </DndProvider>
                        </ThemeProvider>
                    </IntlProvider>
                </SessionProvider>
            </HydrationBoundary>
        </QueryClientProvider>
    )
}

export default App
