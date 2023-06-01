import { Fragment } from 'react'

import ErrorPage from '@/components/error/ErrorPage'
import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import { useSearch } from '@/hooks/table/useSearch'

import HeaderButtons from './components/HeaderButtons'
import useOrdersFilter from './components/OrdersFilter'
import useOrdersTable from './components/OrdersTable'

const OrdersContainer = () => {
  const { getOrdersFilter } = useOrdersFilter()
  const { renderSearchBar } = useSearch({
    renderBegin: () => <HeaderButtons />,
    renderEnd: () => getOrdersFilter()
  })
  const { getTable, getPaginationComponent, error } = useOrdersTable()
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
