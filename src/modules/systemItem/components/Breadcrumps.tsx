import { Fragment } from 'react'

import BreadcrumpContainer from '@/components/Breadcrump/Breadcrump.cont'
import BreadcrumpItem from '@/components/Breadcrump/Breadcrump.item'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { PATH } from '@/types/constants/paths'

interface BreadcrumbsProps {
  parentPath?: CodebookType[]
}

const Breadcrumbs = ({ parentPath }: BreadcrumbsProps) => (
  <BreadcrumpContainer homeLink={PATH.SYSTEMS}>
    <Fragment>
      {parentPath?.map((system, i) => {
        const link = PATH.SYSTEM + '/' + system.uid
        return <BreadcrumpItem key={i} name={system?.name} systemLevel={system.systemLevel} link={link} />
      })}
    </Fragment>
  </BreadcrumpContainer>
)
export default Breadcrumbs
