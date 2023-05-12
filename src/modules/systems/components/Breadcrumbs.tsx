import BreadcrumpContainer from '@/components/Breadcrump/Breadcrump.cont'
import BreadcrumpItem from '@/components/Breadcrump/Breadcrump.item'

import type { ParentPath } from '../types/responses'

const Breadcrumbs = ({ parentPath }: { parentPath?: ParentPath }) => (
  <BreadcrumpContainer homeLink="/systems">
    {parentPath?.map(({ uid, name }) => (
      <BreadcrumpItem key={uid} name={name} link={'/systems/' + uid} />
    ))}
  </BreadcrumpContainer>
)

export default Breadcrumbs
