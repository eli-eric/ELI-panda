import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { useMemo } from 'react'
import type { CellProps, Column } from 'react-table'

import { DeleteButton } from '@/components/Buttons'
import useGeneralTable from '@/hooks/table/useGeneralTable-deprecated'
import type { SystemRelationshipResponse } from '@/modules/systems-deprecated/types/responses'

interface Props {
  relations: SystemRelationshipResponse[]
  systemName: string
  onDelete: (uid: string) => void
}

const RelationsTable = ({ relations, systemName, onDelete }: Props) => {
  const columns = useMemo(
    (): Column<SystemRelationshipResponse>[] => [
      {
        Header: 'System name',
        Cell: ({
          row: {
            original: { relationUid }
          }
        }: CellProps<SystemRelationshipResponse>) => (
          <div className="flex items-center my-1">
            <DeleteButton onClick={() => onDelete(relationUid)} className="mr-4" />
            <span>{systemName}</span>
          </div>
        )
      },
      {
        Header: 'Direction',
        accessor: 'direction',
        Cell: ({ value, row }: CellProps<SystemRelationshipResponse>) => (
          <div {...row.getRowProps}>
            {value === 'to' && <ArrowLongLeftIcon className="w-10 h-10" />}
            {value === 'from' && <ArrowLongRightIcon className="w-10 h-10" />}
          </div>
        )
      },
      { Header: 'Relation type code', accessor: 'relationTypeCode' },
      { Header: 'Foreign systen name', accessor: 'foreignSystemName' }
    ],
    [onDelete, systemName]
  )

  const { getTable } = useGeneralTable({ data: relations, columns: columns, tableId: 'relations' })

  return getTable()
}

export default RelationsTable
