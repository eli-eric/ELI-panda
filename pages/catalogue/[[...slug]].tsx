import CatalogueComponent from 'components/catalogue/Catalogue.Comp'
import { useCatalogueItemsPath, useCategoryPath } from 'hooks/usePath'
import { message } from 'i18n/src/messages'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import useSWR from 'swr'
import { CatalogueCategoryResponse, CatalogueItemsResponse } from 'types/responses'

const { head } = message.cataloguePage

const CatalogueCategoriesPage: NextPage = (): JSX.Element => {
  const intl = useIntl()
  const categoryPath = useCategoryPath()
  const router = useRouter()
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const catalogueItemsPath = useCatalogueItemsPath(pageSize, page)
  const [pageNumbers, setPageNumbers] = useState<number | undefined>()
  /* fetch category list */
  const { data: categoryList } = useSWR<Array<CatalogueCategoryResponse>>(categoryPath)
  /* conditionaly fetch catalogue Items if category list dont return categories or search is not in query */
  const { data: catalogueItems } = useSWR<CatalogueItemsResponse>(
    categoryList?.length === 0 || router.query.search ? catalogueItemsPath : null
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
      router.push({ query: { ...router.query, page: page } }, undefined, {
        shallow: true
      })
    }
  }, [catalogueItems, pageSize, page]) // eslint-disable-line

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: head })}</title>
        <meta name="description" content="...." />
      </Head>
      <CatalogueComponent
        catalogueItems={catalogueItems}
        categoryList={categoryList}
        page={page}
        pageSize={pageSize}
        pageNumbers={pageNumbers}
        search={router.query.search}
        previousPageHandler={previousPageHandler}
        nextPageHandler={nextPageHandler}
      />
    </Fragment>
  )
}

export default CatalogueCategoriesPage
