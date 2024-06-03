import '../styles/globals.css'

import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { lazy, Suspense, useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Toaster } from 'react-hot-toast'
import { IntlProvider } from 'react-intl'
import { messages } from 'src/i18n/src'

import { Layout } from '@/components/layout/Layout'
import { Notification } from '@/components/Notifications/Notification'
import { GenereralModal } from '@/components/overlays/modal/modal.comp'
import { WarningModal } from '@/components/WarningModal'
import { useLocale } from '@/hooks/useLocale'
import { useDarkModeStore } from '@/store/useDarkModeStore'

const ReactQueryDevtoolsProduction = lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    d => ({
      default: d.ReactQueryDevtools
    })
  )
)

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60
          }
        }
      })
  )

  const locale = useLocale()
  const setStoredTheme = useDarkModeStore(state => state.setStoredTheme)

  useEffect(() => {
    setStoredTheme()
  }, [setStoredTheme])

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <SessionProvider session={session} refetchOnWindowFocus={false}>
          <IntlProvider locale={locale} messages={messages['en']}>
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{ duration: 1000 }}
            >
              {t => <Notification t={t} />}
            </Toaster>
            <DndProvider backend={HTML5Backend}>
              <Layout>{<Component {...pageProps} />}</Layout>
              <GenereralModal />
              <WarningModal />
            </DndProvider>
          </IntlProvider>
        </SessionProvider>
      </HydrationBoundary>
      {process.env.NODE_ENV === 'development' && (
        <Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
        </Suspense>
      )}
    </QueryClientProvider>
  )
}

export default App
