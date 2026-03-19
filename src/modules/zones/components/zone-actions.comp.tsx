import type { CellContext } from '@tanstack/react-table'
import { MoreVertical, Pencil, Trash2 } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAccessControl } from '@/hooks/useAccessControl'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { ROLE } from '@/types/constants/roles'

import { ZoneEditContainer } from '../form/zone-edit.cont'
import { useZoneDelete } from '../hooks/useZoneDelete'
import type { Zone } from '../types/zone.types'

interface ZoneActionsCellProps extends CellContext<Zone, any> {}

export const ZoneActionsCell: FC<ZoneActionsCellProps> = ({
    getValue,
    row: {
        original: { uid },
    },
}) => {
    const { formatMessage: fm } = useIntl()
    const { openModal } = useDynamicModalStore()
    const labels = message.zonesPage.actions
    const name = getValue()
    const deleteZone = useZoneDelete(uid)
    const withWarning = useWarningModal(fm({ id: labels.deleteWarning }))
    const canEdit = useAccessControl(ROLE.ZONES_EDIT)()

    const handleEdit = () => {
        openModal('sheet', {
            id: `zone-edit-${uid}`,
            component: ZoneEditContainer,
            props: {
                uid,
                title: fm({ id: labels.editTitle }),
            },
        })
    }

    const handleDelete = () => {
        withWarning(() => {
            toast.promise(deleteZone(), {
                loading: fm({ id: labels.deleting }),
                success: fm({ id: labels.deleted }),
                error: fm({ id: labels.deleteFailed }),
            })
        })()
    }

    return (
        <div className="flex items-center justify-between w-full flex-row-reverse">
            {canEdit && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            aria-label={fm({ id: labels.ariaLabel })}
                            variant="ghost"
                            tabIndex={0}
                            className="has-[>svg]:px-1 cursor-pointer"
                        >
                            <MoreVertical className="size-4 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" sideOffset={4}>
                        <DropdownMenuItem onClick={handleEdit}>
                            <Pencil className="size-4" />
                            {fm({ id: message.common.buttons.edit })}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                            <Trash2 className="size-4" />
                            {fm({ id: message.common.buttons.delete })}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
            <div className="flex-1 min-w-0 flex items-center justify-start">
                <span>{name}</span>
            </div>
        </div>
    )
}
