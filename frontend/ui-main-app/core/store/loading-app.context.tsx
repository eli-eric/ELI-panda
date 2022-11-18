import { createContext, useState } from 'react'

interface LoadingAppContext {
  loadingApp: boolean
  setLoadingApp: (loading: boolean) => void
}

const LoadingAppContext = createContext({
  loadingApp: false, // {title, message, status}
  setLoadingApp: loading => {}
} as LoadingAppContext)

interface Props {
  children: React.ReactNode
}

export const LoadingAppProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(false)

  const setLoadingHandler = (loading: boolean) => {
    setLoading(loading)
  }

  const context = {
    loadingApp: loading,
    setLoadingApp: setLoadingHandler
  }

  return <LoadingAppContext.Provider value={context}>{children}</LoadingAppContext.Provider>
}
export default LoadingAppContext
