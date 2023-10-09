import { Fragment, useState } from 'react'

import ErrorPage from '@/components/error/ErrorPage'
import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'

import { CatalogueTable } from '../shared/catalogue/table/CatalogueItems.table'
import { Pagination } from '../shared/table/Pagination'
import { SearchBar } from '../shared/table/SearchBar'
import { CatalogueBreadcrumbs } from './components/breadcrump/CatalogueBreadcrumbs'
import { CategoryListContainer } from './components/categoryList/CategoryList.cont'
import { SearchBarButtons } from './components/SearchBarButtons'
import { useCatalogueItems } from './hooks/useCatalogueItems'
import { useCategoryList } from './hooks/useCategoryList'

interface Props {
  uid?: string
}

const CatalogueContainer = ({ uid: categoryUID }: Props) => {
  const tableId = 'catalogueItems'
  const { catalogueItems, error, loading } = useCatalogueItems(tableId, categoryUID)
  const { catalogueCategories } = useCategoryList()
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <SearchBar left={<SearchBarButtons />} tableId={tableId} />
      <CatalogueBreadcrumbs categoryUID={categoryUID} />
      <CategoryListContainer
        onChange={open => {
          setOpen(open)
        }}
      />
      <TableLayoutContainer deps={[open, catalogueItems, catalogueCategories]} className={'border-t border-gray-300'}>
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
    </Fragment>
  )
}

export default CatalogueContainer
