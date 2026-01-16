import type { FC } from 'react'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'

import { SystemCodesTable } from './components/table/SystemCodesTable'
import { CONTROL_SYSTEMS_TABLE_ID } from './hooks/useSystemCodes'

interface Props {
  enableQueryURL?: boolean
  tableId?: string
}

export const ControlSystemsOverviewComponent: FC<Props> = ({
  enableQueryURL = true,
  tableId = CONTROL_SYSTEMS_TABLE_ID
}: Props) => {
  return (
    <TableLayoutContainer>
      <SystemCodesTable
        tableId={tableId}
        pageSizeDefault={50}
        enableQueryURL={enableQueryURL}
        className="relative overflow-scroll scrollbar-style"
        settings={{
          enableSorting: true,
          enableColumnHiding: true,
          enableFiltering: true,
          manualFiltering: true,
          enableQueryURL: enableQueryURL,
          enableColumnReordering: false
        }}
      />
    </TableLayoutContainer>
  )
}
