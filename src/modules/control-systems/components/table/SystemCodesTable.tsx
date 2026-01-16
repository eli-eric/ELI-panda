import { Fragment } from 'react'

import { PaginationV2 as Pagination } from '@/modules/shared/table/PaginationV2'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import type { PandaTableSettings } from '@/modules/shared/table/pandaTable/PandaTable'
import { PandaTableV2 } from '@/modules/shared/table/pandaTableV2/PandaTableV2'

import { useSystemCodes } from '../../hooks/useSystemCodes'
import type { SystemCodeResult } from '../../types'
import { ControlSystemsTableHeader } from './ControlSystemsTableHeader'
import { useSystemCodesColumns } from './useSystemCodesColumns'

interface Props {
  tableId: string
  pageSizeDefault?: number
  className?: string
  enableQueryURL?: boolean
  settings?: PandaTableSettings<SystemCodeResult>
}

export const SystemCodesTable = ({
  tableId,
  pageSizeDefault = 50,
  className,
  enableQueryURL = true,
  settings
}: Props) => {
  const { systemCodes, loading, queryKey } = useSystemCodes(tableId)
  const { columns } = useSystemCodesColumns({ queryKey })

  const table = usePandaTable({
    tableId,
    columns,
    data: systemCodes?.data,
    settings: {
      ...settings,
      enableColumnReordering: true
    }
  })

  return (
    <Fragment>
      <ControlSystemsTableHeader
        tableId={tableId}
        enableQueryURL={enableQueryURL}
      />
      <PandaTableV2
        data={systemCodes?.data}
        table={table}
        loading={loading}
        tableId={tableId}
        skeletonRowCount={pageSizeDefault}
        settings={{
          ...settings,
          enableColumnReordering: true
        }}
        className={className}
      />
      <Pagination
        tableId={tableId}
        settings={{
          enableQueryURL: enableQueryURL,
          pageSizeDefault: pageSizeDefault,
          total: systemCodes?.totalCount
        }}
      />
    </Fragment>
  )
}
