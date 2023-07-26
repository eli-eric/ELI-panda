import type { CellContext } from '@tanstack/react-table'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

import { LinkDecorator } from '@/components/decorators'
import { Heading } from '@/components/layout/Heading'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'
import { useOrderColumns } from '@/modules/orders/components/OrderColumns'
import type { Order } from '@/modules/orders/types'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import { PATH } from '@/types/constants/paths'

export const CatalogueOrders = () => {
  const tableId = 'catalogueOrders'

  const NameCell = ({ getValue, row: { original } }: CellContext<Order, any>) => (
    <div className="flex items-center">
      <Link href={PATH.ORDER + '/' + original.uid} legacyBehavior>
        <a target={'_blank'} rel="noreferrer">
          <LinkDecorator>
            <span>{getValue()}</span>
          </LinkDecorator>
        </a>
      </Link>
    </div>
  )
  const columns = useOrderColumns({ NameCell })
  const router = useRouter()
  const { uid } = router.query as { uid: string }
  const { catalogueOrders } = useEndpoint({ uid })
  const { response, loading } = useFetch<Order[]>({ url: catalogueOrders, config: { suspense: false } })
  return (
    <Fragment>
      <Heading customText="Orders" />
      <PandaTable
        {...{
          tableId: tableId,
          data: response,
          columns,
          loading,
          className: 'relative overflow-x-auto'
        }}
      />
    </Fragment>
  )
}
