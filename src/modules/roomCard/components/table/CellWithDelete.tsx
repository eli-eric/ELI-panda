import type { CellContext } from '@tanstack/react-table'
import { MoreVertical, Trash2 } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import usePermission from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { ROLE } from '@/types/constants/roles'

interface ToastMessages {
    loading?: string
    success?: string
    error?: string
}

interface Props extends CellContext<any, any> {
    onDelete?: (item: any) => Promise<void>
    warningMessage?: string
    roomCardUid?: string
    toastMessages?: ToastMessages
}

export const CellWithDelete = ({
    row,
    getValue,
    onDelete,
    warningMessage,
    roomCardUid,
    toastMessages,
}: Props) => {
    const { formatMessage: fm } = useIntl()
    const labels = message.roomCardsPage.table
    const editPermission = usePermission([ROLE.ROOM_CARD_EDIT])
    const withWarningModal = useWarningModal()
    const [isDeleting, setIsDeleting] = useState(false)

    const item = row.original

    const onDeleteClick = useCallback(async () => {
        if (!onDelete || !roomCardUid) return

        setIsDeleting(true)
        toast.promise(onDelete(item), {
            loading: toastMessages?.loading ?? fm({ id: labels.removing }),
            success: toastMessages?.success ?? fm({ id: labels.removed }),
            error: toastMessages?.error ?? fm({ id: labels.removeFailed }),
            finally: () => setIsDeleting(false),
        })
    }, [
        fm,
        item,
        labels.removeFailed,
        labels.removed,
        labels.removing,
        onDelete,
        roomCardUid,
        toastMessages,
    ])

    const handleDeleteWithConfirmation = useCallback(() => {
        const warningText = warningMessage || fm({ id: labels.removeWarning })
        withWarningModal(onDeleteClick, warningText)()
    }, [fm, labels.removeWarning, withWarningModal, onDeleteClick, warningMessage])

    // In create mode (no roomCardUid), don't show actions
    if (!roomCardUid) {
        return <span>{getValue()}</span>
    }

    return (
        <div className="flex items-center gap-1">
            {editPermission && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            aria-label={fm({ id: labels.rowActionsAriaLabel })}
                            className="h-8 w-8 p-0"
                            disabled={isDeleting}
                        >
                            <MoreVertical className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" sideOffset={4}>
                        <DropdownMenuItem
                            onClick={handleDeleteWithConfirmation}
                            className="cursor-pointer text-destructive focus:text-destructive"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            {fm({ id: labels.remove })}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
            <span>{getValue()}</span>
        </div>
    )
}
