import { Fragment } from 'react'

import BreadcrumpContainer from '@/components/Breadcrump/Breadcrump.cont'
import BreadcrumpItem from '@/components/Breadcrump/Breadcrump.item'

import { ParentPath } from '../types/responses'

const Breadcrumbs = ({ parentPath }: { parentPath?: ParentPath }) => (
  <BreadcrumpContainer homeLink="/systems">
    <Fragment>
      {parentPath?.map(({ uid, name }) => (
        <BreadcrumpItem key={uid} name={name} link={'/systems/' + uid} />
      ))}
    </Fragment>
  </BreadcrumpContainer>
)

export default Breadcrumbs
