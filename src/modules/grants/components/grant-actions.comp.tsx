import type { CellContext } from '@tanstack/react-table'
import { MoreVertical, Pencil, Trash2 } from 'lucide-react'
import type { FC } from 'react'
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
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { ROLE } from '@/types/constants/roles'

import { GrantEditContainer } from '../form/grant-edit.cont'
import { useGrantDelete } from '../hooks/useGrantDelete'
import type { Grant } from '../types/grant.types'

interface GrantActionsCellProps extends CellContext<Grant, any> {}

export const GrantActionsCell: FC<GrantActionsCellProps> = ({
    getValue,
    row: {
        original: { uid },
    },
}) => {
    const { openModal } = useDynamicModalStore()
    const name = getValue()
    const deleteGrant = useGrantDelete(uid)
    const withWarning = useWarningModal('Are you sure you want to delete this grant?')
    const canEdit = useAccessControl(ROLE.PUBLICATIONS_EDIT)()

    const handleEdit = () => {
        openModal('sheet', {
            id: `grant-edit-${uid}`,
            component: GrantEditContainer,
            props: {
                uid,
                title: 'Edit Grant',
            },
        })
    }

    const handleDelete = () => {
        withWarning(() => {
            toast.promise(
                new Promise((resolve, reject) => {
                    deleteGrant(undefined, {
                        onSuccess: () => resolve(true),
                        onError: () => reject(),
                    })
                }),
                {
                    loading: 'Deleting grant...',
                    success: 'Grant deleted',
                    error: 'Failed to delete grant',
                },
            )
        })()
    }

    return (
        <div className="flex items-center justify-between w-full flex-row-reverse">
            {canEdit && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            aria-label="Grant actions"
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
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                            <Trash2 className="size-4" />
                            Delete
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
