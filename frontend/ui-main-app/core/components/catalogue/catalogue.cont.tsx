import CataloguePathContext from 'core/store/catalogue-path.context'
import { BASE_URL } from 'core/types/constants/common'
import { ENDPOINTS } from 'core/types/constants/endpoints'
import { PATHS } from 'core/types/constants/paths'
import { CatalogueCategoryResponse, CatalogueItemResponse } from 'core/types/responses'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import useSWR from 'swr'

import BreadcrumbContainer from './breadcrump/breadcrump.cont'
import CategoryListComponent from './categories/category-list.comp'
import ItemListContainer from './items/item-list.cont'
import ItemsPaginationComponent from './items/items-pagination.comp'

const CatalogueContainer = () => {
  const router = useRouter()
  const { cataloguePath, setCataloguePath } = useContext(CataloguePathContext)
  const [search, setSearch] = useState<string>()

  const { data: categoryList } = useSWR<Array<CatalogueCategoryResponse>>(
    BASE_URL + ENDPOINTS.catalogueCategories + `/${cataloguePath}`
  )

  const { data: catalogueItems } = useSWR<CatalogueItemResponse>(
    categoryList?.length === 0 || search
      ? BASE_URL +
          ENDPOINTS.catalogueItems +
          `?pageSize=20&page=1&categoryPath=${cataloguePath}` +
          search
      : null
  )

  useEffect(() => {
    const { search } = router.query
    if (search && typeof search === 'string') {
      setSearch(`&search=${search}`)
    } else setSearch('')
  }, [router.query])

  useEffect(() => {
    if (router.asPath === PATHS.CATALOGUE) setCataloguePath('')
    const { slug } = router.query
    if (slug && typeof slug === 'object') {
      let path = ''
      slug.forEach(slug => {
        path += (path !== '' ? '/' : '') + slug
      })
      setCataloguePath(path)
    }
  }, [router, setCataloguePath])

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <BreadcrumbContainer />
      {categoryList && <CategoryListComponent categoryList={categoryList} />}
      {catalogueItems && <ItemListContainer itemList={catalogueItems.data} />}
      <ItemsPaginationComponent />
    </div>
  )
}

export default CatalogueContainer
