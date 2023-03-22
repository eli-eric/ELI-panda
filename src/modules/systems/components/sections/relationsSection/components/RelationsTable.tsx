import { TrashIcon } from '@heroicons/react/20/solid'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'

import { Button } from '@/components/Buttons'
import TableComponent2 from '@/components/table2/Table.comp'
import TableRowComponent from '@/components/table2/TableRow.comp'
import { TableRowItem } from '@/components/table2/TableRowItem.comp'
import { SystemRelationshipResponse } from '@/modules/systems/types/responses'

interface RelationProps {
  item: SystemRelationshipResponse
  index: number
  systemName: string
  onDelete: (uid: string) => void
}

const Relation = ({ item, index, onDelete, systemName }: RelationProps) => (
  <TableRowComponent key={item.relationUid + index} index={index}>
    <TableRowItem text={systemName} />
    <TableRowItem>
      <div key={index}>
        {item.direction === 'to' && <ArrowLongLeftIcon className="w-10 h-10" />}
        {item.direction === 'from' && <ArrowLongRightIcon className="w-10 h-10" />}
      </div>
    </TableRowItem>
    <TableRowItem text={item.foreignSystemName} />
    <TableRowItem text="">
      <Button onClick={() => onDelete(item.relationUid)} rounded="rounded-md">
        {' '}
        <TrashIcon className="h-5 w-5 text-red-700" aria-hidden="true" />{' '}
      </Button>
    </TableRowItem>
  </TableRowComponent>
)

interface Props {
  relations: SystemRelationshipResponse[]
  systemName: string
  onDelete: (uid: string) => void
}

const RelationsTable = ({ relations, systemName, onDelete }: Props) => (
  <TableComponent2
    tableHeaders={['System name', 'Direction', 'Foreign systen name', 'Action']}
    loadingData={!!relations}
    overflow={false}
  >
    {relations?.map((item, index) => (
      <Relation key={item.relationUid + index} item={item} index={index} systemName={systemName} onDelete={onDelete} />
    ))}
  </TableComponent2>
)

export default RelationsTable
