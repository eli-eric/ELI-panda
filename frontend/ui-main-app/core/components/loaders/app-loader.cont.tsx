import AppLoadingContext from 'core/store/app-loading.context'
import { Fragment, useContext } from 'react'

import LoaderComponent from '../ui/loader.comp'

interface Props {
  children?: React.ReactNode
}

/*
AppLoader wrapping all components and replace all content with Loader if appLoading is true
*/

const AppLoader = ({ children }: Props) => {
  const { appLoading } = useContext(AppLoadingContext)
  return <Fragment>{appLoading ? <LoaderComponent /> : children}</Fragment>
}

export default AppLoader
