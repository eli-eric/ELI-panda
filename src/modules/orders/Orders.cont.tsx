import { PlusIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { FormattedDate } from 'react-intl'
import { CellProps, Column } from 'react-table'
import useSWR from 'swr'

import { Button } from '@/components/Buttons'
import ErrorPage from '@/components/error/ErrorPage'
import { TableLayoutContainer } from '@/components/layout/catalog-layout.cont'
import { classNames } from '@/helpers'
import { mockFetcher } from '@/helpers/fetcher'
import { useEndpoint } from '@/hooks/useEndpoint'
import useGeneralTable from '@/hooks/useGeneralTable'
import usePagination from '@/hooks/usePagination'
import { useSearch } from '@/hooks/useSearch'
import useTableStateStore from '@/store/useTableStateStore'
import { PATH } from '@/types/constants/paths'

import TableActions from './components/TableActions'
import { Order, OrderListResponse } from './types'

const OrdersContainer = () => {
  const router = useRouter()

  const { renderSearchBar, searchValue } = useSearch({
    renderBegin: () => (
      <Button
        className="mr-1"
        onClick={() => {
          router.push(PATH.ORDER_NEW)
        }}
        rounded="rounded-md"
      >
        <PlusIcon className="h-5 w-5" aria-hidden="true" />
      </Button>
    )
  })

  const { getPaginationComponent, pagination, setTotalCount } = usePagination({
    dependecies: [searchValue]
  })

  const { instances } = useTableStateStore()
  const sorting = instances['orders']?.sortByQueryString

  // TODO: vyřešit query string nějak obecně
  const { orders } = useEndpoint({
    query: searchValue
      ? sorting
        ? { search: searchValue, pagination, sorting }
        : { search: searchValue, pagination }
      : sorting
      ? { pagination, sorting }
      : { pagination }
  })
  const { data: orderList, error } = useSWR<OrderListResponse>(orders, mockFetcher, { suspense: false })

  const columns = useMemo(
    (): Column<Order>[] => [
      {
        Header: 'Actions',
        Cell: ({ row }: CellProps<Order>) => <TableActions uid={row.original.uid} mutate={orders} />,
        id: 'actions'
      },
      { Header: 'Name', accessor: 'name', id: 'name' },
      {
        Header: 'Order Date',
        accessor: 'orderDate',
        Cell: ({ value }: CellProps<Order>) => (
          <span>
            <FormattedDate value={value} day="2-digit" month="long" year="numeric" />
          </span>
        )
      },
      { Header: 'Order Number', accessor: 'orderNumber' },
      { Header: 'Request Number', accessor: 'requestNumber' },
      { Header: 'Contract Number', accessor: 'contractNumber' },
      { Header: 'Supplier', accessor: 'supplier' },
      { Header: 'Order tatus', accessor: 'orderStatus' },
      { Header: 'Notes', accessor: 'notes' }
    ],
    [orders]
  )

  const { getTable } = useGeneralTable<Order>({
    columns,
    tableId: 'orders',
    data: orderList?.data,
    loading: !orderList,
    isSortable: true,
    uriSortBy: true,
    className: 'relative overflow-x-auto',
    getCellProps: ({ column }) => ({
      className: classNames(
        column.id === 'actions' ? 'sticky left-0 z-20 bg-opacity-75 backdrop-blur backdrop-filter' : '',
        column.id === 'name' ? 'sticky left-[170px] z-20 bg-opacity-75 backdrop-blur backdrop-filter' : ''
      )
    }),
    getColumnProps: ({ id }) => ({
      className: classNames(id === 'actions' ? 'left-0 z-30' : '', id === 'name' ? 'left-[170px] z-30' : '')
    })
  })

  useEffect(() => {
    setTotalCount(orderList?.totalCount)
  }, [orderList, setTotalCount])

  return (
    <TableLayoutContainer>
      {renderSearchBar()}
      {!error && getTable()}
      {!error && getPaginationComponent()}
      {error && <ErrorPage />}
    </TableLayoutContainer>
  )
}

export default OrdersContainer
