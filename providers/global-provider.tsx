import axios from 'axios'
import AppLoader from 'components/loaders/app-loader.cont'
import NavigationComponent from 'components/nav-bar/nav-bar.comp'
import { messages } from 'i18n/src'
import { useSession } from 'next-auth/react'
import { IntlProvider } from 'react-intl'
import { AppLoadingProvider } from 'store/app-loading.context'
import { ComponentLoadingProvider } from 'store/component-loading.context'
import { SWRConfig } from 'swr'

interface Props {
  children: React.ReactNode
}

const GlobalProvider = ({ children }: Props) => {
  const { data } = useSession()

  axios.defaults.headers.common['authorization'] = data?.user.apiAccessToken

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
              <NavigationComponent />
              {children}
            </AppLoader>
          </ComponentLoadingProvider>
        </AppLoadingProvider>
      </IntlProvider>
    </SWRConfig>
  )
}

export default GlobalProvider
