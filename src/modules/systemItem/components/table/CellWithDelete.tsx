import type { CellContext } from '@tanstack/react-table'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { TableActionsButtons } from '@/components/Buttons'
import usePermission from '@/hooks/usePermission'
import { ROLE } from '@/types/constants/roles'

interface Props extends CellContext<any, any> {
  name: string
  setDeleteItem: (item: any) => void
}

export const CellWithDelete = ({
  row: {
    original: { uid, uuid }
  },
  getValue,
  name,
  setDeleteItem
}: Props) => {
  const { control } = useFormContext()
  const { remove, fields } = useFieldArray({ control, name })
  const editPersmission = usePermission([ROLE.SYSTEM_EDIT])
  // any type because of react-table and component is for more contexts
  const index = fields.findIndex(
    (field: any) => field?.uid === uid ?? field?.uuid === uuid
  )
  const item = fields.find(
    (field: any) => field?.uid === uid ?? field?.uuid === uuid
  )

  const onDeleteClick = () => {
    remove(index)
    setDeleteItem(item)
  }
  return (
    <div className="flex items-center">
      {editPersmission && (
        <TableActionsButtons
          onDeleteClick={onDeleteClick}
          canEdit={true}
          className="mr-5"
        />
      )}
      <span>{getValue()}</span>
    </div>
  )
}
