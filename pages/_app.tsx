import '../styles/globals.css'

import ErrorBoundary from 'components/error/ErrorBoundary'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import GlobalProvider from 'providers/globalProvider'

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <ErrorBoundary>
        <GlobalProvider>
          <Component {...pageProps} />
        </GlobalProvider>
      </ErrorBoundary>
    </SessionProvider>
  )
}

export default App
