import { NextPage } from 'next'
import Head from 'next/head'
import { Fragment, Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useIntl } from 'react-intl'

import BreadcrumbContainer from '@/components/catalogue/breadcrump/breadcrump.cont'
import CatalogueItemsContainer from '@/components/catalogue/catalogueItems/CatalogueItems.cont'
import CategoryListComponent from '@/components/catalogue/categoryList/CategoryList.cont'
import { CatalogLayoutContainer } from '@/components/catalogue/layout/catalog-layout.cont'
import SearchBarComponent from '@/components/catalogue/search-bar/search-bar.comp'
import ErrorPage from '@/components/error/ErrorPage'
import LoaderComponent from '@/components/ui/loader.comp'
import { message } from '@/i18n/src/messages'
import { CatalogueCategoryResponse, CatalogueItemsResponse } from '@/types/responses'

const { head } = message.cataloguePage

// TODO: refactor [[slug]] to [uid], BreadCrump has no information about parent UID for add new category

const CatalogueCategoriesPage: NextPage = (): JSX.Element => {
  const intl = useIntl()
  const [catalogueCategoryList, setCatalogueCategoryList] = useState<CatalogueCategoryResponse[]>()
  const [catalogueItemsList, setCatalogueItemsList] = useState<CatalogueItemsResponse>()
  const [catalogueParentUid, setCatalogueParentUid] = useState<string>()

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
            />
          </Suspense>
        </ErrorBoundary>
      </CatalogLayoutContainer>
    </Fragment>
  )
}

export default CatalogueCategoriesPage
