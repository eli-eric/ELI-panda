import type { FC } from 'react'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import { ROLE } from '@/types/constants/roles'

import { Pagination } from '../shared/table/Pagination'
import { usePandaTable } from '../shared/table/pandaTable/hooks/usePandaTable'
import type { PandaTableSettings } from '../shared/table/pandaTable/PandaTable'
import { PandaTableV2 } from '../shared/table/pandaTableV2/PandaTableV2'
import { SearchBar, SearchBarButtonsComponent } from '../shared/table/SearchBar'
import { useOpenResearcherForm } from './hooks/useOpenResearcherForm'
import { useResearchers } from './hooks/useResearchers'
import { useResearcherColumns } from './researchers.columns'
import type { Researcher } from './types/researcher.types'

export const ResearchersContainer: FC = () => {
  const tableId = 'researchers'

  const columns = useResearcherColumns()
  const { data, refetch, isLoading } = useResearchers(tableId)

  const { openResearcherForm } = useOpenResearcherForm({ onSuccess: refetch })

  const tableSettings: PandaTableSettings<Researcher> = {
    enableSorting: true,
    manualSorting: false,
    enableColumnReordering: true,
    enableQueryURL: true,
    enableColumnHiding: true
  }

  const table = usePandaTable<Researcher>({
    tableId,
    columns,
    data: data?.data || [],
    settings: tableSettings
  })

  return (
    <TableLayoutContainer>
      <SearchBar
        tableId={tableId}
        left={
          <SearchBarButtonsComponent
            editRole={ROLE.PUBLICATIONS_EDIT}
            handleAdd={openResearcherForm}
            handleRefresh={refetch}
          />
        }
      />
      <PandaTableV2
        tableId={tableId}
        table={table}
        data={data?.data}
        settings={tableSettings}
        loading={isLoading}
      />
      <Pagination
        tableId={tableId}
        settings={{
          enableQueryURL: true,
          pageSizeDefault: 50,
          total: data?.totalCount
        }}
      />
    </TableLayoutContainer>
  )
}
