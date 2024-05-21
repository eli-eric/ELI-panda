import type { CellContext } from '@tanstack/react-table'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { TableActionsButtons } from '@/components/Buttons'
import usePermission from '@/hooks/usePermission'
import { ROLE } from '@/types/constants/roles'

interface Props extends CellContext<any, any> {
  formName: string
  setDeleteItem?: (item: any) => void
}

export const CellWithDelete = ({
  row: {
    original: { uid, uuid }
  },
  getValue,
  formName,
  setDeleteItem
}: Props) => {
  const { control } = useFormContext()
  const { remove, fields } = useFieldArray({ control, name: formName })
  const editPersmission = usePermission([ROLE.ROOM_CARD_EDIT])
  // any type because of react-table and component is for more contexts
  const index = fields.findIndex(
    (field: any) => field?.uid === uid ?? field?.uuid === uuid
  )
  const item = fields.find(
    (field: any) => field?.uid === uid ?? field?.uuid === uuid
  )

  const onDeleteClick = () => {
    remove(index)
    setDeleteItem && setDeleteItem(item)
  }
  return (
    <div className="flex items-center">
      {editPersmission && (
        <TableActionsButtons onDeleteClick={onDeleteClick} canEdit={true} />
      )}
      <span>{getValue()}</span>
    </div>
  )
}
