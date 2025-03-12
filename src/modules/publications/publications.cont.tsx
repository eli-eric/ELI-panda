import { useRouter } from 'next/router'
import type { FC } from 'react'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import type { Publication } from '../publication/types/responses'
import { Pagination } from '../shared/table/Pagination'
import { usePandaTable } from '../shared/table/pandaTable/hooks/usePandaTable'
import type { PandaTableSettings } from '../shared/table/pandaTable/PandaTable'
import { PandaTableV2 } from '../shared/table/pandaTableV2/PandaTableV2'
import { SearchBar, SearchBarButtonsComponent } from '../shared/table/SearchBar'
import { ExportButton } from './components/export.button'
import { usePublications } from './hooks/usePublications'
import { usePublicationColumns } from './publications.columns'

export const PublicationsContainer: FC = () => {
  const tableId = 'publications'
  const router = useRouter()

  const columns = usePublicationColumns()
  const { data, refetch } = usePublications(tableId)

  const tableSettings: PandaTableSettings<Publication> = {
    enableSorting: true,
    manualSorting: false,
    enableColumnReordering: true,
    enableQueryURL: true,
    enableColumnHiding: true
  }

  const table = usePandaTable<Publication>({
    tableId,
    columns,
    data: data?.data || [],
    settings: tableSettings
  })

  const handleAdd = () => {
    router.push(PATH.PUBLICATION)
  }

  const handleRefresh = () => {
    refetch()
  }

  return (
    <TableLayoutContainer>
      <SearchBar
        tableId={tableId}
        left={
          <SearchBarButtonsComponent
            editRole={ROLE.PUBLICATIONS_EDIT}
            handleAdd={handleAdd}
            handleRefresh={handleRefresh}
          >
            <ExportButton />
          </SearchBarButtonsComponent>
        }
      />
      <PandaTableV2
        tableId={tableId}
        table={table}
        data={data?.data}
        settings={tableSettings}
      />
      <Pagination
        tableId={tableId}
        settings={{
          enableQueryURL: true,
          pageSizeDefault: 100,
          total: data?.totalCount
        }}
      />
    </TableLayoutContainer>
  )
}
