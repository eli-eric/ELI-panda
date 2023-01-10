import axios from 'axios'
import https from 'https'
import PageGuardWrapper from 'core/helpers/page-guard-wrapper'
import { messages } from 'core/i18n/src'
import { AppLoadingProvider } from 'core/store/app-loading.context'
import { ComponentLoadingProvider } from 'core/store/component-loading.context'
import { useSession } from 'next-auth/react'
import { IntlProvider } from 'react-intl'
import { SWRConfig } from 'swr'

import LayoutComponent from '../layout/layout.comp'
import AppLoader from '../loaders/app-loader.cont'

interface Props {
  children: React.ReactNode
}

const GlobalProvider = ({ children }: Props) => {
  const { data } = useSession()

  axios.defaults.headers.common['authorization'] = data?.user.apiAccessToken
  axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })

  return (
    <SWRConfig
      value={{
        fetcher: url => axios.get(url).then(res => res.data)
      }}
    >
      <IntlProvider locale="en" messages={messages['en']}>
        <AppLoadingProvider>
          <ComponentLoadingProvider>
            <AppLoader>
              <LayoutComponent>
                <PageGuardWrapper>{children}</PageGuardWrapper>
              </LayoutComponent>
            </AppLoader>
          </ComponentLoadingProvider>
        </AppLoadingProvider>
      </IntlProvider>
    </SWRConfig>
  )
}

export default GlobalProvider
