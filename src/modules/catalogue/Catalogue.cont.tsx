import { useState } from 'react'

import ErrorPage from '@/components/error/ErrorPage'
import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'

import { CatalogueTable } from '../shared/catalogue/table/CatalogueItems.table'
import { Pagination } from '../shared/table/Pagination'
import SearchBar from '../shared/table/SearchBar'
import { CatalogueBreadcrumbs } from './components/breadcrump/CatalogueBreadcrumbs'
import { CategoryListContainer } from './components/categoryList/CategoryList.cont'
import { SearchBarButtons } from './components/SearchBarButtons'
import { useCatalogueItems } from './hooks/useCatalogueItems'
import { useCategoryList } from './hooks/useCategoryList'

const CatalogueContainer = () => {
  const tableId = 'catalogueItems'
  const { catalogueItems, error, loading } = useCatalogueItems(tableId)
  const { categoryList } = useCategoryList()
  const [open, setOpen] = useState(false)

  //TODO: refactor without hooks pagination and table

  return (
    <TableLayoutContainer deps={[open, catalogueItems, categoryList]}>
      <SearchBar left={<SearchBarButtons />} tableId={tableId} />
      <CatalogueBreadcrumbs />
      <CategoryListContainer
        onChange={open => {
          setOpen(open)
        }}
      />
      <CatalogueTable tableId={tableId} catalogueItems={catalogueItems} loading={loading} />
      <Pagination
        tableId={tableId}
        settings={{
          enableQueryURL: true,
          total: catalogueItems?.totalCount,
          pageSizeDefault: 50
        }}
      />
      {error && <ErrorPage />}
    </TableLayoutContainer>
  )
}

export default CatalogueContainer
