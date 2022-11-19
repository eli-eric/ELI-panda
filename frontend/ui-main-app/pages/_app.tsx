import '../styles/globals.css'

import LayoutComponent from 'core/components/layout/layout.comp'
import AppLoader from 'core/components/loaders/app-loader.cont'
import ComponentLoader from 'core/components/loaders/component-loader.cont'
import PageGuardWrapper from 'core/helpers/PageGuardWrapper'
import { messages } from 'core/i18n/src'
import { AppLoadingProvider } from 'core/store/app-loading.context'
import { ComponentLoadingProvider } from 'core/store/component-loading.context'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { IntlProvider } from 'react-intl'

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <IntlProvider locale="en" messages={messages['en']}>
        <AppLoadingProvider>
          <ComponentLoadingProvider>
            <AppLoader>
              <LayoutComponent>
                <ComponentLoader>
                  <PageGuardWrapper>
                    <Component {...pageProps} />
                  </PageGuardWrapper>
                </ComponentLoader>
              </LayoutComponent>
            </AppLoader>
          </ComponentLoadingProvider>
        </AppLoadingProvider>
      </IntlProvider>
    </SessionProvider>
  )
}

export default App
