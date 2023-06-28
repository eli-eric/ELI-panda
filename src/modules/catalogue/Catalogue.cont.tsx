import { useState } from 'react'

import ErrorPage from '@/components/error/ErrorPage'
import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'

import useCatalogueTable from '../shared/catalogue/table/CatalogueItems.table'
import SearchBar from '../shared/table/SearchBar'
import { CatalogueBreadcrumbs } from './components/breadcrump/CatalogueBreadcrumbs'
import { CategoryListContainer } from './components/categoryList/CategoryList.cont'
import { SearchBarButtons } from './components/SearchBarButtons'
import { useCatalogueItems } from './hooks/useCatalogueItems'
import { useCategoryList } from './hooks/useCategoryList'

const CatalogueContainer = () => {
  const { catalogueItems, error } = useCatalogueItems()
  const { categoryList } = useCategoryList()
  const [open, setOpen] = useState(false)

  //TODO: refactor without hooks pagination and table
  const { getPaginationComponent, getTable } = useCatalogueTable()

  return (
    <TableLayoutContainer deps={[open, catalogueItems, categoryList]}>
      <SearchBar left={<SearchBarButtons />} tableId={'catalogueItems'} />
      <CatalogueBreadcrumbs />
      <CategoryListContainer
        onChange={open => {
          setOpen(open)
        }}
      />
      {!error && getTable()}
      {!error && getPaginationComponent()}
      {error && <ErrorPage />}
    </TableLayoutContainer>
  )
}

export default CatalogueContainer
