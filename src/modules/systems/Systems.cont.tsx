import type { Table } from '@tanstack/react-table'
import { Fragment, useEffect, useRef, useState } from 'react'

import ErrorPage from '@/components/error/ErrorPage'
import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'

import type { Order } from '../orders/types'
import SearchBar from '../shared/searchBar/SearchBar'
import PandaTable from '../shared/table/Table'
import useSystemsColumns from './components/columns'
import { useSystems } from './hooks/useSystems'
import type { SystemDetail } from './types/responses'

const SystemsContainer = () => {
  const tableId = 'systems'

  const { systems, error, loading } = useSystems()
  const [data, setData] = useState<SystemDetail[]>(systems?.data)

  useEffect(() => {
    setData(systems?.data)
  }, [systems])

  const columns = useSystemsColumns(setData)
  const tableRef = useRef<Table<Order>>()

  return (
    <Fragment>
      <TableLayoutContainer>
        <SearchBar tableId={tableId} />
        <PandaTable
          ref={tableRef}
          columns={columns}
          data={data}
          loading={loading}
          tableId={tableId}
          getSubRows={row => row.subSystems}
          settings={{
            enableSorting: false,
            enableQueryURL: true
          }}
          className={'relative overflow-x-auto'}
        />
        {error && <ErrorPage />}
      </TableLayoutContainer>
    </Fragment>
  )
}

export default SystemsContainer
