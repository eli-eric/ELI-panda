import type { Table } from '@tanstack/react-table'
import { Fragment, useCallback, useRef } from 'react'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import { useHoveringId } from '@/store/useHoveringId'
import { classNames } from '@/utils'

import { FilterBadges } from '../shared/form/FilterBadges'
import { Pagination } from '../shared/table/Pagination'
import { PandaTable } from '../shared/table/pandaTable/PandaTable'
import { SearchBar } from '../shared/table/SearchBar'
import { getColorBySystemLevel, getFontBySystemLevel } from '../systemItem/utils'
import { SystemFilterButtonContainer } from '../systems/components/filters/SystemsFilterButton.cont'
import { useSystems } from '../systems/hooks/useSystems'
import type { SystemDetail } from '../systems/types/responses'
import { useSystemsSparePartsColumns } from './SystemSpareParts.columns'

export const SystemsSparePartsContainer = () => {
  const tableId = 'SpareParts'
  const { systems, loading } = useSystems(tableId)
  const tableRef = useRef<Table<SystemDetail>>()
  const { columns, pending } = useSystemsSparePartsColumns({ tableId })
  const { setHoveringId } = useHoveringId()

  const onChangeSearch = useCallback(() => {
    tableRef.current?.resetExpanded()
  }, [tableRef])
  return (
    <Fragment>
      <SearchBar
        tableId={tableId}
        useQuery={false}
        left={<SystemFilterButtonContainer tableId={tableId} />}
        right={<FilterBadges tableId={tableId} />}
        onChange={onChangeSearch}
      />
      <TableLayoutContainer deps={[systems]}>
        <PandaTable
          ref={tableRef}
          columns={columns}
          data={systems?.data}
          className={'relative overflow-scroll scrollbar-style'}
          loading={loading || pending}
          tableId={tableId}
          getSubRows={row => row.subSystems}
          getRowProps={({ id, original }) => ({
            onMouseEnter: () => {
              setHoveringId(id)
            },
            onMouseLeave: () => {
              setHoveringId(undefined)
            },
            className: classNames(
              original?.physicalItem && 'font-bold text-gray-700 dark:text-gray-200',
              getColorBySystemLevel(original?.systemLevel),
              getFontBySystemLevel(original?.systemLevel)
            )
          })}
          settings={{
            enableRowSelection: true,
            enableMultiRowSelection: true,
            enableColumnHiding: true,
            enableColumnReordering: true
          }}
        />
      </TableLayoutContainer>
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
