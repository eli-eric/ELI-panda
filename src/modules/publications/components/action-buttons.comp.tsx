import type { FC } from 'react'

import { TableActionsButtons } from '@/components/Buttons'
import { useAccessControl } from '@/hooks/useAccessControl'
import useWarningModal from '@/hooks/useWarningModal'
import { ROLE } from '@/types/constants/roles'

import { usePublicationDelete } from '../hooks/usePublicationDelete'

type Props = {
  uid: string
}
export const ActionButtons: FC<Props> = ({ uid }) => {
  const deletePublication = usePublicationDelete(uid)

  const withWarning = useWarningModal()

  const canEdit = useAccessControl(ROLE.PUBLICATIONS_EDIT)()

  const onDeleteClick = () => {
    withWarning(deletePublication)({})
  }

  return (
    <TableActionsButtons
      onDeleteClick={onDeleteClick}
      canEdit={canEdit}
      position="right-0"
    />
  )
}
