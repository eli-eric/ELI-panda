import ComponentLoadingContext from 'core/store/component-loading.context'
import { Fragment, useContext } from 'react'

import LoaderComponent from '../ui/loader.comp'

interface Props {
  children?: React.ReactNode
}

/*
ComponentLoader wrapping all components and replace all component with Loader if ComponentLoader is true
*/

const ComponentLoader = ({ children }: Props) => {
  const { componentLoading } = useContext(ComponentLoadingContext)
  return <Fragment>{componentLoading ? <LoaderComponent /> : children}</Fragment>
}

export default ComponentLoader
