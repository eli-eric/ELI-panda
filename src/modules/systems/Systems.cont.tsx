import type { Table } from '@tanstack/react-table'
import { Fragment, memo, useCallback, useRef } from 'react'

import ErrorPage from '@/components/error/ErrorPage'
import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'

import { Pagination } from '../shared/table/Pagination'
import SearchBar from '../shared/table/SearchBar'
import PandaTable from '../shared/table/Table'
import SearchBarButtons from './components/SearchBarButtons'
import useSystemsColumns from './components/table/columns'
import { useSystems } from './hooks/useSystems'
import type { SystemDetail } from './types/responses'

const MemoizedTable = memo(PandaTable)

const SystemsContainer = () => {
  const tableId = 'systems'
  const { systems, error, loading } = useSystems()
  const tableRef = useRef<Table<SystemDetail>>()
  const { columns, pending } = useSystemsColumns()

  const onChangeSearch = useCallback(() => {
    tableRef.current?.resetExpanded()
  }, [tableRef])

  return (
    <Fragment>
      <TableLayoutContainer>
        <SearchBar tableId={tableId} left={<SearchBarButtons />} onChange={onChangeSearch} />
        <MemoizedTable
          ref={tableRef}
          columns={columns}
          data={systems?.data}
          loading={loading || pending}
          tableId={tableId}
          getSubRows={row => row.subSystems}
          settings={{
            enableSorting: true,
            enableQueryURL: true
          }}
          className={'relative overflow-x-auto'}
        />
        {error && <ErrorPage />}
        <Pagination
          tableId={tableId}
          settings={{
            enableQueryURL: true,
            pageSizeDefault: 50,
            total: systems?.totalCount
          }}
        />
      </TableLayoutContainer>
    </Fragment>
  )
}

export default SystemsContainer
