import { useRouter } from 'next/router'
import type { FC } from 'react'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import type { Publication } from '../publication/types/responses'
import { Pagination } from '../shared/table/Pagination'
import { usePandaTable } from '../shared/table/pandaTable/hooks/usePandaTable'
import { PandaTableV2 } from '../shared/table/pandaTableV2/PandaTableV2'
import { SearchBar, SearchBarButtonsComponent } from '../shared/table/SearchBar'
import { usePublications } from './hooks/usePublications'
import { usePublicationColumns } from './publications.columns'

export const PublicationsContainer: FC = () => {
  const tableId = 'publications'
  const router = useRouter()

  const columns = usePublicationColumns()
  const { data, refetch } = usePublications(tableId)

  const table = usePandaTable<Publication>({
    tableId,
    columns,
    data: data || []
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
            editRole={ROLE.BASICS}
            handleAdd={handleAdd}
            handleRefresh={handleRefresh}
          />
        }
      />
      <PandaTableV2 tableId={tableId} table={table} data={data} />
      <Pagination tableId={tableId} />
    </TableLayoutContainer>
  )
}
