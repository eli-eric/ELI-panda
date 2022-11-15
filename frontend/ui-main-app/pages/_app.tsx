import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import LayoutContainer from '../components/layout/main-layout/layout.container'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <LayoutContainer>
        <Component {...pageProps} />
      </LayoutContainer>
    </SessionProvider>
  )
}
