import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Fragment, useEffect, useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'

import { Button, PlusButton } from '@/components/Buttons'
import ErrorPage from '@/components/error/ErrorPage'
import { TableLayoutContainer } from '@/components/layout/catalog-layout.cont'
import { classNames } from '@/helpers'
import { fetcher } from '@/helpers/fetcher'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useGeneralTable from '@/hooks/table/useGeneralTable'
import usePagination from '@/hooks/table/usePagination'
import { useSearch } from '@/hooks/table/useSearch'
import useRolePermission from '@/hooks/useRole'
import useMutateListStore from '@/store/useMutateListStore'
import useTableStateStore from '@/store/useTableStateStore'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import useOrderColumns from './components/OrderColumns'
import type { Order, OrderListResponse } from './types'
import { getColorClassStatus } from './utils/getColorClassStatus'

const OrdersContainer = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const { mutate } = useSWRConfig()
  const [url, setUrl] = useState<string>('')
  const { setMutate } = useMutateListStore()
  const canEdit = useRolePermission([ROLE.ORDERS_EDIT])

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
        {canEdit && (
          <PlusButton
            primary
            className="mr-1"
            buttonSize="large"
            onClick={() => {
              router.push(PATH.ORDER)
            }}
          />
        )}
      </div>
    )
  })

  const { getPaginationComponent, pagination, setTotalCount } = usePagination({
    dependecies: [searchValue],
    pageSizeDefault: 50,
    useQuery: true
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

  const {
    data: orderList,
    error,
    mutate: mutateOrder
  } = useSWR<OrderListResponse>(session?.user && orders, fetcher, { suspense: false })

  const columns = useOrderColumns({ mutateOrder, orderList })

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
        column.id === 'name' ? 'sticky left-0 text-ellipsis z-20 backdrop-blur-2xl backdrop-filter border-r' : '',
        column.id === 'orderDate' ? 'text-right' : '',
        column.id === 'orderNumber' ? 'text-right' : '',
        column.id === 'requestNumber' ? 'text-right' : '',
        column.id === 'contractNumber' ? 'text-right' : '',
        column.id === 'lastUpdateTime' ? 'text-right' : '',
        column.id === 'supplier' ? 'min-w-[300px] max-w-[300px]' : '',
        column.id === 'notes' ? 'min-w-[90px] max-w-[90px]' : 'min-w-[180px] max-w-[180px]',
        'border-b border-gray-400'
      )
    }),
    getColumnProps: ({ id }) => ({
      className: classNames(
        id === 'name' ? 'left-0 z-30 min-w-[600px] max-w-[600px] border-r' : '',
        id === 'notes' ? 'min-w-[90px] max-w-[90px]' : '',
        id === 'supplier' ? 'min-w-[300px] max-w-[300px]' : '',
        'border-b border-gray-400'
      )
    }),
    getRowProps: ({ original: { orderStatusObj, deliveryStatus } }) => ({
      className: classNames('bg-white', orderStatusObj && getColorClassStatus(orderStatusObj, deliveryStatus))
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
