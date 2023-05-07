import { ArrowPathIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { FormattedDate } from 'react-intl'
import { CellProps, Column } from 'react-table'
import useSWR, { useSWRConfig } from 'swr'

import { Button, PlusButton } from '@/components/Buttons'
import ErrorPage from '@/components/error/ErrorPage'
import { TableLayoutContainer } from '@/components/layout/catalog-layout.cont'
import TooltipComponent from '@/components/tooltip.comp'
import { classNames } from '@/helpers'
import { fetcher } from '@/helpers/fetcher'
import { useEndpoint } from '@/hooks/useEndpoint'
import useGeneralTable from '@/hooks/useGeneralTable'
import usePagination from '@/hooks/usePagination'
import { useSearch } from '@/hooks/useSearch'
import useMutateListStore from '@/store/useMutateListStore'
import useTableStateStore from '@/store/useTableStateStore'
import { PATH } from '@/types/constants/paths'

import TableActions from './components/TableActions'
import { Order, OrderListResponse } from './types'

const OrdersContainer = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const { mutate } = useSWRConfig()
  const [url, setUrl] = useState<string>('')
  const { setMutate } = useMutateListStore()

  const { renderSearchBar, searchValue } = useSearch({
    renderBegin: () => (
      <div>
        <Button
          className="mr-1"
          onClick={() => {
            mutate(url, undefined, { revalidate: true })
          }}
        >
          <ArrowPathIcon className="h-5 w-5" aria-hidden="true" />
        </Button>
        <PlusButton
          primary
          className="mr-1"
          buttonSize="large"
          onClick={() => {
            router.push(PATH.ORDER)
          }}
        />
      </div>
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
    setUrl(orders)
    setMutate('orders', orders)
  }, [orders, setMutate])

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
        Header: 'Name',
        accessor: 'name',
        id: 'name',
        Cell: ({ value, row }: CellProps<Order>) => (
          <div className="flex items-center my-1">
            <TableActions uid={row.original.uid} mutate={orders} />
            <span>{value}</span>
          </div>
        )
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
      {
        Header: 'Notes',
        accessor: 'notes',
        Cell: ({ value }: CellProps<Order>) => (
          <TooltipComponent text={value}>
            <InformationCircleIcon className="h-6 w-6 flex-shrink-0" />
          </TooltipComponent>
        ),
        id: 'notes'
      },
      {
        Header: 'Last Update Time',
        accessor: 'lastUpdateTime',
        Cell: ({ value }: CellProps<Order>) => (
          <FormattedDate value={value} day="2-digit" month="long" year="numeric" />
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
        column.id === 'name'
          ? 'sticky left-0 text-ellipsis z-20 bg-opacity-100 backdrop-blur backdrop-filter'
          : 'border-l',
        column.id === 'orderDate' ? 'text-right' : '',
        column.id === 'orderNumber' ? 'text-right' : '',
        column.id === 'requestNumber' ? 'text-right' : '',
        column.id === 'contractNumber' ? 'text-right' : '',
        column.id === 'lastUpdateTime' ? 'text-right' : '',
        column.id === 'notes' ? 'min-w-[90px] max-w-[90px]' : 'min-w-[180px] max-w-[180px]'
      )
    }),
    getColumnProps: ({ id }) => ({
      className: classNames(
        id === 'name' ? 'left-0 z-30 min-w-[600px] max-w-[600px]' : 'border-l',
        id === 'notes' ? 'min-w-[90px] max-w-[90px]' : 'min-w-[180px] max-w-[180px]'
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
