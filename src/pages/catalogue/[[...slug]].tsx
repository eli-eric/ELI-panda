import { NextPage } from 'next'
import Head from 'next/head'
import { Fragment, Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useIntl } from 'react-intl'

import ErrorPage from '@/components/error/ErrorPage'
import { TableLayoutContainer } from '@/components/layout/catalog-layout.cont'
import LoaderComponent from '@/components/loader.comp'
import { useSearch } from '@/hooks/useSearch'
import { message } from '@/i18n/src/messages'
import CatalogueBreadcrumbContainer from '@/modules/catalogue/breadcrump/breadcrump.cont'
import CatalogueItemsContainer from '@/modules/catalogue/catalogueItems/CatalogueItems.cont'
import CategoryListComponent from '@/modules/catalogue/categoryList/CategoryList.cont'
import { CatalogueCategoryResponse, CatalogueItemsResponse } from '@/types/responses'

const { head } = message.cataloguePage

const CatalogueCategoriesPage: NextPage = (): JSX.Element => {
  const intl = useIntl()
  const [catalogueCategoryList, setCatalogueCategoryList] = useState<CatalogueCategoryResponse[]>()
  const [catalogueItemsList, setCatalogueItemsList] = useState<CatalogueItemsResponse>()
  const [catalogueParentUid, setCatalogueParentUid] = useState<string>()
  const { renderSearchBar } = useSearch({})

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: head })}</title>
        <meta name="description" content="...." />
      </Head>
      <TableLayoutContainer catalogueItems={catalogueItemsList} categoryList={catalogueCategoryList}>
        {renderSearchBar()}
        <CatalogueBreadcrumbContainer />
        <ErrorBoundary fallback={<ErrorPage />}>
          <Suspense fallback={<LoaderComponent />}>
            <CategoryListComponent
              setCatalogueCategoryList={setCatalogueCategoryList}
              setCatalogueParentUid={setCatalogueParentUid}
            />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallback={<ErrorPage />}>
          <Suspense fallback={<LoaderComponent />}>
            <CatalogueItemsContainer
              categoryListLength={catalogueCategoryList?.length}
              setCatalogueItemsList={setCatalogueItemsList}
              catalogueItems={catalogueItemsList}
            />
          </Suspense>
        </ErrorBoundary>
      </TableLayoutContainer>
    </Fragment>
  )
}

export default CatalogueCategoriesPage
