import '../styles/globals.css'

import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Toaster } from 'react-hot-toast'
import { IntlProvider } from 'react-intl'
import { messages } from 'src/i18n/src'
import { SWRConfig } from 'swr'

import { NavigationMobile } from '@/components/layout/navigation/NavigationMobile'
import { SidebarNavigation } from '@/components/layout/navigation/SideBarNavigation'
import { Notification } from '@/components/Notifications/Notification'
import { GenereralModal } from '@/components/overlays/modal/modal.comp'
import { WarningModal } from '@/components/WarningModal'
import { useLocale } from '@/hooks/useLocale'
import { useApollo } from '@/server/apollo/client'
import { useDarkModeStore } from '@/store/useDarkModeStore'
import { fetcher } from '@/utils/fetcher'

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState)
  const locale = useLocale()
  const { setStoredTheme } = useDarkModeStore()

  useEffect(() => {
    setStoredTheme()
  }, [setStoredTheme])

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
              <div className="flex flex-col lg:flex-row min-h-screen">
                <NavigationMobile />
                <SidebarNavigation />
                <main className="flex-1 overflow-auto z-10">
                  <div>{<Component {...pageProps} />}</div>
                </main>
              </div>
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
