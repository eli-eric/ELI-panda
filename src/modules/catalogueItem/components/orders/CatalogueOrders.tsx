import { useRouter } from 'next/router'
import { Fragment } from 'react'

import { Heading } from '@/components/layout/Heading'
import { useOrderColumns } from '@/modules/orders/components/OrderColumns'
import type { Order } from '@/modules/orders/types'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import { useQuery } from '@tanstack/react-query'
import { queryFetcher } from '@/utils/fetcher'

export const CatalogueOrders = () => {
  const tableId = 'catalogueOrders'

  const columns = useOrderColumns({ isReadOnly: true })
  const router = useRouter()
  const { uid } = router.query as { uid: string }
  const { data, isLoading: loading } = useQuery<Order[]>({
    queryKey: ['catalogueOrders', { uid }],
    queryFn: queryFetcher('catalogueOrders')
  })

  if (!data || data.length === 0) {
    return (
      <Fragment>
        <Heading customText="Orders" />
        <div className="flex justify-center items-center h-16">
          <span className="text-2xl text-gray-500">No orders available</span>
        </div>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Heading customText="Orders" />
      {
        <PandaTable
          {...{
            tableId: tableId,
            data,
            columns,
            loading,
            className: 'relative overflow-x-auto'
          }}
        />
      }
    </Fragment>
  )
}
