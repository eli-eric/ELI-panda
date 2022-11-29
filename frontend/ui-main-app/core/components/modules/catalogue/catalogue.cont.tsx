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
  const [pageSize, setPageSize] = useState<number>(20)
  const [pageNumbers, setPageNumbers] = useState<number | undefined>()

  const { data: categoryList } = useSWR<Array<CatalogueCategoryResponse>>(
    BASE_URL + ENDPOINTS.catalogueCategories + `/${categoryPath}`
  )

  /*
  conditionaly
  */
  const { data: catalogueItems } = useSWR<CatalogueItemResponse>(
    categoryList?.length === 0 || search
      ? BASE_URL + ENDPOINTS.catalogueItems + `?pageSize=${pageSize}&page=${page}&categoryPath=${categoryPath}` + search
      : null
  )

  const previousPageHandler = () => {
    setPage(prev => prev - 1)
  }
  const nextPageHandler = () => {
    setPage(prev => prev + 1)
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
            <ItemListContainer itemList={catalogueItems.data} />
            {catalogueItems.data.length === 0 && (
              <div className="text-center align-middle">
                <h3 className="mt-2 text-sm font-medium text-gray-900">No results found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  We can’t find anything with that term at the moment, try searching something else.
                </p>
              </div>
            )}
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
