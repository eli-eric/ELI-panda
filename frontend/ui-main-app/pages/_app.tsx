import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { IntlProvider } from 'react-intl'
import { messages } from 'core/i18n/src'
import LayoutComponent from 'core/components/layout/layout.comp'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <IntlProvider locale="en" messages={messages['en']}>
        <LayoutComponent>
          <Component {...pageProps} />
        </LayoutComponent>
      </IntlProvider>
    </SessionProvider>
  )
}
