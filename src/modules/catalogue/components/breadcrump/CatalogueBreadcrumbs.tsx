import { useRouter } from 'next/router'
import { Fragment } from 'react'

import BreadcrumpContainer from '@/components/Breadcrump/Breadcrump.cont'
import BreadcrumpItem from '@/components/Breadcrump/Breadcrump.item'
import { PATH } from '@/types/constants/paths'

import { useCategoryEdit } from '../../hooks/useCategoryEdit'
import { useCataloguePath } from '../../hooks/usePath'

const CatalogueBreadcrumbs = () => {
  const router = useRouter()
  const { slug } = router.query as { slug?: string[] }
  const catalogueParentPath = useCataloguePath()
  const { getAddButton } = useCategoryEdit({ catalogueParentPath })

  return (
    <BreadcrumpContainer homeLink={PATH.CATALOGUE}>
      <Fragment>
        {slug?.map((slug, i) => {
          const link = PATH.CATALOGUE + '/' + slug
          return <BreadcrumpItem key={i} name={slug} link={link} />
        })}
        {getAddButton()}
      </Fragment>
    </BreadcrumpContainer>
  )
}
export default CatalogueBreadcrumbs
