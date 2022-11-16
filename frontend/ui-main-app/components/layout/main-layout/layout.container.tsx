import { Fragment } from 'react'
import LayoutComponent from './layout.comp'

interface Props {
  children: React.ReactNode
}

const LayoutContainer = ({ children }: Props) => {
  return (
    <Fragment>
      <LayoutComponent>{children}</LayoutComponent>
    </Fragment>
  )
}

export default LayoutContainer
