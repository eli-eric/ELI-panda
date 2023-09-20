import { Fragment } from 'react'

import BreadcrumpContainer from '@/components/Breadcrump/Breadcrump.cont'
import BreadcrumpItem from '@/components/Breadcrump/Breadcrump.item'
import { PATH } from '@/types/constants/paths'

import { useCategoryEdit } from '../../hooks/useCategoryEdit'
import { useCategoryList } from '../../hooks/useCategoryList'

export const CatalogueBreadcrumbs = () => {
  //TODO: clean up
  const { getAddButton } = useCategoryEdit({ catalogueParentPath: '' })

  const { categoryList } = useCategoryList()

  return (
    <BreadcrumpContainer homeLink={PATH.CATALOGUE}>
      <Fragment>
        {categoryList &&
          categoryList[0].parentPath?.map((path, i) => (
            <BreadcrumpItem key={i} name={path.name} link={PATH.CATALOGUE + '/' + path.uid} />
          ))}

        {getAddButton()}
      </Fragment>
    </BreadcrumpContainer>
  )
}
