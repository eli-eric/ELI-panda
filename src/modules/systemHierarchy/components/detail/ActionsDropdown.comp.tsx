import { MoreVertical, Move, Package, Wrench } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { message } from '@/i18n/src/messages'
import { openItemAssignModal } from '@/modules/shared/form/itemAssign/item-assign.modal'
import { openItemMoveModal } from '@/modules/shared/form/itemMoving/item-move.modal'
import { useAssignSparesNavigation } from '@/modules/shared/hooks/useAssignSparesNavigation'
import { useSystemEditPermission } from '@/modules/shared/system/edit-permission'
import type { SystemLevel } from '@/types/gql/graphql'

import type { SystemLeaf } from '../../types'

interface ActionsDropdownProps {
    system: SystemLeaf
}

export const ActionsDropdown: FC<ActionsDropdownProps> = ({ system }) => {
    const { formatMessage: fm } = useIntl()
    const { canEdit } = useSystemEditPermission(system.uid)
    const hasPhysicalItem = !!system.physicalItem

    const handleAssignSpares = useAssignSparesNavigation({
        uid: system.uid,
        parentPath:
            (system.parentPath as Array<{
                uid: string
                name: string
                systemLevel?: SystemLevel | null
            }>) ?? null,
        catalogueNumber: system.physicalItem?.catalogueNumber ?? null,
    })

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" data-testid={`actions-${system.uid}`}>
                {hasPhysicalItem && (
                    <DropdownMenuItem
                        className="cursor-pointer"
                        disabled={!canEdit}
                        onClick={() => openItemMoveModal(system)}
                    >
                        <Move className="h-4 w-4 mr-2" />
                        {fm({ id: message.systemHierarchy.detail.moveItem })}
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem
                    className="cursor-pointer"
                    disabled={!canEdit}
                    onClick={handleAssignSpares}
                >
                    <Wrench className="h-4 w-4 mr-2" />
                    {fm({ id: message.systemHierarchy.detail.assignSpares })}
                </DropdownMenuItem>
                {!hasPhysicalItem && (
                    <DropdownMenuItem
                        className="cursor-pointer"
                        disabled={!canEdit}
                        onClick={() => openItemAssignModal(system)}
                    >
                        <Package className="h-4 w-4 mr-2" />
                        {fm({ id: message.systemHierarchy.detail.assignItem })}
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
