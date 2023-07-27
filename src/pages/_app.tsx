import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Toaster } from 'react-hot-toast'
import { IntlProvider } from 'react-intl'
import { messages } from 'src/i18n/src'
import { SWRConfig } from 'swr'

import { NavigationComponent } from '@/components/layout/nav-bar/nav-bar.comp'
import { Notification } from '@/components/Notifications/Notification'
import { WarningModal } from '@/components/WarningModal'
import { fetcher } from '@/helpers/fetcher'
import { useLocale } from '@/hooks/useLocale'

interface Props {
  children: React.ReactNode
}

const GlobalProvider = ({ children }: Props) => {
  const locale = useLocale()

  return (
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
        <NavigationComponent />
        {children}
      </IntlProvider>
    </SWRConfig>
  )
}

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <SessionProvider session={session} refetchOnWindowFocus={false}>
    <GlobalProvider>
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 3000 }}>
        {t => <Notification t={t} />}
      </Toaster>
      <DndProvider backend={HTML5Backend}>
        <Component {...pageProps} />
      </DndProvider>
      <WarningModal />
    </GlobalProvider>
  </SessionProvider>
)

export default App
