import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import ErrorPage from '@/components/error/ErrorPage'
import { TableLayoutContainer } from '@/components/layout/catalog-layout.cont'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { useSearch } from '@/hooks/table/useSearch'
import CatalogueBreadcrumbContainer from '@/modules/catalogue/breadcrump/breadcrump.cont'
import CatalogueItemsContainer from '@/modules/catalogue/catalogueItems/CatalogueItems.cont'
import CategoryListComponent from '@/modules/catalogue/categoryList/CategoryList.cont'

const CatalogueContainer = () => {
  const { renderSearchBar } = useSearch({ tableId: 'catalogueItems' })

  return (
    <TableLayoutContainer>
      {renderSearchBar()}
      <CatalogueBreadcrumbContainer />
      <ErrorBoundary fallback={<ErrorPage />}>
        <Suspense fallback={<ProgressBarComponent />}>
          <CategoryListComponent />
        </Suspense>
      </ErrorBoundary>

      <CatalogueItemsContainer />
    </TableLayoutContainer>
  )
}

export default CatalogueContainer
