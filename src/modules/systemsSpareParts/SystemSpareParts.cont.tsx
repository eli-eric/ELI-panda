import { Fragment } from 'react'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import { useHoveringId } from '@/store/useHoveringId'
import { classNames } from '@/utils'

import { FilterBadges } from '../shared/form/FilterBadges'
import { Pagination } from '../shared/table/Pagination'
import { usePandaTable } from '../shared/table/pandaTable/hooks/usePandaTable'
import type { PandaTableSettings } from '../shared/table/pandaTable/PandaTable'
import { PandaTableControlled } from '../shared/table/pandaTable/PandaTableCotrolled'
import { SearchBar } from '../shared/table/SearchBar'
import { getColorBySystemLevel, getFontBySystemLevel } from '../systemItem/utils'
import { SystemFilterButtonContainer } from '../systems/components/filters/SystemsFilterButton.cont'
import { useSystems } from '../systems/hooks/useSystems'
import type { SystemDetail } from '../systems/types/responses'
import { useSystemsSparePartsColumns } from './SystemSpareParts.columns'

export const SystemsSparePartsContainer = () => {
  const tableId = 'SpareParts'
  const { systems, loading } = useSystems(tableId)
  const { columns, pending } = useSystemsSparePartsColumns({ tableId })
  const { setHoveringId } = useHoveringId()

  const tableSettings: PandaTableSettings<SystemDetail> = {
    enableRowSelection: true,
    enableMultiRowSelection: true,
    enableColumnHiding: true,
    enableColumnReordering: true
  }

  const table = usePandaTable<SystemDetail>({
    tableId,
    data: systems?.data,
    columns,
    settings: tableSettings,
    getSubRows: row => row.subSystems || []
  })

  return (
    <Fragment>
      <SearchBar
        tableId={tableId}
        useQuery={false}
        left={<SystemFilterButtonContainer tableId={tableId} />}
        right={<FilterBadges tableId={tableId} />}
        onChange={() => table.resetExpanded()}
      />
      <TableLayoutContainer deps={[systems]}>
        <PandaTableControlled
          data={systems?.data}
          tableId={tableId}
          table={table}
          loading={loading || pending}
          className={'relative overflow-scroll scrollbar-style'}
          settings={tableSettings}
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
