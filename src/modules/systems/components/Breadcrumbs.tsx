import { Fragment } from 'react'

import BreadcrumpContainer from '@/components/Breadcrump/Breadcrump.cont'
import BreadcrumpItem from '@/components/Breadcrump/Breadcrump.item'

import { useSystemEdit } from '../hooks/useSystemEdit'
import { ParentPath } from '../types/responses'

const Breadcrumbs = ({ parentPath }: { parentPath?: ParentPath }) => {
  const { AddButton } = useSystemEdit({})
  return (
    <BreadcrumpContainer homeLink="/systems">
      <Fragment>
        {parentPath?.map(({ uid, name }) => (
          <BreadcrumpItem key={uid} name={name} link={'/systems/' + uid} />
        ))}
        {/* <AddButton /> */}
      </Fragment>
    </BreadcrumpContainer>
  )
}

export default Breadcrumbs
