import LoadingContext from 'core/store/loading-component.context'
import { Fragment, useContext } from 'react'
import LoaderComponent from './loader.com'

interface Props {
  children?: React.ReactNode
}

const ComponentLoader = ({ children }: Props) => {
  const { loading } = useContext(LoadingContext)
  return <Fragment>{loading ? <LoaderComponent /> : children}</Fragment>
}

export default ComponentLoader
