import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import GlobalProvider from 'src/providers/globalProvider'

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
