import { TrashIcon } from '@heroicons/react/20/solid'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import { CellProps, Column } from 'react-table'

import { Button } from '@/components/Buttons'
import useTable from '@/hooks/useTable'
import Table2 from '@/hooks/useTable2'
import { SystemRelationshipResponse } from '@/modules/systems/types/responses'

interface Props {
  relations: SystemRelationshipResponse[]
  systemName: string
  onDelete: (uid: string) => void
}

const RelationsTable = ({ relations, systemName, onDelete }: Props) => {
  const { getTable, TableRowItem } = useTable<SystemRelationshipResponse>({
    collums: ['System name', 'Direction', 'Relation type code', 'Foreign systen name', 'Action'],
    renderRow: item => (
      <Fragment>
        <TableRowItem text={systemName} />
        <TableRowItem>
          <div key={item.relationUid}>
            {item.direction === 'to' && <ArrowLongLeftIcon className="w-10 h-10" />}{' '}
            {item.direction === 'from' && <ArrowLongRightIcon className="w-10 h-10" />}{' '}
          </div>
        </TableRowItem>
        <TableRowItem text={item.relationTypeCode} />
        <TableRowItem text={item.foreignSystemName} />
        <TableRowItem text="">
          <Button onClick={() => onDelete(item.relationUid)} rounded="rounded-md">
            <TrashIcon className="h-5 w-5 text-red-700" aria-hidden="true" />{' '}
          </Button>
        </TableRowItem>
      </Fragment>
    ),
    data: relations
  })
  const columns: Column[] = [
    {
      Header: 'System name',
      accessor: 'systemName',
      Cell: ({ value, row }: CellProps<{}, any>) => <span {...row.getRowProps}>{systemName}</span>
    },
    {
      Header: 'Direction',
      accessor: 'direction',
      Cell: ({ value, row }: CellProps<{}, any>) => (
        <div {...row.getRowProps}>
          {value === 'to' && <ArrowLongLeftIcon className="w-10 h-10" />}{' '}
          {value === 'from' && <ArrowLongRightIcon className="w-10 h-10" />}{' '}
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
            <TrashIcon className="h-5 w-5 text-red-700" aria-hidden="true" />{' '}
          </Button>
        </div>
      )
    }
  ]

  return <Table2 data={relations} columns={columns} />
}

export default RelationsTable
