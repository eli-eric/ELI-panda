import '../styles/globals.css'

import axios from 'axios'
import LayoutComponent from 'core/components/layout/layout.comp'
import AppLoader from 'core/components/loaders/app-loader.cont'
import ComponentLoader from 'core/components/loaders/component-loader.cont'
import PageGuardWrapper from 'core/helpers/PageGuardWrapper'
import { messages } from 'core/i18n/src'
import { AppLoadingProvider } from 'core/store/app-loading.context'
import { CataloguePathContextProvider } from 'core/store/catalogue-path.context'
import { ComponentLoadingProvider } from 'core/store/component-loading.context'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { IntlProvider } from 'react-intl'
import { SWRConfig } from 'swr'

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SWRConfig
      value={{
        fetcher: url => axios.get(url).then(res => res.data)
      }}
    >
      <SessionProvider session={session}>
        <IntlProvider locale="en" messages={messages['en']}>
          <AppLoadingProvider>
            <ComponentLoadingProvider>
              <AppLoader>
                <CataloguePathContextProvider>
                  <LayoutComponent>
                    <ComponentLoader>
                      <PageGuardWrapper>
                        <Component {...pageProps} />
                      </PageGuardWrapper>
                    </ComponentLoader>
                  </LayoutComponent>
                </CataloguePathContextProvider>
              </AppLoader>
            </ComponentLoadingProvider>
          </AppLoadingProvider>
        </IntlProvider>
      </SessionProvider>
    </SWRConfig>
  )
}

export default App
