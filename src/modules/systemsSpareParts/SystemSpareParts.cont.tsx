import type { Table } from '@tanstack/react-table'
import { Fragment, useCallback, useRef } from 'react'

import { Pagination } from '../shared/table/Pagination'
import { PandaTable } from '../shared/table/pandaTable/PandaTable'
import { SearchBar } from '../shared/table/SearchBar'
import { SearchBarButtons } from '../systems/components/SearchBarButtons'
import { useSystems } from '../systems/hooks/useSystems'
import type { SystemDetail } from '../systems/types/responses'
import { useSystemsSparePartsColumns } from './SystemSpareParts.columns'

export const SystemsSparePartsContainer = () => {
  const tableId = 'SpareParts'
  const { systems, loading } = useSystems(tableId)
  const tableRef = useRef<Table<SystemDetail>>()
  const { columns, pending } = useSystemsSparePartsColumns({ tableId })

  const onChangeSearch = useCallback(() => {
    tableRef.current?.resetExpanded()
  }, [tableRef])
  return (
    <Fragment>
      <SearchBar tableId={tableId} useQuery={false} left={<SearchBarButtons />} onChange={onChangeSearch} />
      <PandaTable
        ref={tableRef}
        columns={columns}
        data={systems?.data}
        loading={loading || pending}
        tableId={tableId}
        getSubRows={row => row.subSystems}
        settings={{
          enableRowSelection: row => row?.original?.systemType?.uid !== 'fa072c42-55ef-4cec-83f9-06cf1ec8ba4e',
          enableMultiRowSelection: row => !row?.original?.hasSubsystems
        }}
      />
      <Pagination
        tableId={tableId}
        settings={{
          enableQueryURL: false,
          pageSizeDefault: 50,
          total: systems?.totalCount
        }}
      />
    </Fragment>
  )
}
