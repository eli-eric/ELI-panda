import type { CellContext } from '@tanstack/react-table'
import { MoreVertical, Trash2 } from 'lucide-react'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import usePermission from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'
import { ROLE } from '@/types/constants/roles'

interface Props extends CellContext<any, any> {
  onDelete?: (item: any) => Promise<void>
  warningMessage?: string
  roomCardUid?: string
}

export const CellWithDelete = ({
  row,
  getValue,
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

  // In create mode (no roomCardUid), don't show actions
  if (!roomCardUid) {
    return <span>{getValue()}</span>
  }

  return (
    <div className="flex items-center gap-1">
      {editPermission && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              aria-label="Row actions"
              className="h-8 w-8 p-0"
              disabled={isDeleting}
            >
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={4}>
            <DropdownMenuItem
              onClick={handleDeleteWithConfirmation}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <span>{getValue()}</span>
    </div>
  )
}
