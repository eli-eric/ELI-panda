import type { FC } from 'react'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import { ROLE } from '@/types/constants/roles'

import { Pagination } from '../shared/table/Pagination'
import { usePandaTable } from '../shared/table/pandaTable/hooks/usePandaTable'
import type { PandaTableSettings } from '../shared/table/pandaTable/PandaTable'
import { PandaTableV2 } from '../shared/table/pandaTableV2/PandaTableV2'
import { SearchBar, SearchBarButtonsComponent } from '../shared/table/SearchBar'
import { useGrantColumns } from './grants.columns'
import { useGrants } from './hooks/useGrants'
import { useOpenGrantForm } from './hooks/useOpenGrantForm'
import type { Grant } from './types/grant.types'

export const GrantsContainer: FC = () => {
  const tableId = 'grants'

  const columns = useGrantColumns()
  const { data, refetch, isLoading } = useGrants(tableId)

  const { openGrantForm } = useOpenGrantForm({ onSuccess: refetch })

  const tableSettings: PandaTableSettings<Grant> = {
    enableSorting: true,
    manualSorting: false,
    enableColumnReordering: true,
    enableQueryURL: true,
    enableColumnHiding: true
  }

  const table = usePandaTable<Grant>({
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
            handleAdd={openGrantForm}
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
