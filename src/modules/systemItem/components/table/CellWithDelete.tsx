import type { CellContext } from '@tanstack/react-table'
import { useCallback, useMemo } from 'react'
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
    original: { uid, uuid, fullName }
  },
  getValue,
  name,
  setDeleteItem
}: Props) => {
  const { control } = useFormContext()
  const { remove, fields } = useFieldArray({ control, name })
  const editPersmission = usePermission([ROLE.SYSTEM_EDIT])

  // Memoize index and item finding to reduce calculations
  const itemData = useMemo(() => {
    const index = fields.findIndex(
      (field: any) => field?.uid === uid ?? field?.uuid === uuid
    )
    const item = fields.find(
      (field: any) => field?.uid === uid ?? field?.uuid === uuid
    )
    return { index, item }
  }, [fields, uid, uuid, name])

  // Optimize the delete handler
  const onDeleteClick = useCallback(() => {
    if (itemData.index === -1) {
      // eslint-disable-next-line no-console
      console.warn(
        `Cannot delete ${fullName}: Index not found in ${name} fields`
      )
      return
    }

    try {
      // First call the store updater to register the item for disconnection
      // This should call either setDisconnectOperator or setDisconnectMaintainedBy
      setDeleteItem(itemData.item)

      // Then remove from the form array
      remove(itemData.index)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        `Error removing ${fullName || 'unknown'} from ${name}:`,
        error
      )
    }
  }, [itemData.index, itemData.item, remove, setDeleteItem, name, fullName])

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
