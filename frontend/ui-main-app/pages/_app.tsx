import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import LayoutContainer from '../components/layout/main-layout/layout.cont'
import { IntlProvider } from 'react-intl'
import { messages } from 'core/i18n/src'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <IntlProvider locale="en" messages={messages['en']}>
        <LayoutContainer>
          <Component {...pageProps} />
        </LayoutContainer>
      </IntlProvider>
    </SessionProvider>
  )
}
