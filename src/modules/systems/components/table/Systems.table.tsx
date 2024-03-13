import type { Row, Table } from '@tanstack/react-table'
import { Fragment, useCallback, useRef } from 'react'

import { Pagination } from '@/modules/shared/table/Pagination'
import type { GetRowPropsReturnType, PandaTableSettings } from '@/modules/shared/table/pandaTable/PandaTable'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import { SearchBar } from '@/modules/shared/table/SearchBar'

import { useSystems } from '../../hooks/useSystems'
import type { SystemDetail } from '../../types/responses'
import { SearchBarButtons } from '../SearchBarButtons'
import { useSystemsColumns } from './useSystemsColumns'

interface Props {
  tableId: string
  pageSizeDefault?: number
  className?: string
  hideButtons?: boolean
  enableDragAndDrop?: boolean
  getRowProps?: (row: Row<SystemDetail>) => GetRowPropsReturnType
  settings?: PandaTableSettings<SystemDetail>
  RightSearchBarElement?: () => JSX.Element
  LeftSearchBarElement?: () => JSX.Element
}

export const SystemsTable = ({
  tableId,
  pageSizeDefault,
  className,
  hideButtons = false,
  getRowProps,
  settings,
  enableDragAndDrop,
  LeftSearchBarElement,
  RightSearchBarElement
}: Props) => {
  const { systems, loading } = useSystems(tableId)
  const tableRef = useRef<Table<SystemDetail>>()
  const { columns, pending } = useSystemsColumns({ tableId, hideButtons, enableDragAndDrop: enableDragAndDrop })

  const onChangeSearch = useCallback(() => {
    tableRef.current?.resetExpanded()
  }, [tableRef])

  return (
    <Fragment>
      <SearchBar
        tableId={tableId}
        useQuery={settings?.enableQueryURL}
        left={
          !hideButtons && !enableDragAndDrop ? (
            <SearchBarButtons />
          ) : LeftSearchBarElement ? (
            <LeftSearchBarElement />
          ) : undefined
        }
        onChange={onChangeSearch}
        right={RightSearchBarElement && <RightSearchBarElement />}
      />
      <PandaTable
        ref={tableRef}
        columns={columns}
        data={systems?.data}
        loading={loading || pending}
        tableId={tableId}
        getSubRows={row => row.subSystems}
        getRowProps={getRowProps}
        settings={{ ...settings, enableSorting: false, enableColumnReordering: false }}
        className={className}
      />
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
