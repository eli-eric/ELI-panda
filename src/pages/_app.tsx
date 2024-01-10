import '../styles/globals.css'

import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Toaster } from 'react-hot-toast'
import { IntlProvider } from 'react-intl'
import { messages } from 'src/i18n/src'
import { SWRConfig } from 'swr'

import { NavigationComponent } from '@/components/layout/nav-bar/nav-bar.comp'
import { GenereralModal } from '@/components/modal/modal.comp'
import { Notification } from '@/components/Notifications/Notification'
import { WarningModal } from '@/components/WarningModal'
import { useLocale } from '@/hooks/useLocale'
import { useApollo } from '@/server/apollo/client'
import { fetcher } from '@/utils/fetcher'

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState)
  const locale = useLocale()

  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <ApolloProvider client={apolloClient}>
        <SWRConfig
          value={{
            fetcher,
            suspense: true,
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            onError: error => {
              if (!error) {
                const err = new Error('An error occurred while fetching the data.')
                throw err
              }
            }
          }}
        >
          <IntlProvider locale={locale} messages={messages['en']}>
            <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 1000 }}>
              {t => <Notification t={t} />}
            </Toaster>
            <DndProvider backend={HTML5Backend}>
              <NavigationComponent />
              <Component {...pageProps} />
              <GenereralModal />
              <WarningModal />
            </DndProvider>
          </IntlProvider>
        </SWRConfig>
      </ApolloProvider>
    </SessionProvider>
  )
}

export default App
