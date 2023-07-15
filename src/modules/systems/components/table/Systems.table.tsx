import type { Row, Table } from '@tanstack/react-table'
import { Fragment, memo, useCallback, useRef } from 'react'

import ErrorPage from '@/components/error/ErrorPage'
import { Pagination } from '@/modules/shared/table/Pagination'
import type { PandaTableSettings } from '@/modules/shared/table/pandaTable/PandaTable'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import SearchBar from '@/modules/shared/table/SearchBar'

import { useSystems } from '../../hooks/useSystems'
import type { SystemDetail } from '../../types/responses'
import { SearchBarButtons } from '../SearchBarButtons'
import { useSystemsColumns } from './columns'

const MemoizedTable = memo(PandaTable)

interface Props {
  tableId: string
  pageSizeDefault?: number
  className?: string
  hideButtons?: boolean
  getRowProps?: (row: Row<SystemDetail>) => any
  settings?: PandaTableSettings
}

export const SystemsTable = ({
  tableId,
  pageSizeDefault,
  className,
  hideButtons = false,
  getRowProps,
  settings
}: Props) => {
  const { systems, error, loading } = useSystems(tableId)
  const tableRef = useRef<Table<SystemDetail>>()
  const { columns, pending } = useSystemsColumns({ tableId, hideButtons })

  const onChangeSearch = useCallback(() => {
    tableRef.current?.resetExpanded()
  }, [tableRef])

  return (
    <Fragment>
      <SearchBar
        tableId={tableId}
        useQuery={settings?.enableQueryURL}
        left={!hideButtons ? <SearchBarButtons /> : undefined}
        onChange={onChangeSearch}
      />
      <MemoizedTable
        ref={tableRef}
        columns={columns}
        data={systems?.data}
        loading={loading || pending}
        tableId={tableId}
        getSubRows={row => row.subSystems}
        getRowProps={getRowProps}
        settings={settings}
        className={className}
      />
      {error && <ErrorPage />}
      <Pagination
        tableId={tableId}
        settings={{
          enableQueryURL: settings?.enableQueryURL,
          pageSizeDefault: pageSizeDefault,
          total: systems?.totalCount
        }}
      />
    </Fragment>
  )
}
