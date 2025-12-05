import type { CellContext } from '@tanstack/react-table'
import Link from 'next/link'

import { TableActionsButtons } from '@/components/Buttons'
import { Button } from '@/components/ui/button'
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
    <div className="flex items-center">
      <Link href={PATH.ROOM_CARD + '/' + original.uid}>
        <Button variant="link">
          <span>{getValue()}</span>
        </Button>
      </Link>
      {editPersmission && (
        <TableActionsButtons onDeleteClick={onDeleteClick} canEdit={true} />
      )}
    </div>
  )
}
