import axios from 'axios'
import NavigationComponent from 'components/nav-bar/nav-bar.comp'
import { messages } from 'i18n/src'
import { useSession } from 'next-auth/react'
import { IntlProvider } from 'react-intl'
import { SWRConfig } from 'swr'

interface Props {
  children: React.ReactNode
}
async function fetcher(url) {
  const res = await axios.get(url).then(res => res.data)

  return res
}

const GlobalProvider = ({ children }: Props) => {
  const { data } = useSession()

  axios.defaults.headers.common['authorization'] = data?.user.apiAccessToken

  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        suspense: true,
        onError: (error, key) => {
          if (!error) {
            const err = new Error('An error occurred while fetching the data.')
            throw err
          }
        }
      }}
    >
      <IntlProvider locale="en" messages={messages['en']}>
        <NavigationComponent />
        {children}
      </IntlProvider>
    </SWRConfig>
  )
}

export default GlobalProvider
