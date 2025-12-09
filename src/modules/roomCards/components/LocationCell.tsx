import type { CellContext } from '@tanstack/react-table'
import { MoreVertical, Trash2 } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import usePermission from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'
import type { RoomCard } from '@/types/gql/graphql'

import { useRoomCardDelete } from '../hooks/useRoomCardDelete'

interface LocationCellProps extends CellContext<RoomCard, any> {
  isHoveringId?: number | string
}

export const LocationCell = ({
  getValue,
  row: { original }
}: LocationCellProps) => {
  const editPersmission = usePermission([ROLE.ROOM_CARD_EDIT])

  const { deleteRoomCard } = useRoomCardDelete(original.uid, original.name)
  const withWarningModal = useWarningModal(
    `Are you sure you want to delete room card "${original.name}"?`
  )
  const handleDelete = () => {
    deleteRoomCard()
  }
  const onDeleteClick = () => withWarningModal(handleDelete)()

  return (
    <div className="flex items-center w-full justify-between">
      <Link href={PATH.ROOM_CARD + '/' + original.uid} prefetch={true}>
        <Button variant="link">
          <span>{getValue()}</span>
        </Button>
      </Link>
      {editPersmission && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              aria-label="Row actions"
              className="h-8 w-8 p-0"
            >
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={4}>
            <DropdownMenuItem
              onClick={onDeleteClick}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
