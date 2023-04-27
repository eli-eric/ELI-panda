import '../styles/globals.css'

import axios from 'axios'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { IntlProvider } from 'react-intl'
import { messages } from 'src/i18n/src'
import { SWRConfig } from 'swr'

import NavigationComponent from '@/components/layout/nav-bar/nav-bar.comp'
import { fetcher } from '@/helpers/fetcher'
import useLocale from '@/hooks/useLocale'

interface Props {
  children: React.ReactNode
}

const GlobalProvider = ({ children }: Props) => {
  const { data } = useSession()
  axios.defaults.headers.common['authorization'] = 'Bearer ' + data?.user.apiAccessToken
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
  <SessionProvider session={session}>
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  </SessionProvider>
)

export default App
