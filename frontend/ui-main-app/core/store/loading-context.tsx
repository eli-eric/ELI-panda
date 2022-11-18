import LoaderComponent from 'core/components/ui/loader.comp'
import { useSession } from 'next-auth/react'
import Router, { useRouter } from 'next/router'
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'

interface LoadingContext {
  loading: boolean
  setLoading: (loading: boolean) => void
}

const LoadingContext = createContext({
  loading: false, // {title, message, status}
  setLoading: loading => {}
} as LoadingContext)

interface Props {
  children: React.ReactNode
}

export const LoadingContextProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(false)
  const { status } = useSession()
  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeStart', url => {
      setLoading(true)
      return
    })

    router.events.on('routeChangeComplete', url => {
      setLoading(false)
      return
    })

    if (status === 'unauthenticated') {
      setLoading(false)
    }
    if (status === 'loading') {
      setLoading(true)
    }
    console.log('loading', loading)
  }, [router, loading, status])

  const setLoadingHandler = (loading: boolean) => {
    console.log(loading)
    setLoading(loading)
  }

  const context = {
    loading: loading,
    setLoading: setLoadingHandler
  }

  return <LoadingContext.Provider value={context}>{children}</LoadingContext.Provider>
}
export default LoadingContext
