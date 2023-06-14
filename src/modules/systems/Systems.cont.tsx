import { Fragment, useRef } from 'react'

import ErrorPage from '@/components/error/ErrorPage'
import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'

import useOrders from '../orders/hooks/useOrders'
import SearchBar from '../shared/searchBar/SearchBar'
import type { TableRef } from '../shared/table/Table'
import Table from '../shared/table/Table'
import useSystemsColumns from './components/columns'

const SystemsContainer = () => {
  const columns = useSystemsColumns()
  const tableId = 'orders'
  const { orderList, error, loading } = useOrders()

  const tableRef = useRef<TableRef>()

  return (
    <Fragment>
      <TableLayoutContainer>
        <SearchBar tableId={tableId} />
        <Table
          ref={tableRef}
          columns={columns}
          data={orderList?.data}
          loading={loading}
          tableId={tableId}
          settings={{
            enableSorting: true,
            enableQueryURL: true
          }}
          className={'relative overflow-x-auto'}
        />
        {error && <ErrorPage />}
      </TableLayoutContainer>
    </Fragment>
  )
}

export default SystemsContainer
