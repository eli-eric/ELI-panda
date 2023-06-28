import type { Row, Table } from '@tanstack/react-table'
import { Fragment, memo, useCallback, useRef } from 'react'

import ErrorPage from '@/components/error/ErrorPage'
import { Pagination } from '@/modules/shared/table/Pagination'
import SearchBar from '@/modules/shared/table/SearchBar'
import PandaTable from '@/modules/shared/table/Table'

import { useSystems } from '../../hooks/useSystems'
import type { SystemDetail } from '../../types/responses'
import { SearchBarButtons } from '../SearchBarButtons'
import { useSystemsColumns } from './columns'

const MemoizedTable = memo(PandaTable)

interface Props {
  tableId: string
  enableQueryURL?: boolean
  pageSizeDefault?: number
  className?: string
  hideButtons?: boolean
  getRowProps?: (row: Row<SystemDetail>) => any
}

export const SystemsTable = ({
  tableId,
  enableQueryURL,
  pageSizeDefault,
  className,
  hideButtons = false,
  getRowProps
}: Props) => {
  const { systems, error, loading } = useSystems()
  const tableRef = useRef<Table<SystemDetail>>()
  const { columns, pending } = useSystemsColumns(hideButtons)

  const onChangeSearch = useCallback(() => {
    tableRef.current?.resetExpanded()
  }, [tableRef])

  return (
    <Fragment>
      <SearchBar tableId={tableId} left={!hideButtons ? <SearchBarButtons /> : undefined} onChange={onChangeSearch} />
      <MemoizedTable
        ref={tableRef}
        columns={columns}
        data={systems?.data}
        loading={loading || pending}
        tableId={tableId}
        getSubRows={row => row.subSystems}
        getRowProps={getRowProps}
        settings={{
          enableSorting: true,
          enableQueryURL: enableQueryURL
        }}
        className={className}
      />
      {error && <ErrorPage />}
      <Pagination
        tableId={tableId}
        settings={{
          enableQueryURL: enableQueryURL,
          pageSizeDefault: pageSizeDefault,
          total: systems?.totalCount
        }}
      />
    </Fragment>
  )
}
