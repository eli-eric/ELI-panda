import { Fragment } from 'react'

import BreadcrumpContainer from '@/components/Breadcrump/Breadcrump.cont'
import BreadcrumpItem from '@/components/Breadcrump/Breadcrump.item'
import { PATH } from '@/types/constants/paths'

import { useCategory } from '../../hooks/useCategory-graphql'
import { useCategoryEdit } from '../../hooks/useCategoryEdit'

export const CatalogueBreadcrumbs = () => {
  //TODO: clean up
  const { getAddButton } = useCategoryEdit({ catalogueParentPath: '' })
  const { catalogueCategory } = useCategory()

  return (
    <BreadcrumpContainer homeLink={PATH.CATALOGUE}>
      <Fragment>
        {catalogueCategory?.parentPath[0]?.uid &&
          catalogueCategory?.parentPath?.map((path, i) => (
            <BreadcrumpItem key={i} name={path?.name as string} link={PATH.CATALOGUE + '/' + path?.uid} />
          ))}
        {catalogueCategory && (
          <BreadcrumpItem name={catalogueCategory?.name} link={PATH.CATALOGUE + '/' + catalogueCategory?.uid} />
        )}
        {getAddButton()}
      </Fragment>
    </BreadcrumpContainer>
  )
}
