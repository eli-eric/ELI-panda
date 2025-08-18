import type { CellContext } from '@tanstack/react-table'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { TableDeleteButton } from '@/components/Buttons'
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
    (field: any) => field?.uid === uid || field?.uuid === uuid
  )
  const item = fields.find(
    (field: any) => field?.uid === uid || field?.uuid === uuid
  )

  const onDeleteClick = () => {
    remove(index)
    setDeleteItem && setDeleteItem(item)
  }
  return (
    <div className="flex items-center">
      {editPersmission && (
        <div className="relative right-1">
          <TableDeleteButton onClick={onDeleteClick} />
        </div>
      )}
      <span>{getValue()}</span>
    </div>
  )
}
