import type { Row } from '@tanstack/react-table'
import { Fragment, useCallback, useEffect } from 'react'

import { Pagination } from '@/modules/shared/table/Pagination'
import type {
  GetRowPropsReturnType,
  PandaTableSettings
} from '@/modules/shared/table/pandaTable/PandaTable'
import { SearchBar } from '@/modules/shared/table/SearchBar'

import { useSystems } from '../../hooks/useSystems'
import type { SystemDetail } from '../../types/responses'
import { SearchBarButtons } from '../SearchBarButtons'
import { useSystemsColumns } from './useSystemsColumns'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import { PandaTableControlled } from '@/modules/shared/table/pandaTable/PandaTableCotrolled'

interface Props {
  tableId: string
  pageSizeDefault?: number
  className?: string
  collapseOnUnMount?: boolean
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
  RightSearchBarElement,
  collapseOnUnMount
}: Props) => {
  const { systems, loading } = useSystems(tableId)
  const { columns, pending } = useSystemsColumns({
    tableId,
    hideButtons,
    enableDragAndDrop: enableDragAndDrop
  })

  const table = usePandaTable({
    tableId,
    columns,
    data: systems?.data,
    getSubRows: original => original.subSystems ?? [],
    settings: {
      ...settings,
      enableColumnReordering: false,
      defaultColumnOrder: ['icon', 'name']
    }
  })

  const onChangeSearch = useCallback(() => {
    table.resetExpanded()
  }, [table])

  useEffect(() => {
    return () => {
      if (collapseOnUnMount) {
        table.resetExpanded()
      }
    }
  }, [collapseOnUnMount, table])

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
      <PandaTableControlled
        data={systems?.data}
        table={table}
        loading={loading || pending}
        tableId={tableId}
        getRowProps={getRowProps}
        settings={{
          ...settings,
          enableColumnReordering: false
        }}
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
