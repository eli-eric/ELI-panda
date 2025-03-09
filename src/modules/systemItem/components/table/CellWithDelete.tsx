import type { CellContext } from '@tanstack/react-table'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { TableDeleteButton } from '@/components/Buttons'
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
    (field: any) => field?.uid === uid || field?.uuid === uuid
  )
  const item = fields.find(
    (field: any) => field?.uid === uid || field?.uuid === uuid
  )

  const onDeleteClick = () => {
    remove(index)
    setDeleteItem(item)
  }
  return (
    <div className="flex items-center w-full justify-between pr-3">
      <span>{getValue()}</span>
      {editPersmission && (
        <TableDeleteButton
          className="text-primary-400 dark:text-primary-500"
          onClick={onDeleteClick}
        />
      )}
    </div>
  )
}
