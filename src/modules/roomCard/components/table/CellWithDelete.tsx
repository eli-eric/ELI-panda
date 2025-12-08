import type { CellContext } from '@tanstack/react-table'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'

import { TableDeleteButton } from '@/components/Buttons'
import usePermission from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'
import { ROLE } from '@/types/constants/roles'

interface Props extends CellContext<any, any> {
  formName: string
  onDelete?: (item: any) => Promise<void>
  warningMessage?: string
  roomCardUid?: string
}

export const CellWithDelete = ({
  row,
  getValue,
  formName,
  onDelete,
  warningMessage,
  roomCardUid
}: Props) => {
  const editPermission = usePermission([ROLE.ROOM_CARD_EDIT])
  const withWarningModal = useWarningModal()
  const [isDeleting, setIsDeleting] = useState(false)

  const item = row.original

  const onDeleteClick = useCallback(async () => {
    if (!onDelete || !roomCardUid) return

    setIsDeleting(true)
    try {
      await onDelete(item)
      toast.success('Item removed')
    } catch {
      toast.error('Failed to remove item')
    } finally {
      setIsDeleting(false)
    }
  }, [item, onDelete, roomCardUid])

  const handleDeleteWithConfirmation = useCallback(() => {
    const message =
      warningMessage || 'Are you sure you want to remove this item?'
    withWarningModal(onDeleteClick, message)()
  }, [withWarningModal, onDeleteClick, warningMessage])

  // In create mode (no roomCardUid), don't show delete button
  if (!roomCardUid) {
    return <span>{getValue()}</span>
  }

  return (
    <div className="flex items-center">
      {editPermission && (
        <div className="relative right-1">
          <TableDeleteButton
            onClick={handleDeleteWithConfirmation}
            disabled={isDeleting}
          />
        </div>
      )}
      <span>{getValue()}</span>
    </div>
  )
}
