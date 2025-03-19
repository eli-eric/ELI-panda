import type { FC } from 'react'
import { Fragment } from 'react'

import { BreadcrumpContainer } from '@/components/breadcrumps/Breadcrump.cont'
import { BreadcrumpItem } from '@/components/breadcrumps/Breadcrump.item'
import { PATH } from '@/types/constants/paths'
import type { CodebookType } from '@/types/responses/codebook'

interface BreadcrumbsProps {
  parentPath?: CodebookType[]
  isLink?: boolean
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ parentPath, isLink = true }) => {
  console.log('parentPath', parentPath)
  if (!parentPath || parentPath.length === 0) {
    return null
  }
  return (
    <BreadcrumpContainer homeLink={isLink ? PATH.SYSTEMS : undefined}>
      <Fragment>
        {parentPath?.map(system => {
          const link = isLink ? PATH.SYSTEM + '/' + system.uid : undefined

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
}
export default Breadcrumbs
