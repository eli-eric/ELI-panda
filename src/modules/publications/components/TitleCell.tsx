import type { CellContext } from '@tanstack/react-table'
import { Edit, MoreVertical, Trash2 } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useAccessControl } from '@/hooks/useAccessControl'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { usePublicationEditSheet } from '@/modules/shared/publications/publication-edit/usePublicationEditSheet'
import { ROLE } from '@/types/constants/roles'
import { truncateString } from '@/utils'

import type { Publication } from '../../publication/types/responses'
import { usePublicationDelete } from '../hooks/usePublicationDelete'

interface TitleCellProps extends CellContext<Publication, any> {}

export const TitleCell: FC<TitleCellProps> = ({
  getValue,
  row: {
    original: { uid }
  }
}) => {
  const { formatMessage: fm } = useIntl()
  const title = getValue()
  const deletePublication = usePublicationDelete(uid as string)
  const withWarning = useWarningModal()
  const [openEdit] = usePublicationEditSheet(uid as string)
  const canEdit = useAccessControl(ROLE.PUBLICATIONS_EDIT)()

  const onDeleteClick = () => {
    withWarning(deletePublication)({})
  }

  return (
    <div className="flex items-center justify-between w-full flex-row-reverse">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Publication actions"
            variant="ghost"
            tabIndex={0}
            className="has-[>svg]:px-1 cursor-pointer"
          >
            <MoreVertical className="size-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={4}>
          <DropdownMenuItem>
            <Link
              href={`/publication/${uid}`}
              target="_blank"
              className="flex gap-2 istems-center"
            >
              <Edit className="size-4" />
              {fm({ id: message.publicationsPage.actions.editPublication })}
            </Link>
          </DropdownMenuItem>
          {canEdit && (
            <DropdownMenuItem
              onClick={onDeleteClick}
              className="text-destructive"
            >
              <Trash2 className="size-4" />
              {fm({ id: message.publicationsPage.actions.deletePublication })}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex-1 min-w-0 flex items-center justify-start">
        <Tooltip content={title}>
          <Button variant="link" onClick={openEdit} className="cursor-pointer">
            {truncateString(title, 40)}
          </Button>
        </Tooltip>
      </div>
    </div>
  )
}
