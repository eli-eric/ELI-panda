import { useCategoryPath, useItemSearch } from 'core/components/modules/catalogue/hooks/usePath'
import { BASE_URL } from 'core/types/constants/common'
import { ENDPOINTS } from 'core/types/constants/endpoints'
import { CatalogueCategoryResponse, CatalogueItemResponse } from 'core/types/responses'
import { Fragment, useEffect, useState } from 'react'
import useSWR from 'swr'

import BreadcrumbContainer from './components/breadcrump/breadcrump.cont'
import CategoryListComponent from './components/categories/category-list.comp'
import ItemListContainer from './components/items/item-list.cont'
import ItemsPaginationComponent from './components/paging/items-pagination.comp'

const CatalogueContainer = () => {
  const categoryPath = useCategoryPath()
  const search = useItemSearch()
  const [page, setPage] = useState<number>(1)
  const [height, setHeight] = useState<number>(window.innerHeight)

  const [pageSize, setPageSize] = useState<number>(20)
  const [pageNumbers, setPageNumbers] = useState<number>(0)

  const { data: categoryList } = useSWR<Array<CatalogueCategoryResponse>>(
    BASE_URL + ENDPOINTS.catalogueCategories + `/${categoryPath}`
  )

  /*
  conditionaly
  */
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
    <Fragment>
      <div
        className={` flex-col ${
          categoryList
            ? categoryList.length === 0
              ? 'h-[calc(100vh-176px)]'
              : catalogueItems
              ? 'h-[calc(100vh-304px)]'
              : ''
            : 'h-[calc(100vh-304px)]'
        }`}
      >
        <BreadcrumbContainer />

        {categoryList && (
          <Fragment>
            <CategoryListComponent categoryList={categoryList} />
          </Fragment>
        )}

        {catalogueItems && (
          <div className="h-full overflow-auto border-t border-gray-300">
            <ItemListContainer itemList={catalogueItems?.data} />
          </div>
        )}

        {catalogueItems && (
          <ItemsPaginationComponent
            itemsTotalCount={catalogueItems?.totalCount}
            page={page}
            pageSize={pageSize}
            pageNumbers={pageNumbers}
            previousPageHandler={previousPageHandler}
            nextPageHandler={nextPageHandler}
          />
        )}
      </div>
    </Fragment>
  )
}

export default CatalogueContainer
