import { Fragment } from 'react'

import ErrorPage from '@/components/error/ErrorPage'
import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'

import useCatalogueTable from '../shared/catalogue/table/CatalogueItems.table'
import SearchBar from '../shared/searchBar/SearchBar'
import CatalogueBreadcrumbs from './components/breadcrump/CatalogueBreadcrumbs'
import CategoryListContainer from './components/categoryList/CategoryList.cont'
import SearchBarButtons from './components/SearchBarButtons'
import useCatalogueItems from './hooks/useCatalogueItems'
import useCategoryList from './hooks/useCategoryList'

const CatalogueContainer = () => {
  const { catalogueItems, error } = useCatalogueItems()
  const { categoryList } = useCategoryList()
  const { getPaginationComponent, getTable } = useCatalogueTable()

  return (
    <TableLayoutContainer catalogueItems={catalogueItems} categoryList={categoryList}>
      <SearchBar left={<SearchBarButtons />} tableId={'catalogueItems'} />
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
