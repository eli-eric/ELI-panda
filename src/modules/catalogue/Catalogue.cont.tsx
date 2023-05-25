import { Fragment } from 'react'

import ErrorPage from '@/components/error/ErrorPage'
import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import { useSearch } from '@/hooks/table/useSearch'

import CatalogueBreadcrumbContainer from './breadcrump/breadcrump.cont'
import CategoryListContainer from './categoryList/CategoryList.cont'
import useCatalogueItemsTable from './components/CatalogueItems.table'
import useCatalogueItems from './hooks/useCatalogueItems'
import useCategoryList from './hooks/useCategoryList'

const CatalogueContainer = () => {
  const { renderSearchBar } = useSearch({ tableId: 'catalogueItems' })
  const { catalogueItems, error } = useCatalogueItems()
  const { categoryList } = useCategoryList()
  const { getPaginationComponent, getTable } = useCatalogueItemsTable()

  return (
    <TableLayoutContainer catalogueItems={catalogueItems} categoryList={categoryList}>
      {renderSearchBar()}
      <CatalogueBreadcrumbContainer />
      <CategoryListContainer />
      <Fragment>
        {!error && getTable()}
        {!error && getPaginationComponent()}
        {error && <ErrorPage />}
      </Fragment>
    </TableLayoutContainer>
  )
}

export default CatalogueContainer
