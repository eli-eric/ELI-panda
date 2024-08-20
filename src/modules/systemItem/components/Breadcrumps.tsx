import { Fragment } from 'react'

import BreadcrumpContainer from '@/components/breadcrump/Breadcrump.cont'
import BreadcrumpItem from '@/components/breadcrump/Breadcrump.item'
import { PATH } from '@/types/constants/paths'
import type { CodebookType } from '@/types/responses/codebook'

interface BreadcrumbsProps {
  parentPath?: CodebookType[]
}

const Breadcrumbs = ({ parentPath }: BreadcrumbsProps) => (
  <BreadcrumpContainer homeLink={PATH.SYSTEMS}>
    <Fragment>
      {parentPath?.map((system, i) => {
        const link = PATH.SYSTEM + '/' + system.uid
        return (
          <BreadcrumpItem
            key={i}
            name={system?.name}
            systemLevel={system.systemLevel}
            link={link}
          />
        )
      })}
    </Fragment>
  </BreadcrumpContainer>
)
export default Breadcrumbs
