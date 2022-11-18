import LoadingAppContext from 'core/store/loading-app.context'
import { Fragment, useContext } from 'react'
import LoaderComponent from './loader.com'

interface Props {
  children?: React.ReactNode
}

const AppLoader = ({ children }: Props) => {
  const { loadingApp } = useContext(LoadingAppContext)
  return <Fragment>{loadingApp ? <LoaderComponent /> : children}</Fragment>
}

export default AppLoader
