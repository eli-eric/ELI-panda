import '../styles/globals.css'

import GlobalProvider from 'core/components/providers/global-provider'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </SessionProvider>
  )
}

export default App
