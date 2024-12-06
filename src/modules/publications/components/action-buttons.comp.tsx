import type { FC } from 'react'

import { TableActionsButtons } from '@/components/Buttons'
import useWarningModal from '@/hooks/useWarningModal'
import { PATH } from '@/types/constants/paths'

import { usePublicationDelete } from '../hooks/usePublicationDelete'

type Props = {
  uid: string
}
export const ActionButtons: FC<Props> = ({ uid }) => {
  const deletePublication = usePublicationDelete(uid)

  const withWarning = useWarningModal()

  const onDeleteClick = () => {
    withWarning(deletePublication)({})
  }

  return (
    <TableActionsButtons
      detailLink={PATH.PUBLICATION + '/' + uid}
      onDeleteClick={onDeleteClick}
      canEdit={true}
      position="right-0"
    />
  )
}
