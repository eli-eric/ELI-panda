import { useCallback, useEffect, useRef } from 'react'

import ErrorPage from '@/components/error/ErrorPage'
import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import type { Order } from '@/types/responses/orders'

import { FilterBadges } from '../shared/form/FilterBadges'
import { PaginationV2 as Pagination } from '../shared/table/PaginationV2'
import { usePandaTable } from '../shared/table/pandaTable/hooks/usePandaTable'
import type { PandaTableSettings } from '../shared/table/pandaTable/PandaTable'
import { PandaTableV2, type PandaTableV2Handle } from '../shared/table/pandaTableV2/PandaTableV2'
import { SearchBar } from '../shared/table/SearchBar'
import { HeaderButtons } from './components/HeaderButtons'
import { useOrderColumns } from './components/OrderColumns'
import { useOrders } from './hooks/useOrders'

const OrdersContainer = () => {
    const { orderList, loading, error } = useOrders()
    const columns = useOrderColumns({ isReadOnly: false })
    const tableId = 'orders'
    const tableRef = useRef<PandaTableV2Handle>(null)

    const tableSettings: PandaTableSettings<Order> = {
        enableSorting: true,
        enableQueryURL: true,
        enableColumnHiding: true,
        enableColumnReordering: true,
        defaultColumnOrder: ['name'],
    }

    const table = usePandaTable({
        tableId,
        columns,
        data: orderList?.data,
        settings: tableSettings,
    })

    useEffect(() => {
        table.setColumnOrder(table.getAllLeafColumns().map(column => column.id))
    }, [columns, table])

    // Scroll table to top when page changes
    const handlePageChange = useCallback(() => {
        tableRef.current?.scrollToTop()
    }, [])

    return (
        <TableLayoutContainer>
            <SearchBar
                tableId="orders"
                left={<HeaderButtons />}
                right={<FilterBadges tableId="orders" />}
            />
            {!error && (
                <PandaTableV2<Order>
                    ref={tableRef}
                    {...{
                        table,
                        settings: tableSettings,
                        skeletonRowCount: 50,
                        getRowProps: () => ({
                            className: 'font-bold',
                        }),
                        columns,
                        tableId,
                        data: orderList?.data,
                        loading: loading,
                        className: 'relative overflow-x-auto scrollbar-style',
                    }}
                />
            )}
            {!error && (
                <Pagination
                    {...{
                        settings: {
                            enableQueryURL: true,
                            pageSizeDefault: 50,
                            total: orderList?.totalCount,
                        },
                        tableId,
                        onPageChange: handlePageChange,
                    }}
                />
            )}
            {error && <ErrorPage />}
        </TableLayoutContainer>
    )
}

export default OrdersContainer
