import { message } from 'src/i18n/src/messages'
import { NextPage } from 'next'
import Head from 'next/head'
import { Fragment, Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useIntl } from 'react-intl'
import BreadcrumbContainer from 'src/components/catalogue/breadcrump/breadcrump.cont'
import CatalogueItemsContainer from 'src/components/catalogue/catalogueItems/CatalogueItems.cont'
import CategoryListComponent from 'src/components/catalogue/categoryList/CategoryList.cont'
import { CatalogLayoutContainer } from 'src/components/catalogue/layout/catalog-layout.cont'
import SearchBarComponent from 'src/components/catalogue/search-bar/search-bar.comp'
import ErrorPage from 'src/components/error/ErrorPage'
import LoaderComponent from 'src/components/ui/loader.comp'
import { CatalogueCategoryResponse, CatalogueItemsResponse } from 'src/types/responses'

const { head } = message.cataloguePage

const CatalogueCategoriesPage: NextPage = (): JSX.Element => {
  const intl = useIntl()
  const [catalogueCategoryList, setCatalogueCategoryList] = useState<CatalogueCategoryResponse[]>()
  const [catalogueItemsList, setCatalogueItemsList] = useState<CatalogueItemsResponse>()

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: head })}</title>
        <meta name="description" content="...." />
      </Head>
      <CatalogLayoutContainer catalogueItems={catalogueItemsList} categoryList={catalogueCategoryList}>
        <SearchBarComponent />
        <BreadcrumbContainer />
        <ErrorBoundary fallback={<ErrorPage />}>
          <Suspense fallback={<LoaderComponent />}>
            <CategoryListComponent setCatalogueCategoryList={setCatalogueCategoryList} />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallback={<ErrorPage />}>
          <Suspense fallback={<LoaderComponent />}>
            <CatalogueItemsContainer
              categoryListLength={catalogueCategoryList?.length}
              setCatalogueItemsList={setCatalogueItemsList}
            />
          </Suspense>
        </ErrorBoundary>
      </CatalogLayoutContainer>
    </Fragment>
  )
}

export default CatalogueCategoriesPage
