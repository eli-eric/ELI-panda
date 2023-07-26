import classNames from 'classnames'
import { useState } from 'react'

import ErrorPage from '@/components/error/ErrorPage'
import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'

import { Pagination } from '../shared/table/Pagination'
import { PandaTable } from '../shared/table/pandaTable/PandaTable'
import { SearchBar } from '../shared/table/SearchBar'
import HeaderButtons from './components/HeaderButtons'
import { useOrderColumns } from './components/OrderColumns'
import { OrdersFilter } from './components/OrdersFilter'
import { useOrders } from './hooks/useOrders'
import { getColorClassStatus } from './utils/getColorClassStatus'

const OrdersContainer = () => {
  const { orderList, loading, error } = useOrders()
  const [isHoveringId, setIsHoveringId] = useState<number | undefined | string>()

  const columns = useOrderColumns(isHoveringId)

  return (
    <TableLayoutContainer>
      <SearchBar tableId="orders" left={<HeaderButtons />} right={<OrdersFilter />} />
      {!error && (
        <PandaTable
          {...{
            settings: {
              enableQueryURL: true,
              enableSorting: true,
              enableColumnReordering: true,
              enableColumnHiding: true
            },
            getRowProps: ({ original: { orderStatus, deliveryStatus }, id }) => ({
              className: classNames('bg-white', orderStatus && getColorClassStatus(orderStatus, deliveryStatus)),
              onMouseEnter: () => {
                setIsHoveringId(id)
              },
              onMouseLeave: () => {
                setIsHoveringId(undefined)
              }
            }),
            columns,
            tableId: 'orders',
            data: orderList?.data,
            loading: loading,
            className: 'relative overflow-x-auto'
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
