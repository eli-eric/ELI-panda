import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

import { Heading } from '@/components/layout/Heading'
import { Table } from '@/components/ui'
import { useOrderColumns } from '@/modules/orders/components/OrderColumns'
import type { Order } from '@/types/responses/orders'
import { queryFetcher } from '@/utils/fetcher'

export const CatalogueOrders = () => {
  const columns = useOrderColumns({ isReadOnly: true })
  const router = useRouter()
  const { uid } = router.query as { uid: string }
  const { data, isLoading: loading } = useQuery({
    queryKey: ['catalogueOrders', { uid }],
    queryFn: queryFetcher<Order[]>('catalogueOrders')
  })

  return (
    <Fragment>
      <Heading customText="Orders" showBorder={false} />
      <Table
        data={data || []}
        emptyMessage="No orders available"
        columns={columns}
        loading={loading}
        enablePinning={true}
        className="relative overflow-x-auto"
      />
    </Fragment>
  )
}
