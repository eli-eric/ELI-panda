import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { IntlProvider } from 'react-intl'
import { messages } from 'core/i18n/src'
import LayoutComponent from 'core/components/layout/layout.comp'
import PageGuardWrapper from 'core/helpers/PageGuardWrapper'
import ComponentLoader from 'core/components/loaders/component-loader.comp'
import AppLoader from 'core/components/loaders/app-loader.comp'
import { LoadingAppProvider } from 'core/store/loading-app.context'
import { LoadingComponentProvider } from 'core/store/loading-component.context'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <IntlProvider locale="en" messages={messages['en']}>
        <LoadingAppProvider>
          <LoadingComponentProvider>
            <AppLoader>
              <LayoutComponent>
                <ComponentLoader>
                  <PageGuardWrapper>
                    <Component {...pageProps} />
                  </PageGuardWrapper>
                </ComponentLoader>
              </LayoutComponent>
            </AppLoader>
          </LoadingComponentProvider>
        </LoadingAppProvider>
      </IntlProvider>
    </SessionProvider>
  )
}
