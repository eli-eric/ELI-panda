import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from 'react'

interface ComponentLoadingContext {
  componentLoading: boolean
  setComponentLoading: (_loading: boolean) => void
}

const ComponentLoadingContext = createContext({
  componentLoading: false, // {title, message, status}
  setComponentLoading: _loading => {},
} as ComponentLoadingContext)

interface Props {
  children: React.ReactNode
}

export const ComponentLoadingProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setLoading(true)
      return
    })

    router.events.on('routeChangeComplete', () => {
      setLoading(false)
      return
    })
  }, [router, loading])

  const setLoadingHandler = (loading: boolean) => {
    setLoading(loading)
  }

  const context = {
    componentLoading: loading,
    setComponentLoading: setLoadingHandler,
  }

  return (
    <ComponentLoadingContext.Provider value={context}>
      {children}
    </ComponentLoadingContext.Provider>
  )
}
export default ComponentLoadingContext
