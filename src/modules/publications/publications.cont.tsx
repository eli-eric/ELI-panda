import type { FC } from 'react'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'

import type { Publication } from '../publication/types/responses'
import { Pagination } from '../shared/table/Pagination'
import { usePandaTable } from '../shared/table/pandaTable/hooks/usePandaTable'
import { PandaTableV2 } from '../shared/table/pandaTableV2/PandaTableV2'
import { SearchBar } from '../shared/table/SearchBar'
import { usePublications } from './hooks/usePublications'
import { usePublicationColumns } from './publications.columns'

export const PublicationsContainer: FC = () => {
  const tableId = 'publications'

  const columns = usePublicationColumns()
  const { data } = usePublications(tableId)

  const table = usePandaTable<Publication>({
    tableId,
    columns,
    data: data || []
  })

  return (
    <TableLayoutContainer>
      <SearchBar tableId={tableId} />
      <PandaTableV2 tableId={tableId} table={table} data={data} />
      <Pagination tableId={tableId} />
    </TableLayoutContainer>
  )
}
