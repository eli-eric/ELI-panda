import classNames from 'classnames'
import { Fragment } from 'react'

import ErrorPage from '@/components/error/ErrorPage'
import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'

import { Pagination } from '../shared/table/Pagination'
import { PandaTable } from '../shared/table/pandaTable/PandaTable'
import SearchBar from '../shared/table/SearchBar'
import HeaderButtons from './components/HeaderButtons'
import useOrderColumns from './components/OrderColumns'
import useOrdersFilter from './components/OrdersFilter'
import useOrders from './hooks/useOrders'
import { getColorClassStatus } from './utils/getColorClassStatus'

const OrdersContainer = () => {
  const { getOrdersFilter } = useOrdersFilter()
  const { orderList, loading, error } = useOrders()
  const columns = useOrderColumns()

  return (
    <Fragment>
      <TableLayoutContainer>
        <SearchBar tableId="orders" left={<HeaderButtons />} right={getOrdersFilter()} />
        {!error && (
          <PandaTable
            settings={{
              enableQueryURL: true,
              enableSorting: true,
              enableColumnReordering: true,
              enableColumnHiding: true
            }}
            {...{
              getRowProps: ({ original: { orderStatusObj, deliveryStatus } }) => ({
                className: classNames('bg-white', orderStatusObj && getColorClassStatus(orderStatusObj, deliveryStatus))
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
    </Fragment>
  )
}

export default OrdersContainer
