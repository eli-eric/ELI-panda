import type { FC } from 'react'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import { classNames } from '@/utils'

import { FilterBadges } from '../shared/form/FilterBadges'
import { PandaTableV2 } from '../shared/table/pandaTableV2/PandaTableV2'
import { Pagination } from '../shared/table/Pagination'
import { usePandaTable } from '../shared/table/pandaTable/hooks/usePandaTable'
import { SearchBar } from '../shared/table/SearchBar'
import {
  getColorBySystemLevel,
  getFontBySystemLevel
} from '../systemItem/utils'
import { SearchBarButtons } from './components/SearchBarButtons'
import { useSystemsColumns } from './components/table/useSystemsColumns'
import { useSystems } from './hooks/useSystems'

const SystemsContainer: FC = () => {
  const tableId = 'systems'
  const { systems, loading } = useSystems(tableId)
  const { columns, pending } = useSystemsColumns({
    tableId,
    hideButtons: false,
    enableDragAndDrop: false
  })

  const table = usePandaTable<any>({
    tableId,
    columns,
    data: systems?.data,
    getSubRows: original => original.subSystems ?? [],
    settings: {
      enableColumnReordering: false,
      defaultColumnOrder: ['icon', 'name']
    }
  })

  return (
    <TableLayoutContainer>
      <SearchBar
        tableId={tableId}
        useQuery={true}
        left={<SearchBarButtons />}
        right={<FilterBadges tableId={'systems'} />}
      />
      <PandaTableV2
        data={systems?.data || []}
        table={table}
        tableId={tableId}
        settings={{
          enableColumnHiding: true
        }}
        getRowProps={({ original }) => ({
          className: classNames(
            original?.physicalItem &&
              'font-bold text-gray-700 dark:text-gray-200',
            getColorBySystemLevel(original?.systemLevel),
            getFontBySystemLevel(original?.systemLevel)
          )
        })}
      />
      <Pagination
        tableId={tableId}
        settings={{
          enableQueryURL: true,
          pageSizeDefault: 50,
          total: systems?.totalCount
        }}
      />
    </TableLayoutContainer>
  )
}

export default SystemsContainer
