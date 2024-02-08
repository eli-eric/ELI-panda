import { useEffect } from 'react'

import ErrorPage from '@/components/error/ErrorPage'
import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import type { Order } from '@/types/responses/orders'
import { classNames } from '@/utils'

import { FilterBadges } from '../shared/form/FilterBadges'
import { Pagination } from '../shared/table/Pagination'
import { usePandaTable } from '../shared/table/pandaTable/hooks/usePandaTable'
import type { PandaTableSettings } from '../shared/table/pandaTable/PandaTable'
import { PandaTableV2 } from '../shared/table/pandaTableV2/PandaTableV2'
import { SearchBar } from '../shared/table/SearchBar'
import { HeaderButtons } from './components/HeaderButtons'
import { useOrderColumns } from './components/OrderColumns'
import { useOrders } from './hooks/useOrders'
import { getColorClassStatus } from './utils/getColorClassStatus'

const OrdersContainer = () => {
  const { orderList, loading, error } = useOrders()
  const columns = useOrderColumns({ isReadOnly: false })
  const tableId = 'orders'

  const tableSettings: PandaTableSettings<Order> = {
    enableSorting: true,
    enableQueryURL: true,
    enableColumnHiding: true,
    enableColumnReordering: true,
    defaultColumnOrder: ['name']
  }

  const table = usePandaTable({
    tableId,
    columns,
    data: orderList?.data,
    settings: tableSettings
  })

  useEffect(() => {
    table.setColumnOrder(table.getAllLeafColumns().map(column => column.id))
  }, [columns, table])

  return (
    <TableLayoutContainer>
      <SearchBar
        tableId="orders"
        left={<HeaderButtons />}
        right={<FilterBadges tableId="orders" />}
      />
      {!error && (
        <PandaTableV2<Order>
          {...{
            table,
            settings: tableSettings,
            getRowProps: ({ original: { orderStatus, deliveryStatus } }) => ({
              className: classNames(
                'bg-white dark:bg-gray-800',
                getColorClassStatus(orderStatus, deliveryStatus)
              )
            }),
            columns,
            tableId,
            data: orderList?.data,
            loading: loading,
            className: 'relative overflow-x-auto scrollbar-style'
          }}
        />
      )}
      {!error && (
        <Pagination
          {...{
            settings: {
              enableQueryURL: true,
              pageSizeDefault: 50,
              total: orderList?.totalCount
            },
            tableId
          }}
        />
      )}
      {error && <ErrorPage />}
    </TableLayoutContainer>
  )
}

export default OrdersContainer
