import type { CellContext } from '@tanstack/react-table'
import { useFormContext } from 'react-hook-form'

import usePermission from '@/hooks/usePermission'
import { ROLE } from '@/types/constants/roles'

import type { RoomCardProperties } from './RoomCard.columns'

export const CellInput = ({
  row: {
    original: { code }
  }
}: CellContext<RoomCardProperties, any>) => {
  const { register } = useFormContext()
  const editPersmission = usePermission([ROLE.ROOM_CARD_EDIT])

  return <input className="w-full bg-inherit" {...register(code)} disabled={!editPersmission} name={code} />
}
