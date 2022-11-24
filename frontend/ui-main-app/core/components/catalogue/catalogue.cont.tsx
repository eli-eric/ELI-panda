import { useFetch } from 'core/helpers/hooks/useFetch'
import CataloguePathContext from 'core/store/catalogue-path.context'
import { ENDPOINTS } from 'core/types/constants/common'
import { PATHS } from 'core/types/constants/paths'
import { Category } from 'core/types/responses'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

import BreadcrumbContainer from './breadcrump/breadcrump.cont'
import CategoryListComponent from './categories/category-list.comp'

const CatalogueContainer = () => {
  const router = useRouter()
  const { cataloguePath, setCataloguePath } = useContext(CataloguePathContext)

  const categoryList = useFetch<Array<Category>>(cataloguePath)

  useEffect(() => {
    if (router.asPath === PATHS.CATALOGUE) setCataloguePath(ENDPOINTS.categoryList)
    const { slug } = router.query
    if (slug && typeof slug === 'object') {
      let path = ENDPOINTS.categoryList
      slug.forEach(slug => {
        path += `/${slug}`
      })
      setCataloguePath(path)
    }
  }, [router, setCataloguePath])

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <BreadcrumbContainer />
      {categoryList && <CategoryListComponent categoryList={categoryList} />}
    </div>
  )
}

export default CatalogueContainer
