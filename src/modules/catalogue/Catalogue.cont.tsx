import { Fragment } from 'react'

import ErrorPage from '@/components/error/ErrorPage'
import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import { useSearch } from '@/hooks/table/useSearch'

import useCatalogueTable from '../shared/catalogue/table/CatalogueItems.table'
import CatalogueBreadcrumbs from './components/breadcrump/CatalogueBreadcrumbs'
import CategoryListContainer from './components/categoryList/CategoryList.cont'
import useCatalogueItems from './hooks/useCatalogueItems'
import useCategoryList from './hooks/useCategoryList'

const CatalogueContainer = () => {
  const { renderSearchBar } = useSearch({ tableId: 'catalogueItems' })
  const { catalogueItems, error } = useCatalogueItems()
  const { categoryList } = useCategoryList()
  const { getPaginationComponent, getTable } = useCatalogueTable()

  return (
    <TableLayoutContainer catalogueItems={catalogueItems} categoryList={categoryList}>
      {renderSearchBar()}
      <CatalogueBreadcrumbs />
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
