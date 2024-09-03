import { Fragment } from 'react'

import { BreadcrumpContainer, BreadcrumpItem } from '@/components/Breadcrump'
import { PATH } from '@/types/constants/paths'
import type { CodebookType } from '@/types/responses/codebook'

interface BreadcrumbsProps {
  parentPath?: CodebookType[]
}

const Breadcrumbs = ({ parentPath }: BreadcrumbsProps) => (
  <BreadcrumpContainer homeLink={PATH.SYSTEMS}>
    <Fragment>
      {parentPath?.map(system => {
        const link = PATH.SYSTEM + '/' + system.uid
        return (
          <BreadcrumpItem
            key={system?.uid}
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
