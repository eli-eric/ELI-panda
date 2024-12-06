import type { FC } from 'react'

import { TableActionsButtons } from '@/components/Buttons'
import { PATH } from '@/types/constants/paths'

type Props = {
  uid: string
}
export const ActionButtons: FC<Props> = ({ uid }) => {
  return (
    <TableActionsButtons
      detailLink={PATH.PUBLICATION + '/' + uid}
      onDeleteClick={() => {}}
      canEdit={true}
      position="right-0"
    />
  )
}
