import { Fragment, useEffect } from 'react'

import ErrorPage from '@/components/error/ErrorPage'
import { TableLayoutContainer } from '@/components/layout/catalog-layout.cont'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSearch } from '@/hooks/table/useSearch'
import useMutateListStore from '@/store/useMutateListStore'

import HeaderButtons from './components/HeaderButtons'
import useOrdersFilter from './components/OrdersFilter'
import useOrdersTable from './components/OrdersTable'
import useQueryManager from './hooks/useQueryManager'

const OrdersContainer = () => {
  const { setMutate } = useMutateListStore()
  const { getOrdersFilter, queryFilter } = useOrdersFilter()
  const query = useQueryManager(queryFilter)
  const { orders } = useEndpoint({ ...query })

  const { renderSearchBar } = useSearch({
    renderBegin: () => <HeaderButtons />,
    renderEnd: () => getOrdersFilter()
  })

  useEffect(() => {
    setMutate('orders', orders)
  }, [orders, setMutate])

  const { getTable, getPaginationComponent, error } = useOrdersTable({ ordersEndpoint: orders })

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
