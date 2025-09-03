import { Edit, Trash2 } from 'lucide-react'
import type { FC } from 'react'

import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import { useAccessControl } from '@/hooks/useAccessControl'
import useWarningModal from '@/hooks/useWarningModal'
import { usePublicationEditSheet } from '@/modules/shared/publications/publication-edit/usePublicationEditSheet'
import { ROLE } from '@/types/constants/roles'

import { usePublicationDelete } from '../hooks/usePublicationDelete'

type Props = {
  uid: string
}
export const ActionButtons: FC<Props> = ({ uid }) => {
  const deletePublication = usePublicationDelete(uid)

  const withWarning = useWarningModal()

  const [openEdit] = usePublicationEditSheet(uid)

  const canEdit = useAccessControl(ROLE.PUBLICATIONS_EDIT)()

  const onDeleteClick = () => {
    withWarning(deletePublication)({})
  }

  return (
    <div className="flex items-center gap-1">
      <Tooltip content="Edit publication">
        <Button
          variant="ghost"
          size="sm"
          onClick={openEdit}
          className="h-8 w-8 p-0 hover:bg-accent"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </Tooltip>
      <Tooltip content="Delete publication">
        <Button
          variant="ghost"
          size="sm"
          onClick={onDeleteClick}
          disabled={!canEdit}
          className="h-8 w-8 p-0 hover:bg-accent hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </Tooltip>
    </div>
  )
}
