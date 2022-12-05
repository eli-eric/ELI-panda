import { useCatalogueItemsPath, useCategoryPath } from 'core/components/modules/catalogue/hooks/usePath'
import { CatalogueCategoryResponse, CatalogueItemsResponse } from 'core/types/responses'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import useSWR from 'swr'

import BreadcrumbContainer from './components/breadcrump/breadcrump.cont'
import CategoryListComponent from './components/category-list/category-list.comp'
import ItemListContainer from './components/items/item-list.cont'
import CatalogLayoutContainer from './components/layout/catalog-layout.cont'
import DefaultMessageComponent from './components/layout/default-message.comp'
import TableLayoutComponent from './components/layout/table-layout.comp'
import ItemsPaginationComponent from './components/paging/items-pagination.comp'

const CatalogueContainer = () => {
  const categoryPath = useCategoryPath()
  const router = useRouter()
  const query = router.query
  const { search } = query
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const catalogueItemsPath = useCatalogueItemsPath(pageSize, page)

  const [pageNumbers, setPageNumbers] = useState<number | undefined>()

  /* fetch categopry list */
  const { data: categoryList } = useSWR<Array<CatalogueCategoryResponse>>(categoryPath)

  /* conditionaly fetch catalogue Items if category list dont return categories or search is not in query */
  const { data: catalogueItems } = useSWR<CatalogueItemsResponse>(
    categoryList?.length === 0 || search ? catalogueItemsPath : null
  )

  const previousPageHandler = () => {
    setPage(prev => prev - 1)
  }
  const nextPageHandler = () => {
    setPage(prev => prev + 1)
  }

  /* reason for that is overflow of paging when we redirect to another category  */
  useEffect(() => {
    setPage(1)
  }, [categoryPath])

  useEffect(() => {
    if (catalogueItems) {
      const pageCount = Math.ceil(catalogueItems?.totalCount / pageSize)
      setPageNumbers(pageCount)
      router.push({ query: { ...query, page: page } }, undefined, {
        shallow: true
      })
    }
  }, [catalogueItems, pageSize, page]) // eslint-disable-line

  return (
    <CatalogLayoutContainer catalogueItems={catalogueItems} categoryList={categoryList}>
      <Fragment>
        <div id="catalogue-nav">
          <BreadcrumbContainer />
          <CategoryListComponent categoryList={categoryList} />
        </div>

        {catalogueItems ? (
          <TableLayoutComponent>
            <ItemListContainer itemList={catalogueItems.data} categoryListLength={categoryList?.length} />
            {catalogueItems.data.length === 0 && (
              <DefaultMessageComponent
                title="No results found"
                message="We can’t find anything with that term at the moment, try searching something else."
              />
            )}
          </TableLayoutComponent>
        ) : (
          <DefaultMessageComponent message="Select category or use Search bar" />
        )}

        {catalogueItems && (
          <div id="catalogue-paging">
            <ItemsPaginationComponent
              itemsTotalCount={catalogueItems?.totalCount}
              page={page}
              pageSize={pageSize}
              pageNumbers={pageNumbers}
              previousPageHandler={previousPageHandler}
              nextPageHandler={nextPageHandler}
            />
          </div>
        )}
      </Fragment>
    </CatalogLayoutContainer>
  )
}

export default CatalogueContainer
