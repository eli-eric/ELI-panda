import { useCategoryPath, useItemSearch } from 'core/components/modules/catalogue/hooks/usePath'
import { BASE_URL } from 'core/types/constants/common'
import { ENDPOINTS } from 'core/types/constants/endpoints'
import { CatalogueCategoryResponse, CatalogueItemResponse } from 'core/types/responses'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import BreadcrumbContainer from './components/breadcrump/breadcrump.cont'
import CategoryListComponent from './components/categories/category-list.comp'
import ItemListContainer from './components/items/item-list.cont'
import ItemsPaginationComponent from './components/paging/items-pagination.comp'

const CatalogueContainer = () => {
  const categoryPath = useCategoryPath()
  const search = useItemSearch()
  const [page, setPage] = useState<number>(2)
  const [pageSize, setPageSize] = useState<number>(4)
  const [pageNumbers, setPageNumbers] = useState<number>(4)

  const { data: categoryList } = useSWR<Array<CatalogueCategoryResponse>>(
    BASE_URL + ENDPOINTS.catalogueCategories + `/${categoryPath}`
  )

  const { data: catalogueItems } = useSWR<CatalogueItemResponse>(
    categoryList?.length === 0 || search
      ? BASE_URL +
          ENDPOINTS.catalogueItems +
          `?pageSize=${pageSize}&page=${page}&categoryPath=${categoryPath}` +
          search
      : null
  )

  const previousPageHandler = () => {
    if (page !== 1) setPage(prev => prev - 1)
  }
  const nextPageHandler = () => {
    if (page !== pageNumbers) setPage(prev => prev + 1)
  }
  useEffect(() => {
    if (catalogueItems) {
      const pageCount = Math.ceil(catalogueItems?.totalCount / pageSize)
      setPageNumbers(pageCount)
    }
  }, [catalogueItems, pageSize])

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <BreadcrumbContainer />
      {categoryList && <CategoryListComponent categoryList={categoryList} />}
      {catalogueItems && <ItemListContainer itemList={catalogueItems.data} />}
      {catalogueItems && (
        <ItemsPaginationComponent
          itemsTotalCount={catalogueItems?.totalCount}
          page={page}
          pageSize={pageSize}
          previousPageHandler={previousPageHandler}
          nextPageHandler={nextPageHandler}
        />
      )}
    </div>
  )
}

export default CatalogueContainer
