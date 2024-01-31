import { memo } from 'react'

import ErrorPage from '@/components/error/ErrorPage'
import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import { useHoveringId } from '@/store/useHoveringId'
import { classNames } from '@/utils'

import { Pagination } from '../shared/table/Pagination'
import { PandaTable } from '../shared/table/pandaTable/PandaTable'
import { SearchBar } from '../shared/table/SearchBar'
import { NameCell } from './components/cells/NameCell'
import { HeaderButtons } from './components/HeaderButtons'
import { useOrderColumns } from './components/OrderColumns'
import { OrdersFilter } from './components/OrdersFilter'
import { useOrders } from './hooks/useOrders'
import { getColorClassStatus } from './utils/getColorClassStatus'

const MemoizedTable = memo(PandaTable)

const OrdersContainer = () => {
  const { orderList, loading, error } = useOrders()
  const { setHoveringId } = useHoveringId()
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
            getRowProps: ({ original: { orderStatus, deliveryStatus }, id }) => ({
              className: classNames('bg-white dark:bg-gray-900', getColorClassStatus(orderStatus, deliveryStatus)),
              onMouseEnter: () => {
                setHoveringId(id)
              },
              onMouseLeave: () => {
                setHoveringId(undefined)
              }
            }),
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
