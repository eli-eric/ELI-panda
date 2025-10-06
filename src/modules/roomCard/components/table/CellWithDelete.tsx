import type { CellContext } from '@tanstack/react-table'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { TableDeleteButton } from '@/components/Buttons'
import usePermission from '@/hooks/usePermission'
import { ROLE } from '@/types/constants/roles'

interface Props extends CellContext<any, any> {
  formName: string
  setDeleteItem?: (item: any) => void
  removeNewItem?: (uuid: string) => void
}

export const CellWithDelete = ({
  row,
  getValue,
  formName,
  setDeleteItem,
  removeNewItem
}: Props) => {
  const { control } = useFormContext()
  const { remove, fields } = useFieldArray({ control, name: formName })
  const editPersmission = usePermission([ROLE.ROOM_CARD_EDIT])

  // Use row.index from TanStack Table - this is always correct and in sync
  const rowIndex = row.index
  const item = fields[rowIndex]

  const onDeleteClick = () => {
    // Defensive check: ensure index is valid
    if (rowIndex >= 0 && rowIndex < fields.length) {
      const itemToDelete: any = item

      // Remove from form array using the correct index
      remove(rowIndex)

      // Check if this is a DB item (has uid) or newly added item (has uuid only)
      if (itemToDelete?.uid) {
        // Item from DB - track for deletion in API
        if (setDeleteItem) {
          setDeleteItem(itemToDelete)
        }
      } else if (itemToDelete?.uuid && removeNewItem) {
        // Newly added item - remove from "to be created" list
        removeNewItem(itemToDelete.uuid)
      } else {
        console.warn(
          `Item has neither uid nor uuid:`,
          itemToDelete,
          `in ${formName}`
        )
      }
    } else {
      console.warn(
        `Delete failed: Invalid index ${rowIndex} for ${formName}. Fields length: ${fields.length}`
      )
    }
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
