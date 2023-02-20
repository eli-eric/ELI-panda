import { createContext, useState } from 'react'

/*
App loading context for keep loading state, used for sign out yet
*/
interface AppLoadingContext {
  appLoading: boolean
  setLoadingApp: (_loading: boolean) => void
}

const AppLoadingContext = createContext({
  appLoading: false, // {title, message, status}
  setLoadingApp: _loading => {},
} as AppLoadingContext)

interface Props {
  children: React.ReactNode
}

export const AppLoadingProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(false)

  const setLoadingHandler = (loading: boolean) => {
    setLoading(loading)
  }

  const context = {
    appLoading: loading,
    setLoadingApp: setLoadingHandler,
  }

  return (
    <AppLoadingContext.Provider value={context}>
      {children}
    </AppLoadingContext.Provider>
  )
}
export default AppLoadingContext
