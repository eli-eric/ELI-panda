import type { FC } from 'react'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import { ROLE } from '@/types/constants/roles'

import type { Publication } from '../publication/types/responses'
import { PublicationFormContainer } from '../shared/publications/publication-create/publication-form.cont'
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

  const { openModal } = useModalGlobalStore()

  const handleAdd = () =>
    openModal('sheet', {
      component: PublicationFormContainer,
      props: { title: 'Create publication' }
    })

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
