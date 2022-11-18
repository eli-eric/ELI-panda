import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from 'react'

interface LoadingComponentContext {
  loading: boolean
  setLoading: (loading: boolean) => void
}

const LoadingComponentContext = createContext({
  loading: false, // {title, message, status}
  setLoading: loading => {}
} as LoadingComponentContext)

interface Props {
  children: React.ReactNode
}

export const LoadingComponentProvider = ({ children }: Props) => {
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
  }, [router, loading])

  const setLoadingHandler = (loading: boolean) => {
    setLoading(loading)
  }

  const context = {
    loading: loading,
    setLoading: setLoadingHandler
  }

  return (
    <LoadingComponentContext.Provider value={context}>{children}</LoadingComponentContext.Provider>
  )
}
export default LoadingComponentContext
