import { memo } from 'react'

import ErrorPage from '@/components/error/ErrorPage'
import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'

import { Pagination } from '../shared/table/Pagination'
import { PandaTable } from '../shared/table/pandaTable/PandaTable'
import { SearchBar } from '../shared/table/SearchBar'
import { NameCell } from './components/cells/NameCell'
import { HeaderButtons } from './components/HeaderButtons'
import { useOrderColumns } from './components/OrderColumns'
import { OrdersFilter } from './components/OrdersFilter'
import { useOrders } from './hooks/useOrders'

const MemoizedTable = memo(PandaTable)

const OrdersContainer = () => {
  const { orderList, loading, error } = useOrders()
  const Name = props => <NameCell {...props} />
  const columns = useOrderColumns({ NameCell: Name })

  return (
    <TableLayoutContainer>
      <SearchBar tableId="orders" left={<HeaderButtons />} right={<OrdersFilter />} />
      {!error && (
        <MemoizedTable
          {...{
            settings: {
              enableQueryURL: true,
              enableSorting: true,
              enableColumnReordering: true,
              enableColumnHiding: true
            },
            getRowProps: ({ original: { orderStatus, deliveryStatus }, id }) => ({}),
            columns,
            tableId: 'orders',
            data: orderList?.data,
            loading: loading,
            className: 'relative overflow-x-auto scrollbar-style'
          }}
        />
      )}
      {!error && (
        <Pagination
          {...{
            settings: { enableQueryURL: true, pageSizeDefault: 50, total: orderList?.totalCount },
            tableId: 'orders'
          }}
        />
      )}
      {error && <ErrorPage />}
    </TableLayoutContainer>
  )
}

export default OrdersContainer
