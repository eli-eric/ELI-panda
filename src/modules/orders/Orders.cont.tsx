import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { CellProps, Column } from 'react-table'
import useSWR from 'swr'

import { Button } from '@/components/Buttons'
import { TableLayoutContainer } from '@/components/layout/catalog-layout.cont'
import { mockFetcher } from '@/helpers/fetcher'
import { useEndpoint } from '@/hooks/useEndpoint'
import useGeneralTable from '@/hooks/useGeneralTable'
import usePagination from '@/hooks/usePagination'
import { useSearch } from '@/hooks/useSearch'
import useTableStateStore from '@/store/useTableStateStore'

import { OrderListResponse } from './types'

const OrdersContainer = () => {
  const { renderSearchBar } = useSearch({})

  const router = useRouter()

  const { getPaginationComponent, pagination, setTotalCount } = usePagination({
    dependecies: [router.query.search]
  })

  const { instances } = useTableStateStore()

  const { orders } = useEndpoint({
    query: { search: router.query.search, pagination, sortBy: instances['orders']?.sortByQueryString }
  })
  const { data: orderList, error } = useSWR<OrderListResponse>(orders, mockFetcher, { suspense: false })

  const columns: Array<Column> = useMemo(
    () => [
      {
        Header: 'Actions',
        Cell: ({ row }: CellProps<{}, any>) => (
          <div {...row.getRowProps}>
            <Button className="mr-1" buttonSize="small" onClick={() => {}} rounded="rounded-md">
              <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button buttonSize="small" onClick={() => {}} rounded="rounded-md">
              <TrashIcon className="h-5 w-5 text-red-700" aria-hidden="true" />
            </Button>
          </div>
        )
      },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Order number', accessor: 'orderNumber' },
      { Header: 'Request number', accessor: 'requestNumber' },
      { Header: 'Contract number', accessor: 'contractNumber' },
      { Header: 'Supplier', accessor: 'supplier' },
      { Header: 'Order status', accessor: 'orderStatus' },
      { Header: 'Notes', accessor: 'notes' }
    ],
    []
  )

  const { getTable } = useGeneralTable({
    columns,
    tableId: 'orders',
    data: orderList?.data,
    loading: !orderList,
    className: 'overflow-y-auto',
    isSortable: true
  })

  useEffect(() => {
    setTotalCount(orderList?.totalCount)
  }, [orderList, setTotalCount])

  return (
    <TableLayoutContainer>
      {renderSearchBar()}
      {!error && getTable()}
      {!error && getPaginationComponent()}
      {error && <div>Something went wrong</div>}
    </TableLayoutContainer>
  )
}

export default OrdersContainer
