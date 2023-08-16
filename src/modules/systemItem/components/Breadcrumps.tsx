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
      {parentPath?.map((codebook, i) => {
        const link = PATH.SYSTEM + '/' + codebook.uid
        return <BreadcrumpItem key={i} name={codebook?.name} link={link} />
      })}
    </Fragment>
  </BreadcrumpContainer>
)
export default Breadcrumbs
