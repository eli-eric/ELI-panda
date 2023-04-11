import { TrashIcon } from '@heroicons/react/20/solid'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { useMemo } from 'react'
import { CellProps, Column } from 'react-table'

import { Button } from '@/components/Buttons'
import useGeneralTable from '@/hooks/useGeneralTable'
import { SystemRelationshipResponse } from '@/modules/systems/types/responses'

interface Props {
  relations: SystemRelationshipResponse[]
  systemName: string
  onDelete: (uid: string) => void
}

const RelationsTable = ({ relations, systemName, onDelete }: Props) => {
  const columns: Column[] = useMemo(
    () => [
      {
        Header: 'System name',
        accessor: 'systemName',
        Cell: ({ row }: CellProps<{}, any>) => <span {...row.getRowProps}>{systemName}</span>
      },
      {
        Header: 'Direction',
        accessor: 'direction',
        Cell: ({ value, row }: CellProps<{}, any>) => (
          <div {...row.getRowProps}>
            {value === 'to' && <ArrowLongLeftIcon className="w-10 h-10" />}
            {value === 'from' && <ArrowLongRightIcon className="w-10 h-10" />}
          </div>
        )
      },
      { Header: 'Relation type code', accessor: 'relationTypeCode' },
      { Header: 'Foreign systen name', accessor: 'foreignSystemName' },
      {
        Header: 'Action',
        accessor: 'relationUid',
        Cell: ({ value, row }: CellProps<{}, any>) => (
          <div {...row.getRowProps}>
            <Button onClick={() => onDelete(value)} rounded="rounded-md">
              <TrashIcon className="h-5 w-5 text-red-700" aria-hidden="true" />
            </Button>
          </div>
        )
      }
    ],
    [onDelete, systemName]
  )

  const { getTable } = useGeneralTable({ data: relations, columns: columns })

  return getTable()
}

export default RelationsTable
