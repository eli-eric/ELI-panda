import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { IntlProvider } from 'react-intl'
import { messages } from 'core/i18n/src'
import LayoutComponent from 'core/components/layout/layout.comp'
import { RESTRICTED_PATHS } from 'types/constants/paths'
import PageAuthGuard from 'core/helpers/PageAuthGuard'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  router: { route }
}: AppProps) {
  const requireAuth = RESTRICTED_PATHS.some(path => route.startsWith(path))
  return (
    <SessionProvider session={session}>
      <IntlProvider locale="en" messages={messages['en']}>
        <LayoutComponent>
          {requireAuth ? (
            <PageAuthGuard>
              <Component {...pageProps} />
            </PageAuthGuard>
          ) : (
            <Component {...pageProps} />
          )}
        </LayoutComponent>
      </IntlProvider>
    </SessionProvider>
  )
}
