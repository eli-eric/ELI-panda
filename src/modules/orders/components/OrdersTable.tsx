import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

import { fetcher } from '@/helpers/fetcher'
import useGeneralTable from '@/hooks/table/useGeneralTable'
import usePagination from '@/hooks/table/usePagination'

import type { Order, OrderListResponse } from '../types'
import { getColorClassStatus } from '../utils/getColorClassStatus'
import useOrderColumns from './OrderColumns'

interface OrdersTableProps {
  ordersEndpoint: string
}

const useOrdersTable = ({ ordersEndpoint }: OrdersTableProps) => {
  const { data: session } = useSession()
  const searchValue = useRouter().query.search as string
  const {
    data: orderList,
    isValidating: loading,
    error,
    mutate: mutateOrder
  } = useSWR<OrderListResponse>(session?.user && ordersEndpoint, fetcher, { suspense: false })

  const { getPaginationComponent } = usePagination({
    dependecies: [searchValue],
    pageSizeDefault: 50,
    useQuery: true,
    total: orderList?.totalCount,
    tableId: 'orders'
  })

  const columns = useOrderColumns({ mutateOrder, orderList })

  const { getTable } = useGeneralTable<Order>({
    columns,
    tableId: 'orders',
    data: orderList?.data,
    loading: loading,
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
        id === 'orderNumber' ? 'text-center' : '',
        id === 'requestNumber' ? 'text-center' : '',
        id === 'contractNumber' ? 'text-center' : '',
        id === 'supplier' ? 'min-w-[300px] max-w-[300px]' : '',
        'border-b border-gray-400'
      )
    }),
    getRowProps: ({ original: { orderStatusObj, deliveryStatus } }) => ({
      className: classNames('bg-white', orderStatusObj && getColorClassStatus(orderStatusObj, deliveryStatus))
    })
  })

  return { getTable, getPaginationComponent, error }
}

export default useOrdersTable
