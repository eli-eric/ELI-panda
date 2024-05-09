import type { CellContext } from '@tanstack/react-table'
import Link from 'next/link'

import { TableActionsButtons } from '@/components/Buttons'
import { LinkDecorator } from '@/components/decorators'
import usePermission from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'
import type { User } from '@/types/gql/graphql'

import { useUserDelete } from '../hooks/useUserDelete'

interface LocationCellProps extends CellContext<User, any> {
  isHoveringId?: number | string
}

export const UserNameCell = ({
  getValue,
  row: { original }
}: LocationCellProps) => {
  const editPersmission = usePermission([ROLE.ADMIN])

  const [deleteUser] = useUserDelete(original.username)
  const withWarningModal = useWarningModal(
    `Are you sure you want to delete user: "${original.firstName} ${original.lastName}"?`
  )
  const handleDelete = () => {
    deleteUser({ where: { uid: original.uid } })
  }
  const onDeleteClick = () => withWarningModal(handleDelete)()

  return (
    <div className="flex items-center">
      <Link href={PATH.ADMIN_USER + '/' + original.uid}>
        <LinkDecorator>
          <span>{getValue()}</span>
        </LinkDecorator>
      </Link>
      {editPersmission && (
        <TableActionsButtons onDeleteClick={onDeleteClick} canEdit={true} />
      )}
    </div>
  )
}
