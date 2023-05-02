import { PlusIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { FormattedDate } from 'react-intl'
import { CellProps, Column } from 'react-table'
import useSWR from 'swr'

import { Button } from '@/components/Buttons'
import ErrorPage from '@/components/error/ErrorPage'
import { TableLayoutContainer } from '@/components/layout/catalog-layout.cont'
import { classNames } from '@/helpers'
import { fetcher } from '@/helpers/fetcher'
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
  const { data: session } = useSession()

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
    dependecies: [searchValue],
    pageSizeDefault: 50
  })

  const { instances } = useTableStateStore()
  const sorting = instances['orders']?.sortByQueryString

  // TODO: vyřešit query string nějak obecně
  const [query, setQuery] = useState({ pagination })
  const { orders } = useEndpoint({ query })
  useEffect(() => {
    const newQuery: { search?: string; pagination: string; sorting?: string } = { pagination }
    if (router.query.search) {
      newQuery.search = router.query.search as string
      if (sorting) {
        newQuery.sorting = sorting
      }
    } else if (sorting) {
      newQuery.sorting = sorting
    }
    setQuery(newQuery)
  }, [router.query.search, sorting, pagination])

  const { data: orderList, error } = useSWR<OrderListResponse>(session?.user && orders, fetcher, { suspense: false })

  const columns = useMemo(
    (): Column<Order>[] => [
      {
        Header: 'Actions',
        Cell: ({ row }: CellProps<Order>) => <TableActions uid={row.original.uid} mutate={orders} />,
        id: 'actions'
      },
      {
        Header: 'Name',
        accessor: 'name',
        id: 'name'
      },
      {
        Header: 'Order Date',
        accessor: 'orderDate',
        Cell: ({ value }: CellProps<Order>) => (
          <span className="text-right">
            <FormattedDate value={value} day="2-digit" month="long" year="numeric" />
          </span>
        ),
        id: 'orderDate'
      },
      { Header: 'Order Number', accessor: 'orderNumber', id: 'orderNumber' },
      { Header: 'Request Number', accessor: 'requestNumber', id: 'requestNumber' },
      { Header: 'Contract Number', accessor: 'contractNumber', id: 'contractNumber' },
      { Header: 'Supplier', accessor: 'supplier' },
      { Header: 'Order Status', accessor: 'orderStatus' },
      { Header: 'Notes', accessor: 'notes' },
      {
        Header: 'Last Update Time',
        accessor: 'lastUpdateTime',
        Cell: ({ value }: CellProps<Order>) => (
          <span className="text-right">
            <FormattedDate value={value} day="2-digit" month="long" year="numeric" />
          </span>
        ),
        id: 'lastUpdateTime'
      },
      {
        Header: 'Last Update by',
        accessor: 'lastUpdateBy'
      }
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
        'min-w-[180px] max-w-[180px]',
        column.id === 'actions' ? 'sticky left-0 z-20 bg-opacity-100 backdrop-blur backdrop-filter' : '',
        column.id === 'name'
          ? 'sticky left-[180px] text-ellipsis min-w-[600px] max-w-[600px] z-20 bg-opacity-100 backdrop-blur backdrop-filter'
          : 'border-l',
        column.id === 'orderDate' ? 'text-right' : '',
        column.id === 'orderNumber' ? 'text-right' : '',
        column.id === 'requestNumber' ? 'text-right' : '',
        column.id === 'contractNumber' ? 'text-right' : '',
        column.id === 'lastUpdateTime' ? 'text-right' : ''
      )
    }),
    getColumnProps: ({ id }) => ({
      className: classNames(
        id === 'actions' ? 'left-0 z-30' : '',
        id === 'name' ? 'left-[180px] z-30 min-w-[600px] max-w-[600px]' : 'border-l',
        'min-w-[180px] max-w-[180px]'
      )
    })
  })

  useEffect(() => {
    setTotalCount(orderList?.totalCount)
  }, [orderList, setTotalCount])

  return (
    <Fragment>
      <TableLayoutContainer>
        {renderSearchBar()}
        {!error && getTable()}
        {!error && getPaginationComponent()}
        {error && <ErrorPage />}
      </TableLayoutContainer>
    </Fragment>
  )
}

export default OrdersContainer
