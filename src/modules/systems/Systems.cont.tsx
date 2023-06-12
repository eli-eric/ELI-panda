import { Fragment } from 'react'

import ErrorPage from '@/components/error/ErrorPage'
import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'

import useOrders from '../orders/hooks/useOrders'
import Table from '../shared/table/Table'
import useSystemsColumns from './components/columns'

const SystemsContainer = () => {
  const columns = useSystemsColumns()
  const { orderList, error, loading } = useOrders()

  return (
    <Fragment>
      <TableLayoutContainer>
        <Table columns={columns} data={orderList?.data} loading={loading} tableId={'orders'} />
        {error && <ErrorPage />}
      </TableLayoutContainer>
    </Fragment>
  )
}

export default SystemsContainer
