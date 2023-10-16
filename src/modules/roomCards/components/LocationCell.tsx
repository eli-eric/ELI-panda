import type { CellContext } from '@tanstack/react-table'
import Link from 'next/link'

import { TableActionsButtons } from '@/components/Buttons'
import useWarningModal from '@/hooks/useWarningModal'
import { useHoveringId } from '@/store/useHoveringId'
import { PATH } from '@/types/constants/paths'
import type { RoomCard } from '@/types/gql/graphql'

import { useRoomCardDelete } from '../hooks/useRoomCardDelete'

interface LocationCellProps extends CellContext<RoomCard, any> {
  isHoveringId?: number | string
}

export const LocationCell = ({ getValue, row: { original, id } }: LocationCellProps) => {
  const { hoveringId } = useHoveringId()
  const { deleteRoomCard } = useRoomCardDelete(original.uid, original.location.name)
  const withWarningModal = useWarningModal(`Are you sure you want to delete room card for "${original.location.name}"?`)
  const handleDelete = () => {
    deleteRoomCard()
  }
  const onDeleteClick = () => withWarningModal(handleDelete)()

  return (
    <div className="flex items-center">
      <Link href={PATH.ROOM_CARD + '/' + original.uid} className={'text-blue-700 cursor-pointer hover:underline'}>
        <span>{getValue()}</span>
      </Link>
      {hoveringId === id && <TableActionsButtons onDeleteClick={onDeleteClick} canEdit={true} />}
    </div>
  )
}
