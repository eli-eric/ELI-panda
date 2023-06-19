import type { Dispatch, SetStateAction } from 'react'

import TableRowComponent from '@/components/table/TableRow.comp'
import { TableRowItem } from '@/components/table/TableRowItem.comp'
import type { SystemDetailResponse } from '@/modules/systems/types/responses'

import type { SelectedSystemForRel } from './SelectRelation'

interface SystemForRelProps {
  item: SystemDetailResponse
  index: number
  setSelectedSystem: Dispatch<SetStateAction<SelectedSystemForRel | undefined>>
  selectedSystem?: SelectedSystemForRel
}
//TODO: implemet images to name
const SystemForRelItem = ({ item, index, setSelectedSystem, selectedSystem }: SystemForRelProps) => (
  <TableRowComponent
    key={item.uid + index}
    index={index}
    className={selectedSystem?.uid === item.uid ? 'bg-lime-200' : ''}
    onClick={() => {
      setSelectedSystem({ name: item.name, uid: item.uid })
    }}
  >
    <TableRowItem text={item.name} />
    <TableRowItem text={item.description} isInfoTooltip={true} />
    <TableRowItem text={item.systemCode} />
    <TableRowItem text={item.systemType?.name} />
    <TableRowItem text={item.systemAlias} />
    <TableRowItem text={item.location?.name} />
    <TableRowItem text={item.owner?.name} />
    <TableRowItem text={item.importance?.name} />
    <TableRowItem text={item.zone?.name} />
  </TableRowComponent>
)

export default SystemForRelItem
