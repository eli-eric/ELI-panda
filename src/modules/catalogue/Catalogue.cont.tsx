import { Fragment, useEffect, useState } from 'react'

import ErrorPage from '@/components/error/ErrorPage'
import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import useTableStateStore from '@/store/useTableStateStore'

import { CatalogueTable } from '../shared/catalogue/table/CatalogueItems.table'
import { Pagination } from '../shared/table/Pagination'
import { SearchBar } from '../shared/table/SearchBar'
import { CatalogueBreadcrumbs } from './components/breadcrump/CatalogueBreadcrumbs'
import { CategoryListContainer } from './components/categoryList/CategoryList.cont'
import { SearchBarButtons } from './components/SearchBarButtons'
import { useCatalogueItems } from './hooks/useCatalogueItems'
import { useCategoryList } from './hooks/useCategoryList'
import { useCataloguePath } from './hooks/usePath'

const CatalogueContainer = () => {
  const tableId = 'catalogueItems'
  const { catalogueItems, error, loading } = useCatalogueItems(tableId)
  const { categoryList } = useCategoryList()
  const [open, setOpen] = useState(false)
  const categoryPath = useCataloguePath()
  const { setCustom } = useTableStateStore()

  useEffect(() => {
    setCustom(tableId, { categoryPath })
  }, [categoryPath, setCustom, tableId])

  return (
    <Fragment>
      <SearchBar left={<SearchBarButtons />} tableId={tableId} />
      <CatalogueBreadcrumbs />
      <CategoryListContainer
        onChange={open => {
          setOpen(open)
        }}
      />
      <TableLayoutContainer deps={[open, catalogueItems, categoryList]} className={'border-t border-gray-300'}>
        <CatalogueTable tableId={tableId} catalogueItems={catalogueItems} loading={loading} enableFiltering={true} />
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
    </Fragment>
  )
}

export default CatalogueContainer
