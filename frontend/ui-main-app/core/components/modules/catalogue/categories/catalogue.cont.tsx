import ProgressBarComponent from 'core/components/ui/progress-bar.comp'
import { message } from 'core/i18n/src/messages'
import { CatalogueCategoryResponse, CatalogueItemsResponse } from 'core/types/responses'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import useSWR from 'swr'

import { useCatalogueItemsPath, useCategoryPath } from '../shared/hooks/usePath'
import BreadcrumbContainer from './components/breadcrump/breadcrump.cont'
import CategoryListComponent from './components/category-list/category-list.comp'
import ItemListContainer from './components/item-list/item-list.cont'
import { CatalogLayoutContainer, TableLayoutComponent } from './components/layout/catalog-layout.cont'
import DefaultMessageComponent from './components/message/default-message.comp'
import ItemsPaginationComponent from './components/paging/items-pagination.comp'
import SearchBarComponent from './components/search-bar/search-bar.comp'

const messages = message.cataloguePage.defaultMessage

const CatalogueContainer = () => {
  const categoryPath = useCategoryPath()
  const intl = useIntl()
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

  /* Use effect for calculate poage numbers and set page to query params when items are fetched */
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
      <SearchBarComponent />
      <BreadcrumbContainer />

      {categoryList ? <CategoryListComponent categoryList={categoryList} /> : <ProgressBarComponent />}

      {catalogueItems ? (
        <TableLayoutComponent>
          <ItemListContainer itemList={catalogueItems.data} categoryListLength={categoryList?.length} />
          {catalogueItems.data.length === 0 && (
            <DefaultMessageComponent
              title={intl.formatMessage({ id: messages.noResults.title })}
              message={intl.formatMessage({ id: messages.noResults.text })}
            />
          )}
        </TableLayoutComponent>
      ) : (categoryList?.length === 0 || search) && !catalogueItems ? (
        <ProgressBarComponent />
      ) : (
        <DefaultMessageComponent message={intl.formatMessage({ id: messages.help.text })} />
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
    </CatalogLayoutContainer>
  )
}

export default CatalogueContainer
